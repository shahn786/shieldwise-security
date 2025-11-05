
const fs = require('fs');
const path = require('path');

const citiesData = {
    'hesperia': [
        { title: 'Main Street Corridor', description: 'Commercial security for businesses, restaurants, and retail centers along Main Street with foot patrol and vehicle monitoring services.' },
        { title: 'Hesperia Lake Area', description: 'Recreational facility security for Hesperia Lake Park and surrounding residential communities with event coverage and patrol services.' },
        { title: 'High Desert Medical District', description: 'Healthcare facility security for medical centers, clinics, and professional offices with specialized healthcare security protocols.' },
        { title: 'Civic Center District', description: 'Government facility security for city offices, public buildings, and community centers with access control and monitoring.' },
        { title: 'East Hesperia Residential', description: 'Residential community security for East Hesperia neighborhoods with mobile patrol and alarm response services.' },
        { title: 'West Hesperia Commercial', description: 'Commercial property security for retail centers and shopping complexes in West Hesperia with loss prevention services.' }
    ],
    'highland': [
        { title: 'Highland Grove', description: 'Security services for the master-planned community with parks, schools, and residential neighborhoods with mobile patrol coverage.' },
        { title: 'Base Line Corridor', description: 'Commercial security for retail centers, restaurants, and businesses along the primary commercial thoroughfare.' },
        { title: 'Highland Hills', description: 'Hillside residential security for premium properties with mountain and valley views, featuring rapid response and monitoring services.' },
        { title: 'Victoria Avenue District', description: 'Mixed-use development security for shopping centers, medical facilities, and business parks with comprehensive protection.' },
        { title: 'East Highland Residential', description: 'Suburban neighborhood security for established communities with school zone protection and family-oriented patrol services.' },
        { title: 'Greenspot Road Area', description: 'Security services for commercial and residential properties along Greenspot Road with 24/7 monitoring and response.' }
    ],
    'montclair': [
        { title: 'Montclair Business District', description: 'Historic business district security for Monte Vista Avenue shops, restaurants, and professional offices with foot patrol services.' },
        { title: 'Montclair Plaza Area', description: 'Major shopping center security for Montclair Plaza and surrounding retail complexes with comprehensive loss prevention coverage.' },
        { title: 'Central Avenue Corridor', description: 'Commercial security for businesses, medical offices, and retail centers along Central Avenue with mobile patrol services.' },
        { title: 'Monte Vista Residential', description: 'Residential community security for Monte Vista neighborhoods with mobile patrol and alarm response services.' },
        { title: 'Holt Boulevard District', description: 'Security services for automotive businesses, retail centers, and commercial properties along Holt Boulevard.' },
        { title: 'Mission Boulevard Area', description: 'Mixed-use security for commercial and residential properties along Mission Boulevard with comprehensive coverage.' }
    ],
    'ontario': [
        { title: 'Ontario International Airport Area', description: 'Airport area security for businesses, hotels, and logistics facilities near ONT with specialized aviation security protocols.' },
        { title: 'Ontario Mills District', description: 'Major retail center security for Ontario Mills and surrounding shopping complexes with comprehensive loss prevention services.' },
        { title: 'Inland Empire Logistics', description: 'Distribution center security for major logistics facilities and warehouses in the Inland Empire with 24/7 coverage.' },
        { title: 'Downtown Ontario', description: 'Historic downtown security for businesses, restaurants, and civic facilities with foot patrol and vehicle monitoring.' },
        { title: 'East Ontario Industrial', description: 'Industrial facility security for manufacturing plants and distribution centers in East Ontario with specialized protocols.' },
        { title: 'West Ontario Residential', description: 'Residential community security for West Ontario neighborhoods with mobile patrol and access control services.' }
    ],
    'rancho-cucamonga': [
        { title: 'Victoria Gardens', description: 'Premier shopping and entertainment district security for Victoria Gardens with comprehensive retail and event security services.' },
        { title: 'Terra Vista Town Center', description: 'Mixed-use development security for Terra Vista shopping center and surrounding business district with patrol services.' },
        { title: 'Foothill Boulevard Corridor', description: 'Commercial security for businesses, restaurants, and retail centers along Foothill Boulevard with mobile patrol coverage.' },
        { title: 'North Rancho Residential', description: 'Upscale residential security for North Rancho Cucamonga communities with gated access control and patrol services.' },
        { title: 'Haven Avenue District', description: 'Commercial corridor security for Haven Avenue businesses and retail centers with comprehensive protection services.' },
        { title: 'Day Creek Business Park', description: 'Business park security for office complexes and professional buildings with access control and monitoring.' }
    ],
    'redlands': [
        { title: 'University of Redlands Campus', description: 'Campus security services for University of Redlands with student safety, event security, and 24/7 patrol coverage.' },
        { title: 'Downtown Redlands Historic District', description: 'Historic downtown security for State Street businesses, restaurants, and cultural venues with foot patrol services.' },
        { title: 'Redlands Boulevard Corridor', description: 'Commercial security for businesses and retail centers along Redlands Boulevard with mobile patrol and monitoring.' },
        { title: 'East Redlands Residential', description: 'Residential community security for East Redlands neighborhoods with mobile patrol and alarm response services.' },
        { title: 'Orange Street Historic Area', description: 'Security services for historic Orange Street mansions and residential areas with specialized heritage property protection.' },
        { title: 'South Redlands Industrial', description: 'Industrial facility security for manufacturing and distribution centers in South Redlands with 24/7 coverage.' }
    ],
    'rialto': [
        { title: 'Foothill Boulevard Commercial', description: 'Commercial corridor security for Foothill Boulevard businesses, retail centers, and restaurants with patrol services.' },
        { title: 'Riverside Avenue District', description: 'Mixed-use security for Riverside Avenue commercial and residential properties with comprehensive coverage.' },
        { title: 'Renaissance Marketplace', description: 'Shopping center security for Renaissance Marketplace and surrounding retail complexes with loss prevention services.' },
        { title: 'North Rialto Residential', description: 'Residential community security for North Rialto neighborhoods with mobile patrol and access control services.' },
        { title: 'East Rialto Industrial', description: 'Industrial facility security for warehouses and distribution centers in East Rialto with specialized protocols.' },
        { title: 'South Rialto Community', description: 'Community security for South Rialto residential areas with neighborhood patrol and alarm response services.' }
    ],
    'twentynine-palms': [
        { title: 'Marine Corps Base Area', description: 'Military-adjacent commercial security for businesses supporting the base with specialized protocols and clearance requirements.' },
        { title: 'Downtown Twentynine Palms', description: 'Historic downtown security for shops, galleries, and restaurants serving residents and military families with community-focused services.' },
        { title: 'Joshua Tree Gateway', description: 'Tourism business security for hotels, visitor centers, and outfitters near Joshua Tree National Park entrances.' },
        { title: 'Desert Heights Residential', description: 'Residential community security for military family housing areas with mobile patrol and neighborhood watch coordination.' },
        { title: 'Highway 62 Commercial', description: 'Corridor security for automotive businesses, shopping centers, and service providers along the main thoroughfare.' },
        { title: 'Historic Plaza Area', description: 'Security services for the old town area, civic facilities, and community gathering spaces with event coverage capabilities.' }
    ],
    'upland': [
        { title: 'Downtown Upland', description: 'Historic downtown security for Second Avenue businesses, restaurants, and the Cable Airport district with foot patrol services.' },
        { title: 'Mountain Avenue Corridor', description: 'Commercial security for retail centers, professional offices, and restaurants along the primary north-south thoroughfare.' },
        { title: 'Colonies Crossroads', description: 'Major retail center security for shopping complexes, dining establishments, and entertainment venues with comprehensive coverage.' },
        { title: 'North Upland Foothills', description: 'Premium hillside residential security for luxury homes with mountain views, gated communities, and estate protection services.' },
        { title: 'Cable Airport Zone', description: 'Aviation facility security for the general aviation airport, hangars, and aerospace businesses with airfield access control.' },
        { title: 'San Antonio Heights', description: 'Exclusive hillside community security for San Antonio Heights estates with specialized high-value property protection.' }
    ],
    'victorville': [
        { title: 'Victor Valley Mall Area', description: 'Major retail center security for Victor Valley Mall and surrounding shopping complexes with comprehensive loss prevention services.' },
        { title: 'Interstate 15 Corridor', description: 'Commercial security for businesses and logistics facilities along the I-15 corridor with mobile patrol and monitoring.' },
        { title: 'High Desert Government Center', description: 'Government facility security for county offices, courthouses, and civic buildings with access control and monitoring.' },
        { title: 'East Victorville Industrial', description: 'Industrial facility security for manufacturing plants and distribution centers in East Victorville with 24/7 coverage.' },
        { title: 'West Victorville Residential', description: 'Residential community security for West Victorville neighborhoods with mobile patrol and alarm response services.' },
        { title: 'Bear Valley Road District', description: 'Commercial corridor security for Bear Valley Road businesses and retail centers with comprehensive protection services.' }
    ]
};

Object.keys(citiesData).forEach(citySlug => {
    const filePath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Generate the area items HTML
        const areasHTML = citiesData[citySlug].map(area => `
            <div class="anaheim-area-item">
                <h3>${area.title}</h3>
                <p>${area.description}</p>
            </div>`).join('');
        
        // Replace the empty grid with the populated one
        content = content.replace(
            /<div class="anaheim-areas-grid">\s*<\/div>/,
            `<div class="anaheim-areas-grid">${areasHTML}\n        </div>`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Updated ${citySlug}.ejs`);
    } else {
        console.log(`✗ File not found: ${citySlug}.ejs`);
    }
});

console.log('\n✓ All San Bernardino County city pages updated with Areas We Serve content');
