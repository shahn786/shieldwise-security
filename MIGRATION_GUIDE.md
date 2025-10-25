# Migration Guide: index.js → src/ Architecture

## Overview

The ShieldWise Security application currently runs on a monolithic `index.js` (1440 lines) with 100+ routes. A new modular architecture has been created in the `src/` directory following MVC best practices and production security standards.

**Current Status:** ⚠️ **Dual Architecture**
- **Active:** `index.js` (production - all routes working)
- **Ready:** `src/server.js` (new architecture - API routes ready, page routes pending migration)

---

## Why Migrate?

### Benefits of New Architecture

| Feature | Old (index.js) | New (src/) |
|---------|----------------|------------|
| **Structure** | Monolithic file | Modular MVC |
| **Maintainability** | Difficult (1440 lines) | Easy (separated concerns) |
| **Security** | Basic | Advanced (Helmet, validation, rate limiting) |
| **Logging** | Console only | Winston + Morgan (file rotation) |
| **Error Handling** | Basic | Comprehensive with stack traces |
| **Testing** | Difficult | Easy (unit testable modules) |
| **Scalability** | Limited | Highly scalable |

---

## New Architecture Overview

```
src/
├── server.js              # Main entry point (Express app initialization)
├── config/
│   ├── database.js        # MongoDB connection with retry logic
│   └── session.js         # Secure session configuration
├── models/
│   ├── User.js            # User model (migrated from index.js)
│   ├── Contact.js         # Contact model (migrated)
│   └── Quote.js           # Quote model (migrated)
├── controllers/
│   ├── contactController.js   # Contact form business logic
│   └── quoteController.js     # Quote request business logic
├── middleware/
│   ├── security.js        # Helmet, CSP, custom headers
│   ├── rateLimiter.js     # 3-tier rate limiting
│   └── validation.js      # Input validation & sanitization
├── routes/
│   └── api.js             # API endpoints (/api/contact, /api/quote)
└── utils/
    └── logger.js          # Winston logging configuration
```

---

## Migration Strategy

### Phase 1: API Routes (✅ COMPLETE)

**Status:** API routes have been successfully migrated and tested.

**Migrated Endpoints:**
- `POST /api/contact` - Contact form submissions
- `POST /api/quote` - Quote request submissions

**Features Added:**
- ✅ Input validation with express-validator
- ✅ Rate limiting (5 requests per 15 min)
- ✅ Sanitization & HTML escaping
- ✅ IP tracking & user agent logging
- ✅ Error handling with proper HTTP status codes

---

### Phase 2: Page Routes (⏳ PENDING)

**Routes to Migrate:** 100+ page routes from index.js

**Recommended Approach:** Group routes by category and migrate incrementally.

#### 2.1 Service Pages (14 routes)

Create `src/routes/services.js`:

```javascript
const express = require('express');
const router = express.Router();
const metaHelpers = require('../../utils/metaHelpers');

// Apartment Security
router.get('/apartment-security', (req, res) => {
  const serviceData = {
    serviceTitle: 'Professional Apartment Security Services',
    // ... service data from index.js line 205-224
  };
  res.render('services/apartment-security', { serviceData, ...metaHelpers });
});

// Add 13 more service routes
// /event-security, /fire-watch, /hospital-security, etc.

module.exports = router;
```

Update `src/server.js`:
```javascript
const serviceRoutes = require('./routes/services');
app.use('/services', serviceRoutes);
```

**Checklist:**
- [ ] Create src/routes/services.js
- [ ] Migrate 14 service routes
- [ ] Test all service pages
- [ ] Update index.js (remove migrated routes)

---

#### 2.2 City/County Pages (186+ routes)

Create `src/routes/cities.js`:

```javascript
const express = require('express');
const router = express.Router();
const cityData = require('../../config/cities-data');

// Dynamic city route
router.get('/:county/:city', (req, res) => {
  const { county, city } = req.params;
  const data = cityData.getCityInfo(county, city);
  
  if (!data) {
    return res.status(404).render('404');
  }
  
  res.render('cities/city-template', { ...data });
});

module.exports = router;
```

**Checklist:**
- [ ] Extract city data to config file
- [ ] Create dynamic city route handler
- [ ] Create county-specific routes
- [ ] Test 10+ cities across different counties
- [ ] Update index.js

---

#### 2.3 Authentication Routes

Create `src/routes/auth.js`:

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateUserRegistration, handleValidationErrors } = require('../middleware/validation');

// Registration
router.get('/register', authController.showRegister);
router.post('/register', 
  authLimiter,
  validateUserRegistration,
  handleValidationErrors,
  authController.register
);

// Login
router.get('/login', authController.showLogin);
router.post('/login', 
  authLimiter,
  authController.login
);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
```

Create `src/controllers/authController.js`:

```javascript
const User = require('../models/User');
const passport = require('passport');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      position: req.body.position,
      guardCardNo: req.body.guardCardNo,
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();
    logger.info(`New user registered: ${user.username}`);
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    logger.error('Registration error:', error);
    req.flash('error', 'Registration failed. Please try again.');
    res.redirect('/register');
  }
};

// Add login, logout methods
```

**Checklist:**
- [ ] Create src/routes/auth.js
- [ ] Create src/controllers/authController.js
- [ ] Migrate registration logic
- [ ] Migrate login logic
- [ ] Migrate logout logic
- [ ] Add authentication middleware
- [ ] Test full auth flow

---

#### 2.4 Static Pages

Create `src/routes/pages.js`:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { 
    title: 'ShieldWise Security - Professional Security Services' 
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us - ShieldWise Security' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us - ShieldWise Security' });
});

router.get('/get-quote', (req, res) => {
  res.render('get-quote', { title: 'Get a Quote - ShieldWise Security' });
});

// Add more static pages

module.exports = router;
```

**Checklist:**
- [ ] Create src/routes/pages.js
- [ ] Migrate static page routes
- [ ] Test all static pages
- [ ] Update navigation links

---

### Phase 3: Final Cleanup

Once all routes are migrated:

1. **Rename Files:**
   ```bash
   mv index.js index.js.old.backup
   mv src/server.js index.js
   ```

2. **Update package.json:**
   ```json
   {
     "main": "index.js",
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

3. **Verify Everything Works:**
   ```bash
   npm start
   # Test all major pages
   # Test all forms
   # Test authentication
   ```

4. **Delete Old Code:**
   ```bash
   rm index.js.old.backup
   ```

5. **Update Documentation:**
   - Update replit.md with new architecture
   - Mark migration complete in MIGRATION_GUIDE.md

---

## Testing Checklist

After each phase, verify:

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] All migrated routes return 200 status
- [ ] Forms submit successfully
- [ ] Authentication works (login/logout)
- [ ] Session persists across requests
- [ ] Rate limiting triggers correctly
- [ ] Input validation rejects invalid data
- [ ] Error pages render (404, 500)
- [ ] Logs are being written to files
- [ ] No console errors in browser
- [ ] CSP headers don't block resources

---

## Rollback Plan

If migration causes issues:

1. **Immediate Rollback:**
   ```bash
   git checkout index.js
   npm start
   ```

2. **Package.json Revert:**
   ```json
   {
     "main": "index.js",
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

3. **Debug New Architecture:**
   ```bash
   npm run start:new  # Run new architecture separately
   # Check logs in logs/ directory
   # Fix issues
   ```

---

## Current Commands

```bash
# Run old architecture (current production)
npm start

# Run new architecture (testing only)
npm run start:new

# Development mode
npm run dev
```

---

## Estimated Timeline

| Phase | Complexity | Time Estimate | Priority |
|-------|------------|---------------|----------|
| API Routes | Low | ✅ Complete | High |
| Static Pages | Low | 2-4 hours | Medium |
| Service Pages | Medium | 4-6 hours | Medium |
| City Pages | Medium | 6-8 hours | Low |
| Auth Routes | Medium | 4-6 hours | High |
| Testing & QA | Medium | 4-8 hours | High |
| **Total** | - | **20-32 hours** | - |

---

## Migration Benefits Summary

### Security Improvements
- ✅ Helmet.js with strict CSP
- ✅ Rate limiting on all forms
- ✅ Input validation & sanitization
- ✅ Secrets in environment variables
- ✅ HTTPS enforcement
- ✅ Secure session configuration

### Code Quality
- ✅ Separation of concerns (MVC)
- ✅ DRY principle (no duplication)
- ✅ Unit testable modules
- ✅ Clear folder structure
- ✅ Comprehensive error handling

### Operations
- ✅ File-based logging with rotation
- ✅ Structured JSON logs
- ✅ Request/response tracking
- ✅ Performance monitoring ready
- ✅ Graceful shutdown handling

---

## Questions?

Contact the development team for migration support or refer to:
- `README.md` - Deployment & usage
- `reports/security-audit.md` - Security details
- `src/` directory - New architecture examples

---

**Status:** Ready for gradual migration  
**Last Updated:** October 25, 2025  
**Next Step:** Migrate static pages (Phase 2.4)
