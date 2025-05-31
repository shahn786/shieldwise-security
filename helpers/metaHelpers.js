
// helpers/metaHelpers.js
module.exports = {
  truncateTitle: function (title, maxLength = 58) {
    if (!title) return 'Security Services | ShieldWise';
    const suffix = ' | ShieldWise';
    const maxTitleLength = maxLength - suffix.length;
    if (title.length > maxTitleLength) {
      return title.substring(0, maxTitleLength).trim() + '...' + suffix;
    } else {
      return title + suffix;
    }
  },

  truncateDescription: function (desc, maxLength = 155) {
    if (!desc) {
      return 'Professional security services in California. BSIS licensed guards, 24/7 monitoring. Call 1-800-SHIELD-1 for free assessment.';
    }
    if (desc.length > maxLength) {
      return desc.substring(0, maxLength).trim() + '...';
    }
    return desc;
  },

  generateDynamicKeywords: function (baseKeywords, serviceType, location = 'California') {
    const base = baseKeywords || '';
    const dynamic = `${serviceType} security, ${location} security company, licensed security guards, 24/7 security services`;
    return base + (base ? ', ' : '') + dynamic;
  }
};
