const fs = require('fs');
const path = require('path');

const CITIES_DIR = 'views/cities';
const METADATA_FILE = 'data/city-metadata.json';

function generateEnhancedFAQ(cityName, specialty, keyIndustries, county) {
  const industries = keyIndustries.slice(0, 3).join(', ');
  return [
    {
      "@type": "Question",
      "name": `What security services does ShieldWise offer in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `ShieldWise Security offers comprehensive security services in ${cityName} including armed and unarmed guards, mobile patrol, event security, fire watch, construction site security, executive protection, and 24/7 emergency response. We specialize in ${specialty.toLowerCase()}.`
      }
    },
    {
      "@type": "Question",
      "name": `Are ShieldWise security guards licensed and insured in ${cityName}, CA?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, all ShieldWise security guards serving ${cityName} are BSIS-certified and licensed by the State of California. We carry $2 million in liability insurance and perform comprehensive background checks on all personnel.`
      }
    },
    {
      "@type": "Question",
      "name": `How quickly can ShieldWise respond to emergencies in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Our emergency response team typically arrives within 15 minutes anywhere in ${cityName} and ${county} County. We maintain GPS-tracked patrols and real-time incident monitoring for rapid deployment.`
      }
    },
    {
      "@type": "Question",
      "name": `What industries does ShieldWise serve in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `In ${cityName}, we provide security services for ${industries}, and many other sectors. Our guards are trained for ${specialty.toLowerCase()} and understand local business needs.`
      }
    },
    {
      "@type": "Question",
      "name": `Does ShieldWise provide 24/7 security coverage in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ShieldWise provides around-the-clock security services in ${cityName} including overnight patrols, weekend coverage, holiday security, and emergency response available 24 hours a day, 7 days a week.`
      }
    },
    {
      "@type": "Question",
      "name": `How much does security guard service cost in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Security service costs in ${cityName} vary based on hours, guard type (armed vs unarmed), and specific requirements. Contact ShieldWise for a free, customized quote for your ${cityName} business or property.`
      }
    }
  ];
}

function main() {
  console.log('🧹 Cleaning up duplicate FAQ schemas...\n');

  const metadataRaw = fs.readFileSync(METADATA_FILE, 'utf8');
  const metadata = JSON.parse(metadataRaw);
  const cities = metadata.cities;

  const cityFiles = fs.readdirSync(CITIES_DIR)
    .filter(f => f.endsWith('.ejs') && !f.startsWith('_'));

  let cleanedCount = 0;

  for (const file of cityFiles) {
    const slug = file.replace('.ejs', '');
    const cityData = cities.find(c => c.slug === slug);

    if (!cityData) continue;

    const filePath = path.join(CITIES_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const faqCount = (content.match(/"@type":\s*"FAQPage"/gi) || []).length;

    if (faqCount <= 1) {
      continue;
    }

    console.log(`🔧 Fixing ${slug}: Found ${faqCount} FAQPage schemas`);

    const standaloneFAQPattern = /\s*<!-- Enhanced FAQ Schema for AI Search[^>]*-->[\s\S]*?<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\}\s*<\/script>/gi;
    
    content = content.replace(standaloneFAQPattern, '');

    const graphFAQPattern = /("@graph"\s*:\s*\[[\s\S]*?)(\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?"mainEntity":\s*\[[\s\S]*?\]\s*\})/i;
    
    if (graphFAQPattern.test(content)) {
      const enhancedFAQs = generateEnhancedFAQ(
        cityData.name,
        cityData.specialty || 'Professional Security',
        cityData.keyIndustries || ['Commercial', 'Residential', 'Industrial'],
        cityData.county || 'California'
      );

      const newFAQNode = {
        "@type": "FAQPage",
        "@id": `https://shieldwisesecurity.com/${slug}#faq`,
        "mainEntity": enhancedFAQs
      };

      content = content.replace(graphFAQPattern, (match, before, faqNode) => {
        return before + JSON.stringify(newFAQNode, null, 12).replace(/^/gm, '            ').trim();
      });
    }

    fs.writeFileSync(filePath, content, 'utf8');
    cleanedCount++;
  }

  console.log(`\n✅ Cleaned ${cleanedCount} pages with duplicate FAQ schemas`);
}

main();
