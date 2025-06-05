const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas Database Connection - Using a simpler connection string

const uri = "mongodb+srv://shahnawazkarimi2014:No0708156402@cluster0.y5o4d.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  tls: true,
  tlsInsecure: true,
  retryWrites: true
})
.then(() => console.log("✅ Connected successfully to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));


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

// Session setup
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      crypto: {
        secret: 'squirrel'
      },
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native'
    }),
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the Public directory
app.use(express.static(path.join(__dirname, "Public")));
app.use('/schemas', express.static('Public/schemas'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

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

// Apartment Security Service Route
app.get('/services/apartment-security', (req, res) => {
  const serviceData = {
    serviceTitle: 'Professional Apartment Security Services',
    serviceDescription: 'Comprehensive apartment security services with 24/7 guards, access control, CCTV monitoring, and emergency response for residential communities.',
    serviceKeywords: 'apartment security, residential security guards, access control systems, 24/7 security monitoring, property protection',
    serviceImage: 'apartmentsecurity.webp',
    serviceUrl: 'apartment-security',
    serviceType: 'apartment',
    serviceBenefit: 'enhanced residential safety and peace of mind',
    propertyType: 'apartment complex',
    priceRange: { low: 35, mid: 55, high: 85 },
    serviceAltName: 'Residential Security Services',
    serviceOutput: 'Complete apartment complex protection',
    audienceType: 'Property Managers and Residents',
    relatedProperty: 'apartments',
    specializedServices: 'access control systems, CCTV monitoring, visitor management, parking area security, emergency response protocols',
    industryType: 'residential',
    clientType: 'residents and property managers',
    managerType: 'property managers',
    assessmentSpecifics: 'resident safety protocols, common area security evaluation, parking garage assessment'
  };

  res.render('services/apartment-security', { 
    serviceData,
    safeServiceData: serviceData,
    ...metaHelpers
  });
});

// Import route modules
const armedSecurityRouter = require('./routes/armed-security');

// Routes
app.get("/", (req, res) => res.render("index"));

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    success: undefined,
    name: "",
    email: "",
    contact_number: "",
    best_time: "",
    message: "",
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

app.get("/career", (req, res) => {
  const username = req.session.user ? req.session.user.username : null;
  res.render("career", { loggedIn: true, username });
});

app.get("/service-areas", (req, res) => {
  res.render("service-areas");
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
app.use('/services/armed-security', armedSecurityRouter);

// Register Route
app.get("/register", (req, res) => {
  const loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  res.render("register", { loggedIn, error: null, success: null });
});

// Handle Registration
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/career", isAuthenticated, (req, res) => {
  const username = req.session.user ? req.session.user.username : null;
  res.render("career", { loggedIn: true, username });
});

// app.get("/career", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }
//   const username = req.user ? req.user.username : null;
//   res.render("career", { loggedIn: true, username });
// });

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

// Hotel Security Page
app.get("/services/hotel-security", (req, res) => {
  res.render("services/hotel-security");
});

// Construction Security Page
app.get("/services/construction-security", (req, res) => {
  res.render("services/construction-security");
});

// Commercial Security Page
app.get("/services/commercial-security", (req, res) => {
  res.render("services/commercial-security");
});

// Shopping Center Security Page
app.get("/services/shopping-center-security", (req, res) => {
  res.render("services/shopping-center-security");
});

// Educational Campus Security Page
app.get("/services/educational-campus-security", (req, res) => {
  res.render("services/educational-campus-security");
});

// Educational Security Page (alias)
app.get("/services/educational-security", (req, res) => {
  res.render("services/educational-campus-security");
});

// Armed Security Page
app.get("/services/armed-security", (req, res) => {
  res.render("services/armed-security");
});

// Unarmed Security Page
app.get("/services/unarmed-security", (req, res) => {
  res.render("services/unarmed-security");
});

// Executive Protection Page
app.get("/services/executive-protection", (req, res) => {
  res.render("services/executive-protection");
});

// Special Event Security Page
app.get("/services/special-event-security", (req, res) => {
  res.render("services/special-event-security");
});

// Mobile Patrol Security Page
app.get("/services/mobile-patrol-security", (req, res) => {
  res.render("services/patrol");
});

// Patrol Page
app.get("/patrol", (req, res) => {
  res.render("patrol");
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

// Generic route for city pages
app.get('/city/:name', (req, res) => {
    const cityName = req.params.name.toLowerCase();
    res.render(`cities/${cityName}`, { city: cityName, title: cityName });
});

// Main city routes
app.get('/los-angeles', (req, res) => {
    res.render('cities/los-angeles', { title: 'Los Angeles' });
});

app.get('/orange-county', (req, res) => {
    res.render('cities/orange-county', { title: 'Orange County' });
});

app.get('/san-francisco', (req, res) => {
    res.render('cities/san-francisco', { title: 'San Francisco' });
});

app.get('/san-diego', (req, res) => {
    res.render('cities/san-diego', { title: 'San Diego' });
});

app.get('/riverside-county', (req, res) => {
    res.render('cities/riverside-county', { title: 'Riverside County' });
});

app.get('/san-bernardino', (req, res) => {
    res.render('cities/san-bernardino', { title: 'San Bernardino' });
});

// Los Angeles area routes
const losAngelesAreas = [
    'downtown', 'hollywood', 'beverly-hills', 'santa-monica', 'pasadena',
    'glendale', 'burbank', 'west-hollywood', 'long-beach', 'torrance',
    'culver-city', 'malibu', 'san-fernando', 'van-nuys', 'inglewood',
    'compton', 'palmdale', 'lancaster', 'pomona', 'whittier',
    'el-monte', 'hawthorne', 'south-gate', 'arcadia', 'azusa',
    'baldwin-park', 'bellflower', 'calabasas', 'carson', 'cypress',
    'downey', 'gardena', 'hermosa-beach', 'huntington-park', 'la-mirada',
    'manhattan-beach', 'norwalk', 'redondo-beach'
];

losAngelesAreas.forEach(area => {
    const formattedArea = area.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    app.get(`/los-angeles/${area}`, (req, res) => {
        // Special case for downtown-los-Angeles.ejs file
        if (area === 'downtown') {
            res.render('cities/downtown-los-Angeles', { title: `${formattedArea} Los Angeles` });
        } else {
            res.render(`cities/${area}`, { title: formattedArea });
        }
    });
});

// Riverside County cities routes
const riversideCountyCities = [
    'riverside', 'corona', 'moreno-valley', 'temecula', 'palm-springs',
    'hemet', 'murrieta', 'perris', 'indio', 'coachella',
    'cathedral-city', 'la-quinta'
];

riversideCountyCities.forEach(city => {
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    app.get(`/riverside-county/${city}`, (req, res) => {
        res.render(`cities/${city}`, { title: formattedCity });
    });
});

// Orange County cities routes - all files at views/cities/[CityName].ejs
const orangeCountyCities = [
    'anaheim', 'irvine', 'santa-ana', 'newport-beach', 'huntington-beach',
    'garden-grove', 'fullerton', 'costa-mesa', 'laguna-beach', 'mission-viejo',
    'tustin', 'lake-forest', 'westminster', 'cypress', 'aliso-viejo',
    'laguna-niguel', 'orange', 'dana-point', 'san-clemente', 'buena-park',
    'fountain-valley', 'laguna-hills', 'yorba-linda', 'placentia'
];

orangeCountyCities.forEach(city => {
    // Format city name for display (e.g., 'santa-ana' becomes 'Santa Ana')
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    app.get(`/orange-county/${city}`, (req, res) => {
        res.render(`cities/${city}`, { title: formattedCity, cityName: formattedCity });
    });
});