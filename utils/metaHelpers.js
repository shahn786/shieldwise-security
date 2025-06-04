
function truncateTitle(title) {
  return title.length > 60 ? title.slice(0, 57) + '...' : title;
}

function truncateDescription(desc) {
  return desc.length > 160 ? desc.slice(0, 157) + '...' : desc;
}

function generateDynamicKeywords(keywords, serviceType) {
  // Convert keywords to array if it's a string
  const keywordArray = typeof keywords === 'string' ? keywords.split(', ') : keywords;
  
  // Add additional keywords and join
  const allKeywords = [...keywordArray, serviceType, 'security', 'guards', 'California', 'professional'];
  
  return allKeywords.join(', ');
}

module.exports = { truncateTitle, truncateDescription, generateDynamicKeywords };
