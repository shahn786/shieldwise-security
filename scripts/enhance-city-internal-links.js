const fs = require('fs');
const path = require('path');

const CITIES_DIR = 'views/cities';
const METADATA_FILE = 'data/city-metadata.json';

const SERVICES = [
  { slug: 'armed-security', name: 'Armed Security Guards' },
  { slug: 'unarmed-security', name: 'Unarmed Security' },
  { slug: 'patrol', name: 'Mobile Patrol' },
  { slug: 'event-security', name: 'Event Security' },
  { slug: 'construction-security', name: 'Construction Site Security' },
  { slug: 'fire-watch', name: 'Fire Watch' },
  { slug: 'executive-protection', name: 'Executive Protection' }
];

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function generateEnhancedFAQ(cityName, specialty, keyIndustries, county) {
  const industries = keyIndustries.slice(0, 3).join(', ');
  return [
    {
      question: `What security services does ShieldWise offer in ${cityName}?`,
      answer: `ShieldWise Security offers comprehensive security services in ${cityName} including armed and unarmed guards, mobile patrol, event security, fire watch, construction site security, executive protection, and 24/7 emergency response. We specialize in ${specialty.toLowerCase()}.`
    },
    {
      question: `Are ShieldWise security guards licensed and insured in ${cityName}, CA?`,
      answer: `Yes, all ShieldWise security guards serving ${cityName} are BSIS-certified and licensed by the State of California. We carry $2 million in liability insurance and perform comprehensive background checks on all personnel.`
    },
    {
      question: `How quickly can ShieldWise respond to emergencies in ${cityName}?`,
      answer: `Our emergency response team typically arrives within 15 minutes anywhere in ${cityName} and ${county} County. We maintain GPS-tracked patrols and real-time incident monitoring for rapid deployment.`
    },
    {
      question: `What industries does ShieldWise serve in ${cityName}?`,
      answer: `In ${cityName}, we provide security services for ${industries}, and many other sectors. Our guards are trained for ${specialty.toLowerCase()} and understand local business needs.`
    },
    {
      question: `Does ShieldWise provide 24/7 security coverage in ${cityName}?`,
      answer: `Yes, ShieldWise provides around-the-clock security services in ${cityName} including overnight patrols, weekend coverage, holiday security, and emergency response available 24 hours a day, 7 days a week.`
    },
    {
      question: `How much does security guard service cost in ${cityName}?`,
      answer: `Security service costs in ${cityName} vary based on hours, guard type (armed vs unarmed), and specific requirements. Contact ShieldWise for a free, customized quote for your ${cityName} business or property.`
    }
  ];
}

function generateInternalLinksHTML(cityName, nearbyCities, services) {
  const nearbyCitiesHTML = nearbyCities.map(c => 
    `                <li><a href="/${c.slug}" title="Security guards in ${c.name}, CA">${c.name} Security Guards</a></li>`
  ).join('\n');

  const servicesHTML = services.slice(0, 4).map(s =>
    `                <li><a href="/services/${s.slug}" title="${s.name} in ${cityName}">${s.name}</a></li>`
  ).join('\n');

  return `
    <!-- Internal Links Section for SEO -->
    <section class="internal-links-section" style="background: #f8f9fa; padding: 40px 0; margin-top: 30px;">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h3 style="color: #1a3c64; margin-bottom: 20px;">Security Services in Nearby Cities</h3>
                    <ul class="nearby-cities-list" style="list-style: none; padding: 0;">
${nearbyCitiesHTML}
                    </ul>
                </div>
                <div class="col-md-6">
                    <h3 style="color: #1a3c64; margin-bottom: 20px;">Our Security Services in ${cityName}</h3>
                    <ul class="services-list" style="list-style: none; padding: 0;">
${servicesHTML}
                    </ul>
                    <p style="margin-top: 15px;"><a href="/services" class="btn btn-primary">View All Services</a></p>
                </div>
            </div>
        </div>
    </section>
`;
}

function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function main() {
  console.log('🚀 Starting city page optimization...\n');

  const metadataRaw = fs.readFileSync(METADATA_FILE, 'utf8');
  const metadata = JSON.parse(metadataRaw);
  const cities = metadata.cities;

  console.log(`📊 Loaded ${cities.length} cities from metadata\n`);

  const cityFiles = fs.readdirSync(CITIES_DIR)
    .filter(f => f.endsWith('.ejs') && !f.startsWith('_'));

  console.log(`📁 Found ${cityFiles.length} city template files\n`);

  let optimizedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of cityFiles) {
    const slug = file.replace('.ejs', '');
    const cityData = cities.find(c => c.slug === slug);

    if (!cityData) {
      console.log(`⚠️  Skipping ${slug}: No metadata found`);
      skippedCount++;
      continue;
    }

    const filePath = path.join(CITIES_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('<!-- Internal Links Section for SEO -->')) {
      console.log(`⏭️  Skipping ${slug}: Already optimized`);
      skippedCount++;
      continue;
    }

    const nearbyCities = cities
      .filter(c => c.slug !== slug)
      .map(c => ({
        ...c,
        distance: haversineDistance(
          cityData.latitude, cityData.longitude,
          c.latitude, c.longitude
        )
      }))
      .filter(c => c.distance < 50)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    if (nearbyCities.length < 3) {
      const moreNearby = cities
        .filter(c => c.slug !== slug && !nearbyCities.find(n => n.slug === c.slug))
        .map(c => ({
          ...c,
          distance: haversineDistance(
            cityData.latitude, cityData.longitude,
            c.latitude, c.longitude
          )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5 - nearbyCities.length);
      nearbyCities.push(...moreNearby);
    }

    const internalLinksHTML = generateInternalLinksHTML(
      cityData.name,
      nearbyCities,
      SERVICES
    );

    const footerPattern = /(\s*<!-- Footer -->[\s\S]*?<%- include\(['"]\.\.\/partials\/Footer['"]\) %>)/i;
    const altFooterPattern = /(<%- include\(['"]\.\.\/partials\/Footer['"]\) %>)/i;

    if (footerPattern.test(content)) {
      content = content.replace(footerPattern, internalLinksHTML + '\n$1');
    } else if (altFooterPattern.test(content)) {
      content = content.replace(altFooterPattern, internalLinksHTML + '\n$1');
    } else {
      console.log(`❌ Error ${slug}: Could not find footer injection point`);
      errorCount++;
      continue;
    }

    const faqs = generateEnhancedFAQ(
      cityData.name,
      cityData.specialty || 'Professional Security',
      cityData.keyIndustries || ['Commercial', 'Residential', 'Industrial'],
      cityData.county || 'California'
    );

    const faqSchema = generateFAQSchema(faqs);
    const faqSchemaScript = `
    <!-- Enhanced FAQ Schema for AI Search (ChatGPT, Perplexity, Gemini) -->
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 4)}
    </script>`;

    const existingFAQPattern = /<!-- (Enhanced )?FAQ Schema[^>]*-->[\s\S]*?<script type="application\/ld\+json">[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/gi;
    
    if (existingFAQPattern.test(content)) {
      content = content.replace(existingFAQPattern, faqSchemaScript);
    } else {
      content = content.replace('</head>', faqSchemaScript + '\n</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    optimizedCount++;
    console.log(`✅ Optimized ${slug}: +${nearbyCities.length} nearby links, +6 FAQs`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📈 OPTIMIZATION COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ Optimized: ${optimizedCount} pages`);
  console.log(`⏭️  Skipped: ${skippedCount} pages`);
  console.log(`❌ Errors: ${errorCount} pages`);
  console.log('\nChanges made to each optimized page:');
  console.log('  - Added internal links to 5 nearby cities');
  console.log('  - Added links to 4 core services');
  console.log('  - Enhanced FAQ schema with 6 AI-optimized questions');
}

main();
