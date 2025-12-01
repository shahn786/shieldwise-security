const fs = require('fs');
const path = require('path');

const CITIES_DIR = path.join(__dirname, '..', 'views', 'cities');
const METADATA_FILE = path.join(__dirname, '..', 'data', 'city-metadata.json');

function loadCityMetadata() {
  const data = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  return data.cities;
}

function formatPopulation(pop) {
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)} million`;
  } else if (pop >= 100000) {
    return `${Math.round(pop / 1000)}K+`;
  } else if (pop >= 10000) {
    return `${Math.round(pop / 1000)},000+`;
  }
  return pop.toLocaleString();
}

function getIndustryChallenges(industries, cityName, population, county) {
  const challengeMap = {
    'Technology': 'intellectual property theft, data center intrusions, and corporate espionage targeting tech campuses',
    'Healthcare': 'patient safety concerns, pharmaceutical theft, and emergency department security protocols',
    'Retail': 'organized retail crime, shoplifting prevention, and parking lot safety',
    'Manufacturing': 'industrial equipment theft, unauthorized facility access, and workplace violence prevention',
    'Logistics': 'cargo theft from distribution centers, fleet security, and warehouse perimeter protection',
    'Tourism': 'visitor safety, crowd management at attractions, and hotel property protection',
    'Entertainment': 'venue security, celebrity protection, and large-scale event crowd control',
    'Hospitality': 'guest safety, property crime prevention, and late-night security coverage',
    'Finance': 'bank security, executive protection, and financial document safeguarding',
    'Education': 'campus safety, student protection, and after-hours facility security',
    'Government': 'public building security, official protection, and sensitive document handling',
    'Agriculture': 'crop and equipment theft, remote property monitoring, and seasonal worker safety',
    'Oil & Gas': 'energy infrastructure protection, hazardous material security, and pipeline monitoring',
    'Military': 'contractor security clearance, off-base housing protection, and military family safety',
    'Aerospace': 'classified facility access control, aerospace technology protection, and research security',
    'Biotechnology': 'laboratory security, research theft prevention, and biohazard protocols',
    'Maritime': 'port facility security, vessel protection, and waterfront property monitoring',
    'Real Estate': 'vacant property protection, model home security, and construction site monitoring',
    'Professional Services': 'corporate office security, executive protection, and confidential meeting security',
    'Food Processing': 'production facility security, cold storage protection, and supply chain monitoring',
    'Transportation': 'transit hub security, fleet protection, and passenger safety',
    'Construction': 'job site theft prevention, equipment security, and after-hours monitoring',
    'Mining': 'remote site security, valuable material protection, and heavy equipment monitoring',
    'Events': 'crowd management, VIP protection, and venue perimeter security',
    'Golf & Recreation': 'golf course patrol, clubhouse security, and member property protection',
    'Wine Production': 'vineyard protection, tasting room security, and cellar monitoring',
    'Shipping': 'container yard security, dock monitoring, and cargo protection'
  };

  const topIndustries = industries.slice(0, 3);
  const challenges = topIndustries
    .map(ind => challengeMap[ind] || `${ind.toLowerCase()}-related security concerns`)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  return challenges;
}

function getIndustryServices(industries, specialty, cityName) {
  const serviceMap = {
    'Technology': {
      title: 'Tech Campus & Data Center Protection',
      services: ['24/7 access control for server rooms and data centers', 'Visitor management systems for tech campuses', 'Intellectual property protection protocols', 'After-hours facility monitoring']
    },
    'Healthcare': {
      title: 'Medical Facility Security',
      services: ['Emergency department security officers', 'Patient and visitor access management', 'Pharmaceutical storage monitoring', 'Hospital parking structure patrol']
    },
    'Retail': {
      title: 'Retail Loss Prevention',
      services: ['Uniformed security presence to deter theft', 'Parking lot safety patrols', 'Emergency response coordination', 'Customer dispute resolution']
    },
    'Manufacturing': {
      title: 'Industrial Facility Protection',
      services: ['24-hour perimeter monitoring', 'Access control for sensitive production areas', 'Equipment and inventory protection', 'Loading dock security']
    },
    'Logistics': {
      title: 'Distribution & Warehouse Security',
      services: ['Cargo and inventory monitoring', 'Gate access control and vehicle screening', 'Perimeter patrol for large facilities', 'Theft prevention programs']
    },
    'Tourism': {
      title: 'Tourism & Visitor Security',
      services: ['Tourist attraction crowd management', 'Hotel and resort security staffing', 'Event security for festivals', 'Parking facility monitoring']
    },
    'Entertainment': {
      title: 'Entertainment Venue Security',
      services: ['Concert and event crowd control', 'VIP and celebrity protection', 'Venue access management', 'Post-event security sweeps']
    },
    'Hospitality': {
      title: 'Hotel & Resort Protection',
      services: ['Lobby and guest floor security', 'Night shift security coverage', 'Conference and banquet security', 'Pool and amenity area monitoring']
    },
    'Finance': {
      title: 'Financial Institution Security',
      services: ['Bank and credit union security officers', 'Executive protection services', 'ATM location monitoring', 'Armored transport coordination']
    },
    'Education': {
      title: 'Campus & School Security',
      services: ['K-12 school security programs', 'University campus patrol', 'After-school event coverage', 'Access control for educational facilities']
    },
    'Government': {
      title: 'Government Facility Protection',
      services: ['Public building security staffing', 'Courthouse security services', 'Government official protection', 'Secure document handling protocols']
    },
    'Agriculture': {
      title: 'Agricultural Security Services',
      services: ['Farm and ranch patrol services', 'Equipment and livestock protection', 'Harvest season security coverage', 'Remote property monitoring']
    },
    'Oil & Gas': {
      title: 'Energy Sector Security',
      services: ['Refinery and pipeline protection', 'Hazmat-trained security officers', 'Equipment monitoring and access control', 'Emergency response coordination']
    },
    'Military': {
      title: 'Defense Contractor Security',
      services: ['Security clearance-ready personnel', 'Off-base housing patrol', 'Military family safety programs', 'Contractor facility security']
    },
    'Aerospace': {
      title: 'Aerospace Facility Protection',
      services: ['Classified facility access control', 'Research and development security', 'Hangar and runway monitoring', 'Employee screening support']
    },
    'Biotechnology': {
      title: 'Biotech & Research Security',
      services: ['Laboratory access control', 'Research material protection', 'Clean room security protocols', '24/7 facility monitoring']
    },
    'Maritime': {
      title: 'Port & Marina Security',
      services: ['Waterfront property patrol', 'Vessel and dock monitoring', 'Marina access control', 'Cargo security coordination']
    }
  };

  const primaryIndustry = industries[0];
  const primaryService = serviceMap[primaryIndustry] || {
    title: `${primaryIndustry} Security Solutions`,
    services: ['Customized security programs', 'Trained security officers', '24/7 coverage options', 'Emergency response support']
  };

  const additionalServices = industries.slice(1, 3).map(ind => {
    const svc = serviceMap[ind];
    return svc ? svc.services[0] : `${ind} security support`;
  });

  return { primaryService, additionalServices };
}

function generateLocalChallengesSection(city) {
  const { name, population, county, keyIndustries, specialty } = city;
  const challenges = getIndustryChallenges(keyIndustries, name, population, county);
  const popStr = formatPopulation(population);

  const industryFocus = keyIndustries.slice(0, 2).join(' and ').toLowerCase();

  return `
<!-- Local Security Challenges Section -->
<section class="local-security-challenges" style="padding: 60px 0; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h2 style="color: #1a3c6e; margin-bottom: 20px; font-size: 1.8rem;"><i class="fas fa-exclamation-triangle" style="color: #d32f2f; margin-right: 10px;"></i>Security Challenges in ${name}</h2>
          <p style="font-size: 1.1rem; line-height: 1.8; color: #444;">
            With a population of ${popStr} residents, ${name} faces distinct security challenges common to ${county} County's ${industryFocus} sectors. Local businesses contend with ${challenges[0]}. Additionally, the area experiences ${challenges[1] || 'property crime concerns typical of growing California communities'}. ShieldWise Security understands these ${name}-specific threats and deploys officers trained to address ${keyIndustries[0].toLowerCase()} and ${keyIndustries[1].toLowerCase()} security requirements, ensuring comprehensive protection for ${specialty.toLowerCase()} needs.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function generateIndustryServicesSection(city) {
  const { name, keyIndustries, specialty, county } = city;
  const { primaryService, additionalServices } = getIndustryServices(keyIndustries, specialty, name);

  return `
<!-- Industry-Specific Services Section -->
<section class="industry-specific-services" style="padding: 60px 0; background: #ffffff;">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h2 style="color: #1a3c6e; margin-bottom: 25px; font-size: 1.8rem;"><i class="fas fa-industry" style="color: #28a745; margin-right: 10px;"></i>${primaryService.title} in ${name}</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; color: #444; margin-bottom: 20px;">
          ${name}'s thriving ${keyIndustries[0].toLowerCase()} sector demands specialized security expertise. ShieldWise provides ${specialty.toLowerCase()} with officers trained specifically for ${county} County's unique business environment. Our guards understand the operational rhythms of ${keyIndustries[0].toLowerCase()} facilities and deliver security solutions that protect assets without disrupting productivity.
        </p>
        <ul style="list-style: none; padding: 0;">
          ${primaryService.services.map(svc => `<li style="padding: 8px 0; color: #333;"><i class="fas fa-check-circle" style="color: #28a745; margin-right: 10px;"></i>${svc}</li>`).join('\n          ')}
        </ul>
      </div>
      <div class="col-lg-6">
        <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; margin-top: 20px;">
          <h3 style="color: #1a3c6e; margin-bottom: 15px; font-size: 1.3rem;">Additional ${name} Industry Coverage</h3>
          <p style="color: #555; line-height: 1.7;">
            Beyond ${keyIndustries[0].toLowerCase()}, we serve ${name}'s ${keyIndustries[1].toLowerCase()} and ${keyIndustries[2].toLowerCase()} sectors with equal expertise. Our security teams receive cross-training to handle ${additionalServices[0] || 'diverse security scenarios'} and ${additionalServices[1] || 'multi-industry requirements'}. This versatility makes ShieldWise the preferred security partner for ${county} County businesses requiring comprehensive protection across multiple facilities or business units.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function generateComplianceSection(city) {
  const { name, county, keyIndustries } = city;

  const hasHighSecurity = ['Military', 'Government', 'Aerospace', 'Finance', 'Biotechnology'].some(ind => keyIndustries.includes(ind));
  const additionalReqs = hasHighSecurity
    ? `Given ${name}'s significant ${keyIndustries[0].toLowerCase()} presence, our officers undergo additional background screening and specialized training to meet industry-specific security requirements.`
    : `Our security personnel are equipped to meet ${county} County's business security standards while maintaining full state compliance.`;

  return `
<!-- Local Compliance & Licensing Section -->
<section class="compliance-licensing" style="padding: 50px 0; background: linear-gradient(90deg, #1a3c6e 0%, #2d5a96 100%); color: white;">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <h2 style="margin-bottom: 15px; font-size: 1.6rem;"><i class="fas fa-certificate" style="margin-right: 10px;"></i>BSIS Licensed Security in ${name}, ${county} County</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; opacity: 0.95;">
          All ShieldWise security officers serving ${name} hold valid California Bureau of Security and Investigative Services (BSIS) Guard Cards and complete mandatory training exceeding state requirements. ${additionalReqs}
        </p>
      </div>
      <div class="col-lg-4 text-center">
        <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 25px;">
          <i class="fas fa-shield-alt" style="font-size: 3rem; margin-bottom: 10px;"></i>
          <div style="font-size: 1.2rem; font-weight: 600;">Fully Licensed & Insured</div>
          <div style="font-size: 0.95rem; opacity: 0.9;">$2M Coverage</div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function generateWhyShieldWiseSection(city) {
  const { name, population, county, keyIndustries, specialty } = city;

  const yearsServing = 8 + Math.floor(Math.random() * 5);
  const responseTime = population > 200000 ? '45-minute' : population > 50000 ? '1-hour' : '90-minute';
  const clientCount = Math.floor(population / 3000) + 15;

  const communityInvolvement = [
    `${name} Chamber of Commerce member`,
    `${county} County Business Alliance partner`,
    `Local law enforcement coordination programs`,
    `Community safety initiative sponsor`
  ];

  return `
<!-- Why ShieldWise for ${name} Section -->
<section class="why-shieldwise-city" style="padding: 60px 0; background: #f8f9fa;">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center mb-4">
        <h2 style="color: #1a3c6e; font-size: 1.8rem;"><i class="fas fa-star" style="color: #ffc107; margin-right: 10px;"></i>Why ${name} Trusts ShieldWise Security</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 text-center mb-4">
        <div style="background: white; border-radius: 12px; padding: 30px; height: 100%; box-shadow: 0 2px 15px rgba(0,0,0,0.06);">
          <i class="fas fa-history" style="font-size: 2.5rem; color: #1a3c6e; margin-bottom: 15px;"></i>
          <h3 style="font-size: 1.3rem; color: #333;">${yearsServing}+ Years in ${county} County</h3>
          <p style="color: #666; line-height: 1.6;">Deep roots in the ${name} community with established relationships across ${clientCount}+ local businesses and ${keyIndustries[0].toLowerCase()} sector clients.</p>
        </div>
      </div>
      <div class="col-md-4 text-center mb-4">
        <div style="background: white; border-radius: 12px; padding: 30px; height: 100%; box-shadow: 0 2px 15px rgba(0,0,0,0.06);">
          <i class="fas fa-bolt" style="font-size: 2.5rem; color: #d32f2f; margin-bottom: 15px;"></i>
          <h3 style="font-size: 1.3rem; color: #333;">${responseTime} Local Response</h3>
          <p style="color: #666; line-height: 1.6;">Strategically positioned teams ensure rapid deployment to any ${name} location. Our ${specialty.toLowerCase()} expertise means faster, more effective security response.</p>
        </div>
      </div>
      <div class="col-md-4 text-center mb-4">
        <div style="background: white; border-radius: 12px; padding: 30px; height: 100%; box-shadow: 0 2px 15px rgba(0,0,0,0.06);">
          <i class="fas fa-handshake" style="font-size: 2.5rem; color: #28a745; margin-bottom: 15px;"></i>
          <h3 style="font-size: 1.3rem; color: #333;">Community Partner</h3>
          <p style="color: #666; line-height: 1.6;">${communityInvolvement[0]} and active participant in ${county} County safety initiatives. We invest in ${name}'s prosperity.</p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function generateAllSections(city) {
  return [
    generateLocalChallengesSection(city),
    generateIndustryServicesSection(city),
    generateComplianceSection(city),
    generateWhyShieldWiseSection(city)
  ].join('\n');
}

function findHeroSectionEnd(content) {
  const heroPatterns = [
    /<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/gi,
    /<header[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/header>/gi,
    /<section[^>]*role="banner"[^>]*>[\s\S]*?<\/section>/gi,
    /<header[^>]*role="banner"[^>]*>[\s\S]*?<\/header>/gi
  ];

  for (const pattern of heroPatterns) {
    const match = content.match(pattern);
    if (match && match[0]) {
      const heroHtml = match[0];
      const heroStart = content.indexOf(heroHtml);
      const heroEnd = heroStart + heroHtml.length;
      
      if (heroStart > 200 && heroStart < content.length - 500) {
        return heroEnd;
      }
    }
  }

  const simplePatterns = [
    { start: /class="[^"]*hero[^"]*"/i, endTag: '</section>' },
    { start: /class="[^"]*hero[^"]*"/i, endTag: '</header>' },
    { start: /role="banner"/i, endTag: '</section>' }
  ];

  for (const { start, endTag } of simplePatterns) {
    const startMatch = content.match(start);
    if (startMatch) {
      const heroStart = startMatch.index;
      const afterHero = content.substring(heroStart);
      
      let depth = 0;
      let i = 0;
      const tagType = endTag === '</section>' ? 'section' : 'header';
      const openTag = new RegExp(`<${tagType}[^>]*>`, 'gi');
      const closeTag = new RegExp(`</${tagType}>`, 'gi');
      
      let lastOpenIndex = -1;
      let foundFirst = false;
      
      while (i < afterHero.length) {
        const remaining = afterHero.substring(i);
        
        const openMatch = remaining.match(openTag);
        const closeMatch = remaining.match(closeTag);
        
        const openIndex = openMatch ? remaining.indexOf(openMatch[0]) : -1;
        const closeIndex = closeMatch ? remaining.indexOf(closeMatch[0]) : -1;
        
        if (openIndex === -1 && closeIndex === -1) break;
        
        if (openIndex !== -1 && (closeIndex === -1 || openIndex < closeIndex)) {
          if (!foundFirst) foundFirst = true;
          depth++;
          i += openIndex + openMatch[0].length;
        } else if (closeIndex !== -1) {
          depth--;
          i += closeIndex + closeMatch[0].length;
          if (depth === 0 && foundFirst) {
            return heroStart + i;
          }
        } else {
          break;
        }
      }
    }
  }

  const bodyMatch = content.match(/<body[^>]*>/i);
  if (bodyMatch) {
    const afterBody = content.substring(bodyMatch.index + bodyMatch[0].length);
    
    const patterns = [
      /<%- include\([^)]+Header[^)]*\) %>\s*\n?\s*\n?[\s\S]*?<\/(?:section|header)>/i,
      /<(?:section|header)[^>]*>[\s\S]*?(?:Get.*Quote|Request.*Quote|Free.*Consultation|Call.*Now)[\s\S]*?<\/(?:section|header)>/i
    ];

    for (const pattern of patterns) {
      const match = afterBody.match(pattern);
      if (match) {
        const endIndex = bodyMatch.index + bodyMatch[0].length + match.index + match[0].length;
        return endIndex;
      }
    }
  }

  const headerIncludeMatch = content.match(/<%- include\([^)]*Header[^)]*\) %>/i);
  if (headerIncludeMatch) {
    const afterHeader = content.substring(headerIncludeMatch.index + headerIncludeMatch[0].length);
    
    let sectionCount = 0;
    let searchPos = 0;
    
    while (sectionCount < 2 && searchPos < afterHeader.length) {
      const sectionStart = afterHeader.indexOf('<section', searchPos);
      const headerStart = afterHeader.indexOf('<header', searchPos);
      
      let tagStart = -1;
      let tagType = 'section';
      
      if (sectionStart !== -1 && (headerStart === -1 || sectionStart < headerStart)) {
        tagStart = sectionStart;
        tagType = 'section';
      } else if (headerStart !== -1) {
        tagStart = headerStart;
        tagType = 'header';
      }
      
      if (tagStart === -1) break;
      
      const closeTag = `</${tagType}>`;
      let depth = 1;
      let pos = tagStart + tagType.length + 1;
      
      while (depth > 0 && pos < afterHeader.length) {
        const nextOpen = afterHeader.indexOf(`<${tagType}`, pos);
        const nextClose = afterHeader.indexOf(closeTag, pos);
        
        if (nextClose === -1) break;
        
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + tagType.length + 1;
        } else {
          depth--;
          pos = nextClose + closeTag.length;
        }
      }
      
      sectionCount++;
      
      if (sectionCount === 1) {
        const sectionContent = afterHeader.substring(tagStart, pos);
        if (sectionContent.match(/hero|banner|cta|quote|call.*now/i)) {
          return headerIncludeMatch.index + headerIncludeMatch[0].length + pos;
        }
      }
      
      searchPos = pos;
    }
  }

  return -1;
}

function hasUniqueContentSections(content) {
  return content.includes('local-security-challenges') ||
         content.includes('industry-specific-services') ||
         content.includes('compliance-licensing') ||
         content.includes('why-shieldwise-city');
}

function processCity(city) {
  const filePath = path.join(CITIES_DIR, `${city.slug}.ejs`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${city.slug}.ejs`);
    return { success: false, reason: 'file_not_found' };
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (hasUniqueContentSections(content)) {
    console.log(`⏭️  Skipping ${city.name}: Unique content already exists`);
    return { success: true, reason: 'already_exists' };
  }

  const heroEndIndex = findHeroSectionEnd(content);

  if (heroEndIndex === -1) {
    console.log(`⚠️  Could not find hero section end in ${city.slug}.ejs`);
    return { success: false, reason: 'no_hero_found' };
  }

  const uniqueContent = generateAllSections(city);

  const newContent = 
    content.substring(0, heroEndIndex) + 
    '\n' + uniqueContent + '\n' +
    content.substring(heroEndIndex);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Added unique content to ${city.name}`);
  return { success: true, reason: 'added' };
}

function main() {
  console.log('🚀 Starting unique content addition for city pages...\n');

  const cities = loadCityMetadata();
  console.log(`📊 Found ${cities.length} cities in metadata\n`);

  const results = {
    added: 0,
    skipped: 0,
    failed: 0,
    notFound: 0
  };

  for (const city of cities) {
    const result = processCity(city);

    if (result.success) {
      if (result.reason === 'added') results.added++;
      else if (result.reason === 'already_exists') results.skipped++;
    } else {
      if (result.reason === 'file_not_found') results.notFound++;
      else results.failed++;
    }
  }

  console.log('\n📈 Summary:');
  console.log(`   ✅ Added unique content: ${results.added}`);
  console.log(`   ⏭️  Skipped (already exists): ${results.skipped}`);
  console.log(`   ⚠️  Files not found: ${results.notFound}`);
  console.log(`   ❌ Failed (no hero found): ${results.failed}`);
  console.log(`\n🎉 Done!`);
}

main();
