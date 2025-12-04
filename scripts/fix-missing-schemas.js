const fs = require('fs');
const path = require('path');

const CITIES_DIR = 'views/cities';
const METADATA_FILE = 'data/city-metadata.json';

const citiesToFix = [
  'alameda', 'fresno', 'long-beach', 'moreno-valley', 'placentia',
  'riverside', 'san-diego', 'santa-monica', 'ventura', 'west-hollywood'
];

function generateSchemas(cityData) {
  const schemas = {
    securityService: {
      "@context": "https://schema.org",
      "@type": "SecurityService",
      "name": `ShieldWise Security - ${cityData.name}`,
      "alternateName": `${cityData.name} Security Guards`,
      "description": `Professional security guard services in ${cityData.name}, CA. BSIS licensed, $2M insured, 24/7 coverage.`,
      "url": `https://shieldwisesecurity.com/${cityData.slug}`,
      "telephone": "+1-714-716-7430",
      "priceRange": "$$-$$$",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityData.name,
        "addressRegion": "CA",
        "postalCode": cityData.postalCode,
        "addressCountry": "US"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": 189,
        "reviewCount": 189
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shieldwisesecurity.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://shieldwisesecurity.com/services" },
        { "@type": "ListItem", "position": 3, "name": `${cityData.name} Security`, "item": `https://shieldwisesecurity.com/${cityData.slug}` }
      ]
    }
  };
  
  return schemas;
}

function main() {
  console.log('🔧 Fixing missing schemas for 10 cities...\n');

  const metadataRaw = fs.readFileSync(METADATA_FILE, 'utf8');
  const metadata = JSON.parse(metadataRaw);
  const cities = metadata.cities;

  for (const slug of citiesToFix) {
    const cityData = cities.find(c => c.slug === slug);
    if (!cityData) {
      console.log(`⚠️  Skipping ${slug}: No metadata found`);
      continue;
    }

    const filePath = path.join(CITIES_DIR, `${slug}.ejs`);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${slug}: File not found`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const schemas = generateSchemas(cityData);
    
    const hasSecurityService = /"@type":\s*"SecurityService"/i.test(content);
    const hasBreadcrumb = /"@type":\s*"BreadcrumbList"/i.test(content);
    const hasGeoCoords = /"latitude":\s*[\d.-]+/i.test(content);
    const hasRating = /"ratingValue":\s*[\d.]+[^"]/i.test(content);

    let schemasToAdd = '';

    if (!hasSecurityService || !hasGeoCoords || !hasRating) {
      schemasToAdd += `
    <!-- SecurityService Schema with Rating -->
    <script type="application/ld+json">
    ${JSON.stringify(schemas.securityService, null, 4)}
    </script>`;
    }

    if (!hasBreadcrumb) {
      schemasToAdd += `
    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    ${JSON.stringify(schemas.breadcrumb, null, 4)}
    </script>`;
    }

    if (schemasToAdd) {
      content = content.replace('</head>', schemasToAdd + '\n</head>');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${slug}: Added missing schemas`);
    } else {
      console.log(`⏭️  Skipping ${slug}: All schemas present`);
    }
  }

  console.log('\n✅ Schema fix complete');
}

main();
