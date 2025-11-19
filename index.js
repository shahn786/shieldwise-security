const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const winston = require("winston");
require("winston-daily-rotate-file");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Winston Logger with Daily Rotation
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Add console logging in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Trust proxy for accurate rate limiting behind reverse proxies (Replit, Cloudflare, etc.)
app.set('trust proxy', 1);

// MongoDB Atlas Database Connection (Optional)
// If MONGODB_URI is set and valid, connect to MongoDB
if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb')) {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    tls: true,
    retryWrites: true
  })
  .then(() => {
    console.log("✅ Connected successfully to MongoDB Atlas");
    logger.info("MongoDB Atlas connection established successfully");
  })
  .catch((err) => {
    console.error("⚠️ MongoDB Connection Error:", err.message);
    logger.error("MongoDB connection failed", { error: err.message, stack: err.stack });
    console.log("⚠️ Server will continue without database connection");
  });
} else {
  console.log("⚠️ MONGODB_URI not configured - running without database");
  logger.warn("Server running without MongoDB connection");
}


// Define a User Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  position: { type: String },
  guardCardNo: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

// Define a Contact Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  bestReachtime: { type: String, required: true },
  message: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});
const Contact = mongoose.model("Contact", contactSchema);

// Define a get quote Model
const getQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },

  serviceType: { type: String, required: true },
  facilityType: { type: String, required: true },
  serviceArea: { type: String, required: true },
  durationOfService: { type: String, required: true },

  additionalInformation: { type: String, required: true },

  created_at: { type: Date, required: true, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});
const getQuote = mongoose.model("getQuote", getQuoteSchema);

// HTTPS redirect for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Security middleware - Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://code.jquery.com", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com", "https://www.google.com", "https://www.gstatic.com", "https://www.googletagmanager.com", "https://static.hotjar.com", "https://script.hotjar.com", "https://www.clarity.ms", "https://connect.facebook.net", "https://snap.licdn.com"],
      scriptSrcAttr: ["'unsafe-inline'", "'unsafe-hashes'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://*.hotjar.com", "https://*.hotjar.io", "wss://*.hotjar.com", "https://www.clarity.ms", "https://www.facebook.com", "https://connect.facebook.net", "https://px.ads.linkedin.com"],
      frameSrc: ["'self'", "https://www.google.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },
  frameguard: {
    action: 'deny'
  },
  permissionsPolicy: {
    features: { geolocation: ['self'], microphone: [], camera: [] }
  }
}));

// Compression middleware for gzip
app.use(compression());

// HTTP request logging with Morgan
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
} else {
  app.use(morgan('dev'));
}

// Rate limiting - Generous limits for normal browsing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per 15 minutes (allows ~30-40 page views)
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // 15 login attempts per 15 minutes (prevents brute force)
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Session setup with secure secrets from environment variables
// Use environment variables or generate temporary secrets for development
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-' + Math.random().toString(36);
const MONGO_CRYPTO_SECRET = process.env.MONGO_CRYPTO_SECRET || 'dev-crypto-' + Math.random().toString(36);

if (!process.env.SESSION_SECRET) {
  console.log("⚠️ Using temporary SESSION_SECRET (sessions will not persist across restarts)");
  logger.warn("SESSION_SECRET not configured - using temporary secret");
}

// Session configuration
const sessionConfig = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
};

// Add MongoDB session store if database is connected
if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb')) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    crypto: {
      secret: MONGO_CRYPTO_SECRET
    },
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  });
} else {
  console.log("⚠️ Using memory session store (sessions will not persist across restarts)");
}

app.use(session(sessionConfig));

// Cache Control for Static Assets
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|webp|woff|woff2|ttf|svg|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.url.match(/\.(html|ejs)$/)) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the Public directory
app.use(express.static(path.join(__dirname, "Public"), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));
app.use('/schemas', express.static('Public/schemas'));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.loggedIn = req.session && req.session.isAuthenticated;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// Import meta helpers
const metaHelpers = require('./utils/metaHelpers');
const NAP = metaHelpers.NAP; // Assuming NAP is exported from metaHelpers

// Event Security Service Route
const eventSecurityRoute = require('./routes/event-security');
app.use('/services/event-security', eventSecurityRoute);

// Import route modules
const apartmentSecurityRouter = require('./routes/apartment-security');
const armedSecurityRoutes = require('./routes/armed-security');
const commercialSecurityRoutes = require('./routes/commercial-security');
const constructionSecurityRoutes = require('./routes/construction-security');
const educationalSecurityRoutes = require('./routes/educational-security');

// Routes
app.get("/", (req, res) => res.render("index", { title: 'ShieldWise Security - Professional Security Services' }));

// Testimonials showcase route
app.get('/testimonials', (req, res) => {
  res.render('testimonials-showcase', { 
    title: 'California Security Testimonials - ShieldWise Security',
    description: 'Read testimonials from satisfied clients across California who trust ShieldWise Security for professional security services.'
  });
});

// Locations hub route
app.get('/locations', (req, res) => {
  res.render('locations', {
    title: 'Security Guard Service Areas | All California Locations | ShieldWise Security',
    description: 'Professional security guard services across 182 California cities in 25+ counties. BSIS licensed armed & unarmed guards. 24/7 coverage in Los Angeles, Orange County, San Diego, Sacramento & more.'
  });
});

// Legacy redirect: /services.html → /services (fixes Google Search Console duplicate issue)
app.get("/services.html", (req, res) => {
  res.redirect(301, "/services");
});

app.get("/services", (req, res) => {
  res.render("services");
});

// Contact Page
app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact ShieldWise Security | Get a Free Quote',
    currentPage: 'contact',
    NAP: NAP
  });
});

// Careers Page
app.get('/careers', (req, res) => {
  res.render('careers', { 
    title: 'Careers at ShieldWise Security | Join Our Team',
    currentPage: 'careers',
    NAP: NAP
  });
});

app.get("/get-quote", (req, res) => {
  res.render("get-quote", {
    name: "",
    email: "",
    phone: "",
    message: "",
  });
});



app.get("/service-areas", (req, res) => {
  res.render("service-areas");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/about", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("about", { loggedIn });
});

app.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", {
    title: 'Privacy Policy | ShieldWise Security',
    description: 'ShieldWise Security Privacy Policy - How we collect, use, and protect your personal information.'
  });
});

app.get("/terms", (req, res) => {
  res.render("terms", {
    title: 'Terms of Service | ShieldWise Security',
    description: 'ShieldWise Security Terms of Service - Legal terms and conditions for our security services.'
  });
});

app.get("/register", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("register", { loggedIn, error: null, success: null });
});

app.get("/login", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("login", { loggedIn, success: req.flash("success") });
});

// Service route handlers
const executiveProtectionRoute = require('./routes/executive-protection');
const fireWatchRoute = require('./routes/fire-watch');
app.use('/services/fire-watch', fireWatchRoute);

const hospitalSecurityRouter = require('./routes/hospital-security');
app.use('/services/hospital-security', hospitalSecurityRouter);

// Register Route
app.get("/register", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("register", { loggedIn, error: null, success: null });
});

// Handle Registration (with strict rate limiting)
app.post("/register", authLimiter, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    city,
    state,
    zip,
    position,
    guardCardNo,
    username,
    password,
  } = req.body;

  try {
    // Check if email or username already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists. Please try a different email.",
      });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists. Please try a different username.",
      });
    }

    // Save new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zip,
      position,
      guardCardNo,
      username,
      password,
    });

    await newUser.save();

    // Set success message and redirect to login
    outputJson = {
      code: 200,
      status: "Success",
      message: "Congratulations, your account is created! Please log in.",
    };
    res.json(outputJson);
    // req.flash(
    //   "success",
    //   "Congratulations, your account is created! Please log in.",
    // );
    //res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("register", {
      loggedIn: false,
      error: "An error occurred. Please try again later.",
      success: null,
    });
  }
});

// Login Route

app.get("/login", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("login", { loggedIn, success: req.flash("success") });
});

// Handle Login Using Passport
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/career",
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
// );

// Login POST Request (with strict rate limiting)
app.post("/login", authLimiter, async (req, res) => {
  const { username, password } = req.body;

  console.log("test-ketan login", req.body);

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Username or password is incorrect.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Password is incorrect.",
      });
    }

    req.session.user = user;
    req.session.isAuthenticated = true;
    outputJson = {
      code: 200,
      status: "Success",
      message: "Login Successfully",
    };
    res.json(outputJson);
  } catch (error) {
    return res.render("login", {
      loggedIn: false,
      error: "An error occurred. Please try again later.",
      success: null,
    });
  }
});

function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  return res.redirect("/login");
}

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while logging out.");
    }
    res.redirect("/login");
  });
});

// Career route removed - careers navigation now points to login page

// Redirect any direct career access to login page
app.get("/career", (req, res) => {
  res.redirect(301, "/login");
});

app.get("/service-areas", (req, res) => {
  res.render("service-areas");
});

// Services Page




// If you want a general services page
app.get("/services", (req, res) => {
  res.render("services");
});


// Event Security Page
app.get("/services/event-security", (req, res) => {
  res.render("services/event-security");
});



// Fire Watch Security Page
app.get("/services/fire-watch", (req, res) => {
  res.render("services/fire-watch");
});

// Hospital Security Page
app.get("/services/hospital-security", (req, res) => {
  res.render("services/hospital-security");
});

// Construction Security Page - handled by separate router

// Commercial Security Page - handled by separate router

// Shopping Center Security route is handled by the separate router file

// Educational Security Page (alias) - redirect to main route
app.get("/services/educational-security", (req, res) => {
  res.redirect(301, "/services/educational-campus-security");
});

// Armed Security Page - handled by separate router

// Unarmed Security Page - handled by separate router

// Executive Protection Page - handled by separate router

// Special Event Security Page

// Mobile Patrol Security Page (redirect to main patrol page)
app.get("/services/mobile-patrol-security", (req, res) => {
  res.redirect(301, "/services/patrol");
});

// Patrol Page - new handler with data
const patrolRoute = require('./routes/patrol');
app.use('/services/patrol', patrolRoute);

// Patrol Page (legacy redirect)
app.get("/patrol", (req, res) => {
  res.redirect(301, "/services/patrol");
});

// servicde area
app.get("/service-areas", (req, res) => {
  res.render("service-areas");
});

// Get Quote Page
app.get("/get-quote", (req, res) => {
  res.render("get-quote", {
    name: "",
    email: "",
    phone: "",
    message: "",
  });
});

// Handle Get Quote Form Submission
app.post("/get-quote", async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    services,
    facility,
    area,
    duration,
    message,
  } = req.body;

  try {
    // Check if email or username already exists
    // const emailExists = await getQuote.findOne({ email });
    // if (emailExists) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Email already exists. Please try a different email.",
    //   });
    // }

    let insObj = {
      name: name,
      companyName: company,
      email: email,
      contactNumber: phone,
      serviceType: services,
      facilityType: facility,
      serviceArea: area,
      durationOfService: area,
      additionalInformation: message,
    };

    // Save new user
    const newQuote = new getQuote(insObj);

    await newQuote.save();

    outputJson = {
      code: 200,
      status: "Success",
      message: "Quote request submitted successfully!",
    };
    return res.json(outputJson);
    // console.log("Quote Request Submitted:", { name, email, phone, message });
    // res.render("get-quote", {
    //   success: true,
    //   name: "",
    //   email: "",
    //   phone: "",
    //   message: "",
    // });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Something went wrong please try again",
    });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while logging out.");
    }
    res.redirect("/");
  });
});

// Contact Route

app.post("/contact", async (req, res) => {
  const { name, email, contact_number, best_time, message } = req.body;

  try {
    // Check if email or username already exists
    // const emailExists = await Contact.findOne({ email });
    // if (emailExists) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Email already exists. Please try a different email.",
    //   });
    // }

    let insObj = {
      name: name,
      email: email,
      contactNumber: contact_number,
      bestReachtime: best_time,
      message: message,
    };

    // Save new user
    const newContact = new Contact(insObj);

    await newContact.save();

    outputJson = {
      code: 200,
      status: "Success",
      message:
        "Thank you! Your message has been successfully submitted. We will get back to you shortly.",
    };
    return res.json(outputJson);

    // console.log("Contact Form Submitted:", {
    //   name,
    //   email,
    //   contact_number,
    //   best_time,
    //   message,
    // });

    // res.render("contact", {
    //   success: false,
    //   name,
    //   email,
    //   contact_number,
    //   best_time,
    //   message,
    // });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Something went wrong please try again",
    });

    console.error("Error submitting contact form:", error);

    res.render("contact", {
      success: false,
      name,
      email,
      contact_number,
      best_time,
      message,
    });
  }
});

// About Route

// Function to start server on available port
const startServer = (port) => {
  try {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log("=================================================");
      console.log(`Server is running on port ${port}`);
      console.log(`Local URL: http://0.0.0.0:${port}`);
      console.log(`Replit URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
      console.log("=================================================");
    });
    // Add error handling for the server
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};
// Start the server directly
startServer(PORT);

// ========================================
// COMPREHENSIVE CITY ROUTING
// Updated: 2025-11-04
// All cities from user's requirement
// ========================================

// Generic route for city pages
app.get('/city/:name', (req, res) => {
    const cityName = req.params.name.toLowerCase();
    res.render(`cities/${cityName}`, { city: cityName, title: cityName });
});

// Main city/county routes
app.get('/los-angeles', (req, res) => {
    res.render('cities/los-angeles', { title: 'Los Angeles', pageUrl: '/los-angeles' });
});

app.get('/los-angeles-security', (req, res) => {
    res.render('cities/los-angeles', { title: 'Los Angeles Security', pageUrl: '/los-angeles-security' });
});

app.get('/orange-county', (req, res) => {
    res.render('cities/orange-county', { title: 'Orange County', pageUrl: '/orange-county' });
});

app.get('/orange-county-security', (req, res) => {
    res.render('cities/orange-county', { title: 'Orange County Security', pageUrl: '/orange-county-security' });
});

app.get('/san-francisco', (req, res) => {
    res.render('cities/san-francisco', { title: 'San Francisco', pageUrl: '/san-francisco' });
});

app.get('/san-francisco-security', (req, res) => {
    res.render('cities/san-francisco', { title: 'San Francisco Security', pageUrl: '/san-francisco-security' });
});

app.get('/san-diego', (req, res) => {
    res.render('cities/san-diego', { title: 'San Diego', pageUrl: '/san-diego' });
});

app.get('/riverside-county', (req, res) => {
    res.render('cities/riverside-county', { title: 'Riverside County', pageUrl: '/riverside-county' });
});

app.get('/riverside-county-security', (req, res) => {
    res.render('cities/riverside-county', { title: 'Riverside County Security', pageUrl: '/riverside-county-security' });
});

app.get('/sacramento', (req, res) => {
    res.render('cities/sacramento', { title: 'Sacramento', pageUrl: '/sacramento' });
});

// Sacramento alternative county routes
app.get('/sacramento-county/sacramento', (req, res) => {
    res.render('cities/sacramento', { 
        title: 'Sacramento',
        cityName: 'Sacramento',
        pageUrl: '/sacramento-county/sacramento'
    });
});

// Sacramento security routes
app.get('/sacramento-security', (req, res) => {
    res.render('cities/sacramento', { 
        title: 'Sacramento Security',
        cityName: 'Sacramento',
        pageUrl: '/sacramento-security'
    });
});

app.get('/sacramento-county/sacramento-security', (req, res) => {
    res.render('cities/sacramento', { 
        title: 'Sacramento Security',
        cityName: 'Sacramento',
        pageUrl: '/sacramento-county/sacramento-security'
    });
});

app.get('/sacramento/sacramento-security', (req, res) => {
    res.render('cities/sacramento', { 
        title: 'Sacramento Security',
        cityName: 'Sacramento',
        pageUrl: '/sacramento/sacramento-security'
    });
});

app.get('/fresno', (req, res) => {
    res.render('cities/fresno', { 
        title: 'Fresno',
        cityName: 'Fresno',
        pageUrl: '/fresno'
    });
});

// ========================================
// LOS ANGELES COUNTY (35 cities)
// ========================================
const losAngelesCountyCities = [
    'alhambra', 'arcadia', 'azusa', 'baldwin-park', 'bellflower', 'beverly-hills',
    'burbank', 'calabasas', 'carson', 'cerritos', 'compton', 'culver-city', 'downey',
    'downtown-los-Angeles', 'el-monte', 'gardena', 'glendale', 'hawthorne',
    'hermosa-beach', 'hollywood', 'inglewood', 'la-mirada', 'lancaster', 'long-beach',
    'malibu', 'manhattan-beach', 'norwalk', 'palmdale', 'pasadena',
    'pomona', 'redondo-beach', 'santa-monica', 'torrance', 'west-hollywood', 'whittier'
];

losAngelesCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Route with /los-angeles/ prefix
    app.get(`/los-angeles/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/los-angeles/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Direct route without prefix
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/los-angeles/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/los-angeles/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// Special route for /los-angeles/downtown to map to downtown-los-Angeles
app.get('/los-angeles/downtown', (req, res) => {
    try {
        res.render('cities/downtown-los-Angeles', { 
            title: 'Downtown Los Angeles',
            cityName: 'Downtown Los Angeles',
            pageUrl: '/los-angeles/downtown'
        });
    } catch (error) {
        console.error('Error rendering downtown Los Angeles page:', error);
        res.status(500).send('Page not found');
    }
});

// ========================================
// ORANGE COUNTY (27 cities)
// ========================================
const orangeCountyCities = [
    'aliso-viejo', 'anaheim', 'brea', 'buena-park', 'costa-mesa', 'cypress', 'dana-point',
    'fountain-valley', 'fullerton', 'garden-grove', 'huntington-beach', 'irvine',
    'la-habra', 'laguna-beach', 'laguna-hills', 'laguna-niguel', 'lake-forest',
    'mission-viejo', 'newport-beach', 'orange', 'placentia',
    'san-clemente', 'santa-ana', 'tustin', 'westminster', 'yorba-linda'
];

orangeCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Orange County prefix route
    app.get(`/orange-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/orange-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Direct route without county prefix
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/orange-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/orange-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// SAN DIEGO COUNTY (18 cities)
// ========================================
const sanDiegoCountyCities = [
    'carlsbad', 'chula-vista', 'coronado', 'del-mar', 'el-cajon', 'encinitas',
    'escondido', 'imperial-beach', 'la-mesa', 'lemon-grove', 'national-city',
    'oceanside', 'poway', 'san-diego', 'san-marcos', 'santee', 'solana-beach', 'vista'
];

sanDiegoCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/california/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/california/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/california/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/california/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// SACRAMENTO COUNTY (18 cities)
// ========================================
const sacramentoCountyCities = [
    'carmichael', 'citrus-heights', 'davis', 'downtown-sacramento', 'east-sacramento', 'elk-grove',
    'fair-oaks', 'folsom', 'isleton', 'land-park', 'midtown', 'midtown-sacramento',
    'natomas', 'pocket', 'rancho-cordova', 'roseville', 'west-sacramento', 'woodland'
];

sacramentoCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/sacramento-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/sacramento-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/sacramento/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/sacramento/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/sacramento-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/sacramento-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/sacramento/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/sacramento/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// RIVERSIDE COUNTY (13 cities)
// ========================================
const riversideCountyCities = [
    'cathedral-city', 'coachella', 'corona', 'hemet', 'indio', 'la-quinta',
    'moreno-valley', 'murrieta', 'palm-springs', 'perris', 'riverside', 'temecula'
];

riversideCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/riverside-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/riverside-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/riverside-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/riverside-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// SAN BERNARDINO COUNTY (18 cities)
// ========================================
const sanBernardinoCities = [
    'apple-valley', 'barstow', 'big-bear-lake', 'chino', 'chino-hills', 'colton',
    'fontana', 'hesperia', 'highland', 'montclair', 'ontario', 'rancho-cucamonga',
    'redlands', 'rialto', 'san-bernardino', 'twentynine-palms', 'upland', 'victorville'
];

sanBernardinoCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix route
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// SANTA CLARA COUNTY (11 cities)
// ========================================
const santaClaraCities = [
    'campbell', 'cupertino', 'gilroy', 'los-gatos', 'milpitas', 'morgan-hill',
    'mountain-view', 'palo-alto', 'san-jose', 'santa-clara', 'sunnyvale'
];

santaClaraCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/santa-clara-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/santa-clara-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/santa-clara-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/santa-clara-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// ALAMEDA COUNTY (13 cities)
// ========================================
const alamedaCountyCities = [
    'alameda', 'berkeley', 'castro-valley', 'dublin', 'emeryville', 'fremont',
    'hayward', 'newark', 'oakland', 'pleasanton', 'san-leandro', 'san-lorenzo', 'union-city'
];

alamedaCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/alameda-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/alameda-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/alameda-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/alameda-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// VENTURA COUNTY (10 cities)
// ========================================
const venturaCountyCities = [
    'camarillo', 'fillmore', 'moorpark', 'ojai', 'oxnard', 'port-hueneme',
    'santa-paula', 'simi-valley', 'thousand-oaks', 'ventura'
];

venturaCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/ventura-county/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/ventura-county/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/ventura-county/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/ventura-county/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// CENTRAL VALLEY COUNTIES (15 cities)
// ========================================
const centralValleyCities = [
    'bakersfield', 'clovis', 'davis', 'delano', 'fresno', 'hanford', 'lemoore',
    'madera', 'merced', 'modesto', 'porterville', 'stockton', 'tulare', 'visalia', 'woodland'
];

centralValleyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/central-valley/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/central-valley/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix routes
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    app.get(`/central-valley/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/central-valley/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

// ========================================
// BAY AREA & OTHER CITIES (6 cities)
// ========================================
const otherCities = [
    'san-fernando', 'south-gate', 'van-nuys', 'whittier', 'huntington-park'
];

otherCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    app.get(`/${city}`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: formattedCity,
                cityName: formattedCity,
                pageUrl: `/${city}`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
    
    // Security suffix route
    app.get(`/${city}-security`, (req, res) => {
        try {
            res.render(`cities/${city}`, { 
                title: `${formattedCity} Security`,
                cityName: formattedCity,
                pageUrl: `/${city}-security`
            });
        } catch (error) {
            console.error(`Error rendering ${city} page:`, error);
            res.status(500).send('Page not found');
        }
    });
});

const shoppingCenterSecurityRoute = require('./routes/shopping-center-security');
const hotelSecurityRoutes = require('./routes/hotel-security');
const specialEventSecurityRoutes = require('./routes/special-event-security');

// Use routes
app.use('/services/apartment-security', apartmentSecurityRouter);
app.use('/services/armed-security', armedSecurityRoutes);
app.use('/services/commercial-security', commercialSecurityRoutes);
app.use('/services/construction-security', constructionSecurityRoutes);
app.use('/services/educational-campus-security', educationalSecurityRoutes);
app.use('/services/executive-protection', executiveProtectionRoute);
app.use('/services/fire-watch', fireWatchRoute);
app.use('/services/hospital-security', hospitalSecurityRouter);
app.use('/services/hotel-security', hotelSecurityRoutes);
app.use('/services/shopping-center-security', shoppingCenterSecurityRoute);
app.use('/services/special-event-security', specialEventSecurityRoutes);
app.use('/services/unarmed-security', require('./routes/unarmed-security'));

// Start the server