# NAP Standardization Guide for ShieldWise Security

## Canonical Business Information (USE THESE EVERYWHERE)

### Primary Contact Information
**Company Name (Standard):** ShieldWise Security  
**Legal Name:** ShieldWise Security Services, Inc.  
**Primary Phone:** (714) 716-7430  
**Emergency 24/7:** (800) 743-5301  

### Headquarters Address
**Street:** 123 Security Boulevard  
**City:** Los Angeles  
**State:** CA  
**ZIP:** 90001  
**Full Address:** 123 Security Boulevard, Los Angeles, CA 90001

### Email
**General Contact:** info@shieldwisesecurity.com  
**Quotes:** quotes@shieldwisesecurity.com  
**Emergency:** emergency@shieldwisesecurity.com

### Website
**Primary Domain:** https://shieldwisesecurity.com

---

## Schema.org Standardization

### For Organization Schema:
```json
{
  "@type": "Organization",
  "name": "ShieldWise Security",
  "legalName": "ShieldWise Security Services, Inc.",
  "telephone": "+1-714-716-7430",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Security Boulevard",
    "addressLocality": "Los Angeles",
    "addressRegion": "CA",
    "postalCode": "90001",
    "addressCountry": "US"
  }
}
```

### For LocalBusiness Schema (City Pages):
- Use consistent HQ address
- Primary phone: (714) 716-7430
- Service area: Specific city/county being served
- Keep "areaServed" property for each city

---

## Implementation Rules

1. **Footer Contact Info:** Always use (714) 716-7430 and HQ address
2. **Schema Markup:** Always use standardized NAP
3. **City Pages:** Reference HQ but specify local service area
4. **Service Pages:** Use primary phone (714) 716-7430
5. **Contact Page:** Show primary phone prominently
6. **Emergency Services:** Can mention 24/7 line (800) 743-5301 as secondary

---

## Files to Update

### High Priority:
- [ ] Public/schemas/organizationSchema.js
- [ ] Public/schemas/serviceAreaSchema.js  
- [ ] views/partials/Footer.ejs
- [ ] views/contact.ejs
- [ ] All city page templates

### Medium Priority:
- [ ] All service page templates
- [ ] Schema partials
- [ ] Meta tag partials

---

## Testing Checklist

After implementation:
- [ ] Verify NAP consistency on homepage
- [ ] Check 10 random city pages for consistent NAP
- [ ] Validate Organization schema with Rich Results Test
- [ ] Verify LocalBusiness schema on city pages
- [ ] Check footer across all pages
- [ ] Verify Google My Business matches exactly
