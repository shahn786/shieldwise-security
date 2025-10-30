const fs = require('fs');
const path = require('path');
const { getPrimaryKeyword, getTopKeywords, getKeywordsForCity } = require('./hyperlocal-seo-keywords');

// Generic keyword generator for cities not in the main matrix
function generateKeywordsForCity(cityName) {
  return [
    { priority: 1, baseTerm: "security guard services", keyword: `Best licensed security guard services in ${cityName} CA`, intent: "Quality/Transactional" },
    { priority: 2, baseTerm: "hire security guard", keyword: `Hire a security guard near ${cityName} CA`, intent: "Transactional/Immediate" },
    { priority: 3, baseTerm: "armed security guards", keyword: `Armed security guards in ${cityName} California`, intent: "Specific/Transactional" },
    { priority: 4, baseTerm: "private security company", keyword: `Private security company ${cityName} CA`, intent: "Transactional" },
    { priority: 5, baseTerm: "event security services", keyword: `24 hour event security services in ${cityName}`, intent: "Urgency/Specific" },
    { priority: 6, baseTerm: "retail security guards", keyword: `Retail security guards ${cityName} CA`, intent: "Specific/Commercial" },
    { priority: 7, baseTerm: "construction site security", keyword: `Overnight construction site security ${cityName} CA`, intent: "Urgency/Specific" },
    { priority: 8, baseTerm: "mobile patrol security", keyword: `Licensed mobile patrol security services ${cityName} CA`, intent: "Quality/Specific" },
    { priority: 9, baseTerm: "24 hour security guard", keyword: `24 hour security guard ${cityName} CA`, intent: "Urgency/Immediate" },
    { priority: 10, baseTerm: "licensed security guards", keyword: `Licensed security guards in ${cityName}`, intent: "Quality/Trust" },
    { priority: 11, baseTerm: "manned guarding services", keyword: `Professional manned guarding services ${cityName} CA`, intent: "Quality/Specific" },
    { priority: 12, baseTerm: "corporate security officers", keyword: `Hire corporate security officers in ${cityName} CA`, intent: "Transactional/Specific" },
    { priority: 13, baseTerm: "residential security guards", keyword: `Residential security guards ${cityName} California`, intent: "Specific/Residential" },
    { priority: 14, baseTerm: "night security guard services", keyword: `Night security guard services ${cityName}`, intent: "Urgency/Overnight" },
    { priority: 15, baseTerm: "professional security guards", keyword: `Professional security guards ${cityName} CA`, intent: "Quality/General" },
    { priority: 16, baseTerm: "static security guards", keyword: `Static security guards ${cityName} CA`, intent: "Specific/Property" },
    { priority: 17, baseTerm: "VIP protection services", keyword: `Executive VIP protection services ${cityName} CA`, intent: "Specific/Executive" },
    { priority: 18, baseTerm: "alarm response security", keyword: `Rapid alarm response security ${cityName} CA`, intent: "Urgency/Immediate" },
    { priority: 19, baseTerm: "commercial property security", keyword: `Commercial property security ${cityName} CA`, intent: "Specific/Commercial" },
    { priority: 20, baseTerm: "security company near me", keyword: `Security company near ${cityName} CA`, intent: "Local/Transactional" }
  ];
}

// Get keywords for any city (from matrix or generated)
function getAllKeywordsForCity(cityName) {
  let keywords = getKeywordsForCity(cityName);
  if (keywords.length === 0) {
    keywords = generateKeywordsForCity(cityName);
  }
  return keywords;
}

// Generate enhanced schema markup with OfferCatalog
function generateEnhancedSchema(cityName, keywords) {
  const serviceOffers = keywords.slice(0, 10).map(kw => {
    return `      {"@type":"Offer","itemOffered":{"@type":"Service","name":"${kw.baseTerm}","description":"${kw.keyword}"}}`;
  }).join(',\n');

  return `<!-- Enhanced Hyperlocal SEO Schema with OfferCatalog -->
                <script type="application/ld+json">
                {
                  "@context":"https://schema.org",
                  "@type":"LocalBusiness",
                  "name":"ShieldWise Security - ${cityName}",
                  "areaServed":"${cityName}, CA",
                  "telephone":"(714) 716-7430",
                  "address":{"@type":"PostalAddress","addressLocality":"${cityName}","addressRegion":"CA","addressCountry":"US"},
                  "hasOfferCatalog":{
                    "@type":"OfferCatalog",
                    "name":"Security Services in ${cityName}",
                    "itemListElement":[
${serviceOffers}
                    ]
                  },
                  "knowsAbout":[
                    "Armed Security Guards",
                    "Mobile Patrol Security",
                    "Construction Site Security",
                    "Event Security Services",
                    "Corporate Security",
                    "Residential Security",
                    "24/7 Security Guards",
                    "VIP Protection Services"
                  ]
                }
                </script>`;
}

// Generate optimized meta keywords
function generateMetaKeywords(keywords) {
  return keywords.slice(0, 15).map(kw => kw.baseTerm).join(', ');
}

// Generate optimized meta description
function generateMetaDescription(cityName, primaryKeyword) {
  return `${primaryKeyword}. Licensed, 24/7 armed & unarmed security guards for businesses, events & properties in ${cityName}. Rapid response. Free quote.`;
}

// Enhance H1 tag
function enhanceH1(fileContent, cityName, primaryKeyword) {
  const h1Regex = /<h1[^>]*>.*?<\/h1>/i;
  
  // Remove any existing "cheapest and best" claims to avoid duplication
  fileContent = fileContent.replace(/<p[^>]*class="cheapest-best-claim[^"]*"[^>]*>.*?<\/p>/gi, '');
  
  const newH1 = `<h1>${primaryKeyword}</h1>
            <p class="cheapest-best-claim animate-fade-in-delay">Cheapest and best security guard services in ${cityName}, California.</p>`;
  
  return fileContent.replace(h1Regex, newH1);
}

// Enhance meta tags
function enhanceMetaTags(fileContent, cityName, keywords) {
  const primaryKeyword = keywords[0].keyword;
  const metaKeywords = generateMetaKeywords(keywords);
  const metaDescription = generateMetaDescription(cityName, primaryKeyword);
  
  // Update title
  const titleRegex = /<title>.*?<\/title>/i;
  const newTitle = `<title>${cityName} Security Guards | ${keywords[0].baseTerm} | ShieldWise</title>`;
  fileContent = fileContent.replace(titleRegex, newTitle);
  
  // Update meta description
  const descRegex = /<meta name="description" content="[^"]*"/i;
  fileContent = fileContent.replace(descRegex, `<meta name="description" content="${metaDescription}"`);
  
  // Update meta keywords
  const keywordsRegex = /<meta name="keywords" content="[^"]*"/i;
  fileContent = fileContent.replace(keywordsRegex, `<meta name="keywords" content="${metaKeywords}, ${cityName} security guards, BSIS licensed, 24/7 security"`);
  
  return fileContent;
}

// Add enhanced schema before closing </head>
function addEnhancedSchema(fileContent, cityName, keywords) {
  const headCloseRegex = /<\/head>/i;
  const enhancedSchema = generateEnhancedSchema(cityName, keywords);
  
  // Remove old enhanced schema if exists
  fileContent = fileContent.replace(/<!-- Enhanced Hyperlocal SEO Schema.*?<\/script>/s, '');
  
  return fileContent.replace(headCloseRegex, `\n${enhancedSchema}\n            </head>`);
}

// Process a single city file
function processCityFile(citySlug, cityName) {
  const filePath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${cityName} - file not found: ${citySlug}.ejs`);
    return false;
  }
  
  try {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const keywords = getAllKeywordsForCity(cityName);
    
    // Apply enhancements
    fileContent = enhanceH1(fileContent, cityName, keywords[0].keyword);
    fileContent = enhanceMetaTags(fileContent, cityName, keywords);
    fileContent = addEnhancedSchema(fileContent, cityName, keywords);
    
    // Write enhanced file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ Enhanced: ${cityName} (${citySlug}.ejs)`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${cityName}:`, error.message);
    return false;
  }
}

// Main execution
function enhanceAllCities() {
  console.log('\n🚀 Starting Hyperlocal SEO Enhancement for All City Pages...\n');
  
  const cities = [
    { slug: 'los-angeles', name: 'Los Angeles' },
    { slug: 'san-diego', name: 'San Diego' },
    { slug: 'san-jose', name: 'San Jose' },
    { slug: 'san-francisco', name: 'San Francisco' },
    { slug: 'fresno', name: 'Fresno' },
    { slug: 'sacramento', name: 'Sacramento' },
    { slug: 'long-beach', name: 'Long Beach' },
    { slug: 'oakland', name: 'Oakland' },
    { slug: 'bakersfield', name: 'Bakersfield' },
    { slug: 'anaheim', name: 'Anaheim' },
    { slug: 'santa-ana', name: 'Santa Ana' },
    { slug: 'riverside', name: 'Riverside' },
    { slug: 'stockton', name: 'Stockton' },
    { slug: 'irvine', name: 'Irvine' },
    { slug: 'chula-vista', name: 'Chula Vista' },
    { slug: 'fremont', name: 'Fremont' },
    { slug: 'san-bernardino', name: 'San Bernardino' },
    { slug: 'modesto', name: 'Modesto' },
    { slug: 'fontana', name: 'Fontana' },
    { slug: 'moreno-valley', name: 'Moreno Valley' },
    { slug: 'glendale', name: 'Glendale' },
    { slug: 'huntington-beach', name: 'Huntington Beach' },
    { slug: 'santa-clara', name: 'Santa Clara' },
    { slug: 'garden-grove', name: 'Garden Grove' },
    { slug: 'oceanside', name: 'Oceanside' },
    { slug: 'corona', name: 'Corona' },
    { slug: 'ontario', name: 'Ontario' },
    { slug: 'rancho-cucamonga', name: 'Rancho Cucamonga' },
    { slug: 'elk-grove', name: 'Elk Grove' },
    { slug: 'carlsbad', name: 'Carlsbad' },
    { slug: 'costa-mesa', name: 'Costa Mesa' },
    { slug: 'downey', name: 'Downey' },
    { slug: 'inglewood', name: 'Inglewood' },
    { slug: 'pasadena', name: 'Pasadena' },
    { slug: 'torrance', name: 'Torrance' },
    { slug: 'fullerton', name: 'Fullerton' },
    { slug: 'orange', name: 'Orange' },
    { slug: 'escondido', name: 'Escondido' },
    { slug: 'sunnyvale', name: 'Sunnyvale' },
    { slug: 'hayward', name: 'Hayward' },
    { slug: 'palmdale', name: 'Palmdale' },
    { slug: 'salinas', name: 'Salinas' },
    { slug: 'pomona', name: 'Pomona' },
    { slug: 'lancaster', name: 'Lancaster' },
    { slug: 'corona', name: 'Corona' },
    { slug: 'murrieta', name: 'Murrieta' },
    { slug: 'temecula', name: 'Temecula' },
    { slug: 'santa-monica', name: 'Santa Monica' },
    { slug: 'berkeley', name: 'Berkeley' },
    { slug: 'burbank', name: 'Burbank' },
    { slug: 'newport-beach', name: 'Newport Beach' },
    { slug: 'ventura', name: 'Ventura' },
    { slug: 'west-hollywood', name: 'West Hollywood' },
    { slug: 'laguna-beach', name: 'Laguna Beach' },
    { slug: 'palo-alto', name: 'Palo Alto' },
    { slug: 'mountain-view', name: 'Mountain View' },
    { slug: 'cupertino', name: 'Cupertino' },
    { slug: 'redondo-beach', name: 'Redondo Beach' },
    { slug: 'manhattan-beach', name: 'Manhattan Beach' },
    { slug: 'hermosa-beach', name: 'Hermosa Beach' },
    { slug: 'beverly-hills', name: 'Beverly Hills' },
    { slug: 'malibu', name: 'Malibu' },
    { slug: 'calabasas', name: 'Calabasas' },
    { slug: 'culver-city', name: 'Culver City' },
    { slug: 'el-monte', name: 'El Monte' },
    { slug: 'norwalk', name: 'Norwalk' },
    { slug: 'hawthorne', name: 'Hawthorne' },
    { slug: 'compton', name: 'Compton' },
    { slug: 'san-marcos', name: 'San Marcos' },
    { slug: 'encinitas', name: 'Encinitas' },
    { slug: 'del-mar', name: 'Del Mar' },
    { slug: 'solana-beach', name: 'Solana Beach' },
    { slug: 'la-mesa', name: 'La Mesa' },
    { slug: 'el-cajon', name: 'El Cajon' },
    { slug: 'national-city', name: 'National City' },
    { slug: 'imperial-beach', name: 'Imperial Beach' },
    { slug: 'coronado', name: 'Coronado' },
    { slug: 'poway', name: 'Poway' },
    { slug: 'santee', name: 'Santee' },
    { slug: 'lemon-grove', name: 'Lemon Grove' },
    { slug: 'vista', name: 'Vista' },
    { slug: 'chino', name: 'Chino' },
    { slug: 'chino-hills', name: 'Chino Hills' },
    { slug: 'redlands', name: 'Redlands' },
    { slug: 'rialto', name: 'Rialto' },
    { slug: 'colton', name: 'Colton' },
    { slug: 'highland', name: 'Highland' },
    { slug: 'hesperia', name: 'Hesperia' },
    { slug: 'victorville', name: 'Victorville' },
    { slug: 'apple-valley', name: 'Apple Valley' },
    { slug: 'perris', name: 'Perris' },
    { slug: 'hemet', name: 'Hemet' },
    { slug: 'indio', name: 'Indio' },
    { slug: 'coachella', name: 'Coachella' },
    { slug: 'palm-springs', name: 'Palm Springs' },
    { slug: 'cathedral-city', name: 'Cathedral City' },
    { slug: 'la-quinta', name: 'La Quinta' },
    { slug: 'san-clemente', name: 'San Clemente' },
    { slug: 'san-fernando', name: 'San Fernando' },
    { slug: 'tustin', name: 'Tustin' },
    { slug: 'mission-viejo', name: 'Mission Viejo' },
    { slug: 'laguna-hills', name: 'Laguna Hills' },
    { slug: 'laguna-niguel', name: 'Laguna Niguel' },
    { slug: 'lake-forest', name: 'Lake Forest' },
    { slug: 'aliso-viejo', name: 'Aliso Viejo' },
    { slug: 'dana-point', name: 'Dana Point' },
    { slug: 'fountain-valley', name: 'Fountain Valley' },
    { slug: 'cypress', name: 'Cypress' },
    { slug: 'buena-park', name: 'Buena Park' },
    { slug: 'la-habra', name: 'La Habra' },
    { slug: 'yorba-linda', name: 'Yorba Linda' },
    { slug: 'placentia', name: 'Placentia' },
    { slug: 'cerritos', name: 'Cerritos' },
    { slug: 'la-mirada', name: 'La Mirada' },
    { slug: 'whittier', name: 'Whittier' },
    { slug: 'roseville', name: 'Roseville' },
    { slug: 'folsom', name: 'Folsom' },
    { slug: 'citrus-heights', name: 'Citrus Heights' },
    { slug: 'rancho-cordova', name: 'Rancho Cordova' },
    { slug: 'carmichael', name: 'Carmichael' },
    { slug: 'fair-oaks', name: 'Fair Oaks' },
    { slug: 'natomas', name: 'Natomas' },
    { slug: 'land-park', name: 'Land Park' },
    { slug: 'east-sacramento', name: 'East Sacramento' },
    { slug: 'midtown', name: 'Midtown Sacramento' },
    { slug: 'davis', name: 'Davis' },
    { slug: 'woodland', name: 'Woodland' },
    { slug: 'west-sacramento', name: 'West Sacramento' },
    { slug: 'downtown-sacramento', name: 'Downtown Sacramento' },
    { slug: 'milpitas', name: 'Milpitas' },
    { slug: 'campbell', name: 'Campbell' },
    { slug: 'los-gatos', name: 'Los Gatos' },
    { slug: 'morgan-hill', name: 'Morgan Hill' },
    { slug: 'gilroy', name: 'Gilroy' },
    { slug: 'dublin', name: 'Dublin' },
    { slug: 'pleasanton', name: 'Pleasanton' },
    { slug: 'livermore', name: 'Livermore' },
    { slug: 'union-city', name: 'Union City' },
    { slug: 'newark', name: 'Newark' },
    { slug: 'san-leandro', name: 'San Leandro' },
    { slug: 'alameda', name: 'Alameda' },
    { slug: 'emeryville', name: 'Emeryville' },
    { slug: 'castro-valley', name: 'Castro Valley' },
    { slug: 'san-lorenzo', name: 'San Lorenzo' },
    { slug: 'oxnard', name: 'Oxnard' },
    { slug: 'simi-valley', name: 'Simi Valley' },
    { slug: 'thousand-oaks', name: 'Thousand Oaks' },
    { slug: 'moorpark', name: 'Moorpark' },
    { slug: 'camarillo', name: 'Camarillo' },
    { slug: 'santa-paula', name: 'Santa Paula' },
    { slug: 'fillmore', name: 'Fillmore' },
    { slug: 'ojai', name: 'Ojai' },
    { slug: 'port-hueneme', name: 'Port Hueneme' },
    { slug: 'clovis', name: 'Clovis' },
    { slug: 'visalia', name: 'Visalia' },
    { slug: 'tulare', name: 'Tulare' },
    { slug: 'hanford', name: 'Hanford' },
    { slug: 'porterville', name: 'Porterville' },
    { slug: 'delano', name: 'Delano' },
    { slug: 'lemoore', name: 'Lemoore' },
    { slug: 'madera', name: 'Madera' },
    { slug: 'merced', name: 'Merced' },
    { slug: 'turlock', name: 'Turlock' },
    { slug: 'montclair', name: 'Montclair' },
    { slug: 'upland', name: 'Upland' },
    { slug: 'azusa', name: 'Azusa' },
    { slug: 'arcadia', name: 'Arcadia' },
    { slug: 'alhambra', name: 'Alhambra' },
    { slug: 'south-gate', name: 'South Gate' },
    { slug: 'gardena', name: 'Gardena' },
    { slug: 'bellflower', name: 'Bellflower' },
    { slug: 'carson', name: 'Carson' },
    { slug: 'baldwin-park', name: 'Baldwin Park' },
    { slug: 'huntington-park', name: 'Huntington Park' },
    { slug: 'westminster', name: 'Westminster' },
    { slug: 'van-nuys', name: 'Van Nuys' },
    { slug: 'hollywood', name: 'Hollywood' },
    { slug: 'downtown-los-Angeles', name: 'Downtown Los Angeles' },
    { slug: 'barstow', name: 'Barstow' },
    { slug: 'twentynine-palms', name: 'Twentynine Palms' },
    { slug: 'big-bear-lake', name: 'Big Bear Lake' }
  ];
  
  let successCount = 0;
  let failCount = 0;
  
  cities.forEach((city) => {
    const success = processCityFile(city.slug, city.name);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  });
  
  console.log(`\n📊 Enhancement Summary:`);
  console.log(`✅ Successfully enhanced: ${successCount} city pages`);
  console.log(`❌ Failed/Skipped: ${failCount} city pages`);
  console.log(`📈 Total processed: ${successCount + failCount} cities\n`);
  console.log(`🎯 Hyperlocal SEO optimization complete! Your city pages are now optimized for:`);
  console.log(`   - Google Search`);
  console.log(`   - Bing Search`);
  console.log(`   - Yahoo Search`);
  console.log(`   - AI Search (ChatGPT, Bard, Bing AI)`);
  console.log(`   - Voice Search (Google Assistant, Alexa, Siri)\n`);
}

// Run if called directly
if (require.main === module) {
  enhanceAllCities();
}

module.exports = {
  enhanceAllCities,
  processCityFile,
  getAllKeywordsForCity
};
