
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

// MongoDB Atlas Database Connection
const uri = "mongodb+srv://shahnawazkarimi2014:No0708156402@cluster0.y5o4d.mongodb.net/?retryWrites=true&w=majority&tls=true";

// Using updated MongoDB connection options
mongoose
  .connect(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true, // Temporary fix for Replit environments specifically
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
      mongoUrl: uri
    }),
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));
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

// Routes

// Home Route
app.get("/", (req, res) => res.render("index"));

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
app.get("/services", (req, res) => {
  res.render("services"); //
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
    //   success: true,
    //   name: "",
    //   email: "",
    //   contact_number: "",
    //   best_time: "",
    //   message: "",
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

app.get('/city/:name', (req, res) => {
    const cityName = req.params.name.toLowerCase();
    const cityFilePath = path.join(__dirname, 'views', 'cities', `${cityName}.ejs`);

    res.render(`cities/${cityName}`, { city: cityName });
});
// Example: Direct access to Los Angeles page
app.get('/los-angeles', (req, res) => {
    res.render('cities/los-angeles');
});
app.get('/orange-county', (req, res) => {
    res.render('cities/orange-county');
});
app.get('/san-francisco', (req, res) => {
    res.render('cities/san-francisco');
});
app.get('/san-diego', (req, res) => {
    res.render('cities/san-diego'); // ✅ Correct spelling
});

// ✅ Route for Riverside County
app.get('/riverside-county', (req, res) => {
    res.render('cities/riverside-county'); // ✅ Correct spelling
});

// ✅ Route for San Bernardino County
// ✅ Route for Riverside County
app.get('/san-bernardino', (req, res) => {
    res.render('cities/san-bernardino'); // ✅ Must match views/cities/san-bernardino.ejs
});

// ✅ Route for Downtown Los Angeles
app.get('/los-angeles/downtown', (req, res) => {
    res.render('cities/downtown-los-Angeles', { title: 'Downtown Los Angeles' });
});

// Routes for additional LA areas
app.get('/los-angeles/hollywood', (req, res) => {
    res.render('cities/hollywood', { title: 'Hollywood' });
});

// ✅ Route for Beverly Hills Page
app.get('/los-angeles/beverly-hills', (req, res) => {
    res.render('cities/beverly-hills', { title: 'Beverly Hills' });
});


app.get('/los-angeles/santa-monica', (req, res) => {
    res.render('cities/santa-monica', { title: 'Santa Monica' });
});

app.get('/los-angeles/pasadena', (req, res) => {
    res.render('cities/pasadena', { title: 'Pasadena' });
});

app.get('/los-angeles/glendale', (req, res) => {
    res.render('cities/glendale', { title: 'Glendale' });
});

app.get('/los-angeles/burbank', (req, res) => {
    res.render('cities/burbank', { title: 'Burbank' });
});

app.get('/los-angeles/west-hollywood', (req, res) => {
    res.render('cities/west-hollywood', { title: 'West Hollywood' });
});

app.get('/los-angeles/long-beach', (req, res) => {
    res.render('cities/long-beach', { title: 'Long Beach' });
});

app.get('/los-angeles/torrance', (req, res) => {
    res.render('cities/torrance', { title: 'Torrance' });
});

app.get('/los-angeles/culver-city', (req, res) => {
    res.render('cities/culver-city', { title: 'Culver City' });
});

app.get('/los-angeles/malibu', (req, res) => {
    res.render('cities/malibu', { title: 'Malibu' });
});

app.get('/los-angeles/san-fernando', (req, res) => {
    res.render('cities/san-fernando', { title: 'San Fernando' });
});

app.get('/los-angeles/van-nuys', (req, res) => {
    res.render('cities/van-nuys', { title: 'Van Nuys' });
});

app.get('/los-angeles/inglewood', (req, res) => {
    res.render('cities/inglewood', { title: 'Inglewood' });
});

app.get('/los-angeles/compton', (req, res) => {
    res.render('cities/compton', { title: 'Compton' });
});

app.get('/los-angeles/palmdale', (req, res) => {
    res.render('cities/palmdale', { title: 'Palmdale' });
});

app.get('/los-angeles/lancaster', (req, res) => {
    res.render('cities/lancaster', { title: 'Lancaster' });
});

app.get('/los-angeles/pomona', (req, res) => {
    res.render('cities/pomona', { title: 'Pomona' });
});

app.get('/los-angeles/whittier', (req, res) => {
    res.render('cities/whittier', { title: 'Whittier' });
});

app.get('/los-angeles/el-monte', (req, res) => {
    res.render('cities/el-monte', { title: 'El Monte' });
});

app.get('/los-angeles/hawthorne', (req, res) => {
    res.render('cities/hawthorne', { title: 'Hawthorne' });
});

app.get('/los-angeles/south-gate', (req, res) => {
    res.render('cities/south-gate', { title: 'South Gate' });
});
