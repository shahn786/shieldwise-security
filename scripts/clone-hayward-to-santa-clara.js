const fs = require('fs');
const path = require('path');

// Complete Santa Clara County city data
const cities = [
    {
        name: 'Campbell',
        slug: 'campbell',
        specialty: 'Mixed-Use Development & Downtown Security',
        population: '42,000',
        zip: '95008',
        lat: '37.2872',
        lng: '-121.9500',
        phone: '(714) 716-7430',
        description: 'Vibrant downtown area with mixed residential and commercial developments requiring flexible security solutions',
        landmarks: ['Campbell Downtown', 'Pruneyard Shopping Center', 'Los Gatos Creek Trail'],
        landmark1: 'Campbell Downtown',
        landmark2: 'Pruneyard Shopping Center',
        landmark3: 'Los Gatos Creek Trail',
        industries: ['Commercial', 'Residential', 'Retail', 'Entertainment'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Cupertino',
        slug: 'cupertino',
        specialty: 'Apple Campus & Premium Residential Security',
        population: '60,000',
        zip: '95014',
        lat: '37.3230',
        lng: '-122.0322',
        phone: '(714) 716-7430',
        description: 'Global headquarters of Apple Inc. and affluent residential community requiring premium corporate and residential security services',
        landmarks: ['Apple Park', 'Apple Campus', 'Cupertino City Center', 'De Anza College'],
        landmark1: 'Apple Park',
        landmark2: 'De Anza College',
        landmark3: 'Cupertino City Center',
        industries: ['Technology', 'Corporate', 'Residential', 'Educational'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Gilroy',
        slug: 'gilroy',
        specialty: 'Agricultural & Tourism Event Security',
        population: '59,000',
        zip: '95020',
        lat: '37.0058',
        lng: '-121.5683',
        phone: '(714) 716-7430',
        description: 'Known as the "Garlic Capital of the World" with major agricultural operations and tourism events requiring specialized security',
        landmarks: ['Gilroy Gardens', 'Premium Outlets', 'Garlic Festival', 'Christmas Hill Park'],
        landmark1: 'Gilroy Gardens',
        landmark2: 'Gilroy Premium Outlets',
        landmark3: 'Gilroy Garlic Festival',
        industries: ['Agricultural', 'Tourism', 'Retail', 'Events'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Los Gatos',
        slug: 'los-gatos',
        specialty: 'Luxury Residential & High-End Retail Security',
        population: '31,000',
        zip: '95030',
        lat: '37.2358',
        lng: '-121.9623',
        phone: '(714) 716-7430',
        description: 'Affluent community with luxury homes and upscale shopping requiring premium residential and retail security services',
        landmarks: ['Los Gatos Downtown', 'Vasona Lake Park', 'Netflix HQ', 'Los Gatos Creek Trail'],
        landmark1: 'Los Gatos Downtown',
        landmark2: 'Vasona Lake Park',
        landmark3: 'Netflix HQ',
        industries: ['Residential', 'Retail', 'Technology', 'Entertainment'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Milpitas',
        slug: 'milpitas',
        specialty: 'Industrial Manufacturing & Tech Security',
        population: '80,000',
        zip: '95035',
        lat: '37.4323',
        lng: '-121.8996',
        phone: '(714) 716-7430',
        description: 'Major industrial and manufacturing center with tech companies requiring comprehensive industrial security coverage',
        landmarks: ['Great Mall', 'Cisco Systems', 'SanDisk', 'Milpitas Square'],
        landmark1: 'Great Mall',
        landmark2: 'Cisco Systems Campus',
        landmark3: 'Milpitas Square',
        industries: ['Industrial', 'Manufacturing', 'Technology', 'Retail'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Morgan Hill',
        slug: 'morgan-hill',
        specialty: 'Community & Agricultural Security',
        population: '45,000',
        zip: '95037',
        lat: '37.1305',
        lng: '-121.6544',
        phone: '(714) 716-7430',
        description: 'Growing agricultural and residential community requiring specialized rural and suburban security solutions',
        landmarks: ['Downtown Morgan Hill', 'Anderson Lake', 'Coyote Lake', 'Mushroom Mardi Gras'],
        landmark1: 'Downtown Morgan Hill',
        landmark2: 'Anderson Lake County Park',
        landmark3: 'Coyote Lake',
        industries: ['Agricultural', 'Residential', 'Commercial', 'Events'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Mountain View',
        slug: 'mountain-view',
        specialty: 'Google Campus & Innovation District Security',
        population: '82,000',
        zip: '94041',
        lat: '37.3861',
        lng: '-122.0839',
        phone: '(714) 716-7430',
        description: 'Home to Google headquarters and NASA Ames Research Center, requiring high-tech security solutions for innovation districts',
        landmarks: ['Googleplex', 'NASA Ames', 'Computer History Museum', 'Shoreline Amphitheatre'],
        landmark1: 'Googleplex',
        landmark2: 'NASA Ames Research Center',
        landmark3: 'Computer History Museum',
        industries: ['Technology', 'Aerospace', 'Research', 'Entertainment'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Palo Alto',
        slug: 'palo-alto',
        specialty: 'Stanford University & Venture Capital Security',
        population: '67,000',
        zip: '94301',
        lat: '37.4419',
        lng: '-122.1430',
        phone: '(714) 716-7430',
        description: 'Prestigious city adjacent to Stanford University with high-profile residents and venture capital firms requiring elite security services',
        landmarks: ['Stanford University', 'Stanford Shopping Center', 'HP Campus', 'Tesla Headquarters'],
        landmark1: 'Stanford University',
        landmark2: 'Stanford Shopping Center',
        landmark3: 'Tesla Headquarters',
        industries: ['Educational', 'Technology', 'Finance', 'Research'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'San Jose',
        slug: 'san-jose',
        specialty: 'Silicon Valley Capital & Major Metro Security',
        population: '1,030,000',
        zip: '95110',
        lat: '37.3382',
        lng: '-121.8863',
        phone: '(714) 716-7430',
        description: 'Capital of Silicon Valley and largest city in Northern California requiring comprehensive metropolitan security solutions',
        landmarks: ['Santana Row', 'Downtown San Jose', 'SAP Center', 'Mineta Airport', 'San Jose State University'],
        landmark1: 'Santana Row',
        landmark2: 'Downtown San Jose',
        landmark3: 'SAP Center',
        industries: ['Technology', 'Corporate', 'Educational', 'Entertainment', 'Transportation'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Santa Clara',
        slug: 'santa-clara',
        specialty: 'Tech Headquarters & Sports Venue Security',
        population: '127,000',
        zip: '95050',
        lat: '37.3541',
        lng: '-121.9552',
        phone: '(714) 716-7430',
        description: 'Center of Silicon Valley hosting Intel, NVIDIA, and major tech headquarters plus Levi\'s Stadium requiring comprehensive corporate and event security',
        landmarks: ['Levi\'s Stadium', 'Intel Museum', 'California\'s Great America', 'Santa Clara University'],
        landmark1: 'Levi\'s Stadium',
        landmark2: 'Intel Museum',
        landmark3: 'Santa Clara University',
        industries: ['Technology', 'Sports', 'Entertainment', 'Educational'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    },
    {
        name: 'Sunnyvale',
        slug: 'sunnyvale',
        specialty: 'Tech Campus & Corporate Security',
        population: '155,000',
        zip: '94086',
        lat: '37.3688',
        lng: '-122.0363',
        phone: '(714) 716-7430',
        description: 'Major tech hub hosting Google, Apple, LinkedIn, and Yahoo headquarters requiring specialized corporate campus security solutions',
        landmarks: ['Googleplex', 'Yahoo Campus', 'LinkedIn HQ', 'Lockheed Martin'],
        landmark1: 'Googleplex Sunnyvale',
        landmark2: 'LinkedIn Headquarters',
        landmark3: 'Lockheed Martin Space Systems',
        industries: ['Technology', 'Corporate', 'Industrial', 'Residential'],
        heroImage: '/img/san-jose.webp',
        countySlug: 'santa-clara-county',
        county: 'Santa Clara County'
    }
];

// Read Hayward template
const haywardTemplatePath = path.join(__dirname, '..', 'views', 'cities', 'hayward.ejs');
const haywardTemplate = fs.readFileSync(haywardTemplatePath, 'utf8');

// Function to replace city-specific content
function generateCityPage(city, template) {
    let content = template;
    
    // Replace all instances of Hayward data with city-specific data
    content = content.replace(/Hayward/g, city.name);
    content = content.replace(/hayward/g, city.slug);
    content = content.replace(/HAYWARD/g, city.name.toUpperCase());
    
    // Replace county information
    content = content.replace(/Alameda County/g, city.county);
    content = content.replace(/alameda-county/g, city.countySlug);
    content = content.replace(/East Bay Area/g, 'Silicon Valley, Bay Area');
    content = content.replace(/East Bay/g, 'Silicon Valley');
    
    // Replace coordinates
    content = content.replace(/37\.6688/g, city.lat);
    content = content.replace(/-122\.0808/g, city.lng);
    
    // Replace ZIP code
    content = content.replace(/94541/g, city.zip);
    
    // Replace street address (use generic Silicon Valley address)
    content = content.replace(/155 Hayward Boulevard, Suite 200/g, `Silicon Valley Service Center`);
    
    // Replace specialty/focus
    content = content.replace(/Industrial & Manufacturing Security/g, city.specialty);
    content = content.replace(/Industrial & Manufacturing/g, city.specialty);
    content = content.replace(/industrial and manufacturing/gi, city.specialty.toLowerCase());
    content = content.replace(/manufacturing plants/g, city.industries[0].toLowerCase() + ' facilities');
    content = content.replace(/Manufacturing/g, city.industries[0]);
    content = content.replace(/manufacturing/g, city.industries[0].toLowerCase());
    content = content.replace(/Industrial/g, city.industries[0]);
    content = content.replace(/industrial/g, city.industries[0].toLowerCase());
    
    // Replace landmarks
    content = content.replace(/Downtown Hayward/g, city.landmark1);
    content = content.replace(/California State University East Bay/g, city.landmark2);
    content = content.replace(/Hayward Regional Shoreline/g, city.landmark3);
    
    // Replace email
    content = content.replace(/hayward@shieldwisesecurity\.com/g, `contact@shieldwisesecurity.com`);
    
    // Replace image references
    content = content.replace(/\/img\/alamendsa1\.webp/g, city.heroImage);
    
    // Fix any double replacements that might have occurred
    content = content.replace(/Silicon Valley Service Center Boulevard/g, 'Silicon Valley Service Center');
    
    return content;
}

// Generate all city pages
cities.forEach((city, index) => {
    try {
        console.log(`Generating page ${index + 1}/11: ${city.name}...`);
        
        const cityContent = generateCityPage(city, haywardTemplate);
        const outputPath = path.join(__dirname, '..', 'views', 'cities', `${city.slug}.ejs`);
        
        fs.writeFileSync(outputPath, cityContent, 'utf8');
        console.log(`✅ Successfully created ${city.slug}.ejs`);
    } catch (error) {
        console.error(`❌ Error creating ${city.slug}.ejs:`, error.message);
    }
});

console.log('\n✅ All Santa Clara County city pages generated successfully!');
console.log('Pages created:');
cities.forEach(city => {
    console.log(`  - ${city.name} (${city.slug}.ejs)`);
});
