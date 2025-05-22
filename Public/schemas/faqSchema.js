
// FAQ Schema for Security Services
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What security services does ShieldWise Security provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShieldWise Security provides comprehensive security services including Mobile Patrol Security, Event Security Services, Fire Watch Security, Hospital Security, Hotel Security, Apartment Security, Construction Site Security, Shopping Center Security, Educational Campus Security, Armed Security Services, Unarmed Security Services, Executive Protection, Special Event Security, Commercial Security, Residential Security, VIP Protection, Bodyguard Services, 24/7 Security Monitoring, Rapid Response Security, Access Control, Loss Prevention, Surveillance Services, and Emergency Response throughout Los Angeles and Southern California.",
        "dateCreated": "2024-01-01",
        "author": {
          "@type": "Organization",
          "name": "ShieldWise Security"
        }
      }
    }
    // ... rest of your existing FAQ items
  ]
};

module.exports = faqSchema;
