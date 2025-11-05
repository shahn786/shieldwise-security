const fs = require('fs');
const path = require('path');

// City-specific neighborhoods and areas data
const cityAreasData = {
    'victorville': {
        name: 'Victorville',
        areas: [
            {
                title: 'Old Town Victorville',
                description: 'Historic Route 66 district security for commercial properties, museums, and the Veteran\'s Memorial area with specialized heritage site protection.'
            },
            {
                title: 'Sunset Ridge Area',
                description: 'Professional residential security for newer tract homes and family neighborhoods with mobile patrol and community watch services.'
            },
            {
                title: 'Mesa Linda Community',
                description: 'Comprehensive security for suburban neighborhoods with Eagle Ranch Park coverage and shopping center protection services.'
            },
            {
                title: 'Southern California Logistics Airport Zone',
                description: 'Industrial and warehouse security for the logistics hub including Amazon fulfillment centers, Boeing facilities, and distribution operations.'
            },
            {
                title: 'West Bear Valley Commercial',
                description: 'Retail and mixed-use development security for the commercial corridor with loss prevention and customer safety services.'
            },
            {
                title: 'La Mesa Neighborhood',
                description: 'Security services for established residential areas with traditional ranch-style homes, HOA coordination, and neighborhood patrol.'
            }
        ]
    },
    'hesperia': {
        name: 'Hesperia',
        areas: [
            {
                title: 'Main Street Corridor',
                description: 'Commercial security for shopping centers, restaurants, and retail businesses along the primary business thoroughfare with foot and vehicle patrol.'
            },
            {
                title: 'Desert Willow Ranch',
                description: 'Specialized security for newer residential communities with Spanish revival architecture, featuring gated entry and perimeter monitoring.'
            },
            {
                title: 'Downtown Hesperia',
                description: 'Comprehensive security for the civic plaza area, business district, and municipal facilities with professional guard services.'
            },
            {
                title: 'North Hesperia Residential',
                description: 'Premium security services for high-value properties in the most desired residential areas with mountain views and equestrian facilities.'
            },
            {
                title: 'High Desert Gateway Shopping',
                description: 'Retail security for Target, Ross, Marshalls, and Ulta shopping centers with loss prevention and customer safety protocols.'
            },
            {
                title: 'Oak Hills Area',
                description: 'Security coverage for residential communities and school zones with mobile patrol and rapid response capabilities.'
            }
        ]
    },
    'barstow': {
        name: 'Barstow',
        areas: [
            {
                title: 'Historic Route 66 Main Street',
                description: 'Security services for downtown businesses, Casa Del Desierto, Route 66 museums, and tourism facilities along the historic corridor.'
            },
            {
                title: 'Barstow International Gateway',
                description: 'Industrial security for BNSF Railway facilities, logistics operations, and transportation hubs with 24/7 surveillance and patrol.'
            },
            {
                title: 'Southwest Residential District',
                description: 'Premium residential security for Barstow\'s most desired neighborhoods with mobile patrol and property monitoring services.'
            },
            {
                title: 'Outlets at Barstow',
                description: 'Specialized retail security for the major shopping destination with loss prevention, customer safety, and parking lot surveillance.'
            },
            {
                title: 'Industrial Park Zone',
                description: 'Comprehensive security for the 1,200-acre industrial park with manufacturing, warehousing, and distribution facility protection.'
            },
            {
                title: 'Marine Corps Logistics Base Area',
                description: 'Military-adjacent commercial security services for businesses supporting the logistics base with enhanced protocols and clearances.'
            }
        ]
    },
    'big-bear-lake': {
        name: 'Big Bear Lake',
        areas: [
            {
                title: 'Big Bear Village',
                description: 'Security services for the downtown tourism district including shops, restaurants, and entertainment venues with seasonal event coverage.'
            },
            {
                title: 'Lakefront Properties',
                description: 'Specialized waterfront residential security for luxury homes and vacation rentals with property monitoring and concierge protection.'
            },
            {
                title: 'Ski Resort Areas',
                description: 'Seasonal security for Bear Mountain and Snow Summit ski resorts including parking, facilities, and visitor safety management.'
            },
            {
                title: 'North Shore Residential',
                description: 'Mountain community security for established neighborhoods with vacation rental protection and seasonal property monitoring.'
            },
            {
                title: 'South Shore Tourism District',
                description: 'Commercial security for hotels, lodges, and hospitality businesses with guest safety and property protection services.'
            },
            {
                title: 'Big Bear Discovery Center Zone',
                description: 'Security coverage for recreational facilities, marinas, and outdoor adventure businesses with emergency response capabilities.'
            }
        ]
    },
    'chino': {
        name: 'Chino',
        areas: [
            {
                title: 'Downtown Chino',
                description: 'Historic downtown security for shops, restaurants, and the Chino Preserve including foot patrol and business protection services.'
            },
            {
                title: 'Chino Airport Industrial Area',
                description: 'Specialized security for aviation facilities, aerospace businesses, and industrial operations with airfield access control.'
            },
            {
                title: 'Agricultural District',
                description: 'Farm and ranch security for Chino\'s agricultural operations including dairy facilities, equestrian properties, and crop protection.'
            },
            {
                title: 'Chino Hills Gateway',
                description: 'Commercial corridor security for retail centers, restaurants, and business parks along major thoroughfares.'
            },
            {
                title: 'Preserve Residential Areas',
                description: 'Residential community security for neighborhoods near The Preserve shopping area with HOA coordination and mobile patrol.'
            },
            {
                title: 'Boys Republic Area',
                description: 'Security services for the educational campus vicinity and surrounding residential communities with specialized youth facility protocols.'
            }
        ]
    },
    'chino-hills': {
        name: 'Chino Hills',
        areas: [
            {
                title: 'The Shoppes at Chino Hills',
                description: 'Retail security for the premier shopping district including major retailers, restaurants, and entertainment venues with comprehensive coverage.'
            },
            {
                title: 'Gated Community Estates',
                description: 'Specialized security for upscale gated communities with equestrian facilities, golf course access, and 24/7 guard services.'
            },
            {
                title: 'Chino Hills State Park Zone',
                description: 'Security for businesses and residential areas adjacent to the state park with hiking trail access monitoring and property protection.'
            },
            {
                title: 'Carbon Canyon Area',
                description: 'Hillside residential security for premium properties with canyon views, featuring mobile patrol and rapid response services.'
            },
            {
                title: 'Fairfield Ranch Community',
                description: 'Master-planned community security with gated entry, park monitoring, and neighborhood watch coordination services.'
            },
            {
                title: 'Butterfield Ranch Area',
                description: 'Comprehensive security for established residential neighborhoods with shopping center proximity and school zone protection.'
            }
        ]
    },
    'colton': {
        name: 'Colton',
        areas: [
            {
                title: 'Downtown Colton',
                description: 'Historic downtown security for municipal facilities, businesses, and the civic center with professional guard and patrol services.'
            },
            {
                title: 'Rail Yard District',
                description: 'Industrial transportation security for BNSF and Union Pacific rail facilities with 24/7 monitoring and freight protection.'
            },
            {
                title: 'Industrial Corridor',
                description: 'Comprehensive security for warehouses, distribution centers, and manufacturing facilities along the I-10 and I-215 interchange.'
            },
            {
                title: 'Colton Crossings',
                description: 'Retail and commercial security for shopping centers and business parks with loss prevention and customer safety services.'
            },
            {
                title: 'South Colton Residential',
                description: 'Residential community security for established neighborhoods with mobile patrol, property monitoring, and HOA coordination.'
            },
            {
                title: 'Rancho Verde Area',
                description: 'Security services for residential developments with park access, school zones, and community facility protection.'
            }
        ]
    },
    'fontana': {
        name: 'Fontana',
        areas: [
            {
                title: 'Sierra Lakes Golf Community',
                description: 'Premium security for the golf course community with Spanish-inspired estates, gated entry, and 24/7 patrol services.'
            },
            {
                title: 'Hunter\'s Ridge',
                description: 'Upscale residential security for Mediterranean-style homes with mountain views, featuring advanced alarm integration and concierge protection.'
            },
            {
                title: 'Southwest Industrial Park (SWIP)',
                description: 'Comprehensive industrial security for 3,427 acres of warehouses, logistics facilities, and manufacturing plants with specialized protocols.'
            },
            {
                title: 'Downtown Fontana',
                description: 'Historic core security for mixed-use developments, retail businesses, and the emerging Forge District entertainment zone.'
            },
            {
                title: 'Northgate Community',
                description: 'Security services for the planned residential community with park monitoring, Metrolink station coverage, and neighborhood patrol.'
            },
            {
                title: 'Citrus Heights Area',
                description: 'Residential security near Fontana Park and Falcon Ridge Town Center with shopping district and community facility protection.'
            }
        ]
    },
    'highland': {
        name: 'Highland',
        areas: [
            {
                title: 'Highland Grove',
                description: 'Security services for the master-planned community with parks, schools, and residential neighborhoods with mobile patrol coverage.'
            },
            {
                title: 'Base Line Corridor',
                description: 'Commercial security for retail centers, restaurants, and businesses along the primary commercial thoroughfare.'
            },
            {
                title: 'Highland Hills',
                description: 'Hillside residential security for premium properties with mountain and valley views, featuring rapid response and monitoring services.'
            },
            {
                title: 'Victoria Avenue District',
                description: 'Mixed-use development security for shopping centers, medical facilities, and business parks with comprehensive protection.'
            },
            {
                title: 'East Highland Residential',
                description: 'Suburban neighborhood security for established communities with school zone protection and family-oriented patrol services.'
            },
            {
                title: 'Greenspot Road Area',
                description: 'Security coverage for commercial and residential developments along the growing corridor with construction site protection.'
            }
        ]
    },
    'montclair': {
        name: 'Montclair',
        areas: [
            {
                title: 'Montclair Place',
                description: 'Major shopping center security for the regional mall and surrounding retail district with comprehensive loss prevention services.'
            },
            {
                title: 'Central Avenue Corridor',
                description: 'Commercial security for businesses, restaurants, and professional offices along the primary business thoroughfare.'
            },
            {
                title: 'Montclair Transcenter',
                description: 'Transit-oriented development security for Metrolink station area, parking facilities, and mixed-use properties.'
            },
            {
                title: 'North Montclair Residential',
                description: 'Residential community security for established neighborhoods with park monitoring and mobile patrol services.'
            },
            {
                title: 'Monte Vista Avenue District',
                description: 'Security services for shopping centers, automotive businesses, and commercial properties with 24/7 coverage.'
            },
            {
                title: 'Mission Boulevard Area',
                description: 'Mixed-use security for residential communities, schools, and neighborhood shopping centers with family safety focus.'
            }
        ]
    },
    'ontario': {
        name: 'Ontario',
        areas: [
            {
                title: 'Ontario Mills District',
                description: 'Comprehensive security for California\'s largest outlet mall with 24 million annual visitors, featuring advanced surveillance and crowd management.'
            },
            {
                title: 'Ontario Ranch',
                description: 'Master-planned community security for 8,000+ acres of new development with gated neighborhoods, parks, and residential patrol services.'
            },
            {
                title: 'Airport Industrial Zone',
                description: 'Specialized security for warehouses, logistics facilities, and businesses near Ontario International Airport with cargo and facility protection.'
            },
            {
                title: 'Historic Downtown Ontario',
                description: 'Security for Euclid Avenue historic district, museums, and Victorian-era neighborhoods with heritage property protection.'
            },
            {
                title: 'Piemonte at Fourth Street',
                description: 'Urban lifestyle district security for Class A office space, Toyota Arena, hotels, and retail with event management capabilities.'
            },
            {
                title: 'Distribution Center Corridor',
                description: 'Industrial security for AutoZone, Cardinal Health, and Nordstrom distribution facilities with 24/7 monitoring and access control.'
            }
        ]
    },
    'rancho-cucamonga': {
        name: 'Rancho Cucamonga',
        areas: [
            {
                title: 'Victoria Gardens',
                description: 'Premier lifestyle center security for the outdoor mall, theaters, Bass Pro Shops, and downtown district with comprehensive event coverage.'
            },
            {
                title: 'Terra Vista',
                description: 'Upscale residential security for Mediterranean-style communities with town center protection and 24/7 patrol services.'
            },
            {
                title: 'Deer Creek Estates',
                description: 'Luxury equestrian community security for hillside homes with horse facilities, mountain views, and premium property protection.'
            },
            {
                title: 'Rancho Etiwanda',
                description: 'Master-planned community security for newer developments with parks, trails, and family-oriented neighborhood patrol.'
            },
            {
                title: 'Historic Route 66 District',
                description: 'Commercial corridor security for Foothill Boulevard businesses, big-box retail, and dining establishments.'
            },
            {
                title: 'HART Transit District',
                description: 'Transit-oriented development security for future high-speed rail hub, mixed-use properties, and Metrolink facilities.'
            }
        ]
    },
    'redlands': {
        name: 'Redlands',
        areas: [
            {
                title: 'Historic Downtown Redlands',
                description: 'Security for the Victorian-era downtown district with State Street shops, restaurants, and preserved architectural landmarks.'
            },
            {
                title: 'University of Redlands Campus',
                description: 'Educational facility security for campus buildings, dormitories, and special events with student safety protocols.'
            },
            {
                title: 'Redlands Boulevard Commercial',
                description: 'Retail corridor security for shopping centers, restaurants, and professional businesses with comprehensive protection services.'
            },
            {
                title: 'South Redlands Estates',
                description: 'Historic residential security for citrus-era mansions and premium properties with heritage home protection and monitoring.'
            },
            {
                title: 'East Valley Corridor',
                description: 'Commercial and residential security for the San Bernardino Avenue area with mixed-use development protection.'
            },
            {
                title: 'Mentone Gateway',
                description: 'Security services for businesses and communities at the entrance to the San Bernardino Mountains with foothill property protection.'
            }
        ]
    },
    'rialto': {
        name: 'Rialto',
        areas: [
            {
                title: 'Renaissance Marketplace',
                description: 'Major retail center security for big-box stores, restaurants, and entertainment venues with comprehensive loss prevention services.'
            },
            {
                title: 'Downtown Rialto',
                description: 'Historic downtown security for municipal facilities, businesses, and the Metrolink station area with professional guard services.'
            },
            {
                title: 'Foothill Boulevard Corridor',
                description: 'Commercial security for the primary business thoroughfare with retail centers, auto dealerships, and service businesses.'
            },
            {
                title: 'North Rialto Residential',
                description: 'Residential community security for established neighborhoods with school zones, parks, and mobile patrol coverage.'
            },
            {
                title: 'Rialto Industrial Area',
                description: 'Warehouse and distribution facility security for the I-10 corridor with 24/7 monitoring and access control services.'
            },
            {
                title: 'South Rialto Communities',
                description: 'Security services for residential developments with HOA coordination, neighborhood watch, and property monitoring.'
            }
        ]
    },
    'san-bernardino': {
        name: 'San Bernardino',
        areas: [
            {
                title: 'Downtown San Bernardino',
                description: 'Urban core security for government buildings, courthouse, business district, and historic landmarks with comprehensive protection.'
            },
            {
                title: 'Hospitality Lane District',
                description: 'Hotel and convention center security for the tourism corridor with guest safety, event management, and property protection.'
            },
            {
                title: 'Inland Center Mall Area',
                description: 'Retail security for the regional shopping center and surrounding commercial developments with loss prevention services.'
            },
            {
                title: 'University Parkway Zone',
                description: 'Commercial corridor security for big-box retail, restaurants, and entertainment venues with high-traffic management.'
            },
            {
                title: 'Arrowhead Springs',
                description: 'Hillside residential security for premium properties with mountain views, gated communities, and luxury home protection.'
            },
            {
                title: 'Industrial Park District',
                description: 'Comprehensive warehouse and manufacturing security for the I-10 and I-215 industrial zones with 24/7 patrol services.'
            }
        ]
    },
    'twentynine-palms': {
        name: 'Twentynine Palms',
        areas: [
            {
                title: 'Marine Corps Base Area',
                description: 'Military-adjacent commercial security for businesses supporting the base with specialized protocols and clearance requirements.'
            },
            {
                title: 'Downtown Twentynine Palms',
                description: 'Historic downtown security for shops, galleries, and restaurants serving residents and military families with community-focused services.'
            },
            {
                title: 'Joshua Tree Gateway',
                description: 'Tourism business security for hotels, visitor centers, and outfitters near Joshua Tree National Park entrances.'
            },
            {
                title: 'Desert Heights Residential',
                description: 'Residential community security for military family housing areas with mobile patrol and neighborhood watch coordination.'
            },
            {
                title: 'Highway 62 Commercial',
                description: 'Corridor security for automotive businesses, shopping centers, and service providers along the main thoroughfare.'
            },
            {
                title: 'Historic Plaza Area',
                description: 'Security services for the old town area, civic facilities, and community gathering spaces with event coverage capabilities.'
            }
        ]
    },
    'upland': {
        name: 'Upland',
        areas: [
            {
                title: 'Downtown Upland',
                description: 'Historic downtown security for Second Avenue businesses, restaurants, and the Cable Airport district with foot patrol services.'
            },
            {
                title: 'Mountain Avenue Corridor',
                description: 'Commercial security for retail centers, professional offices, and restaurants along the primary north-south thoroughfare.'
            },
            {
                title: 'Colonies Crossroads',
                description: 'Major retail center security for shopping complexes, dining establishments, and entertainment venues with comprehensive coverage.'
            },
            {
                title: 'North Upland Foothills',
                description: 'Premium hillside residential security for luxury homes with mountain views, gated communities, and estate protection services.'
            },
            {
                title: 'Cable Airport Zone',
                description: 'Aviation facility security for the general aviation airport, hangars, and aerospace businesses with airfield access control.'
            },
            {
                title: 'San Antonio Heights',
                description: 'Upscale residential security for the prestigious hillside community with large estates, equestrian properties, and concierge protection.'
            }
        ]
    }
};

// Function to generate the areas section HTML
function generateAreasSection(citySlug) {
    const cityData = cityAreasData[citySlug];
    if (!cityData) {
        console.log(`⚠️  No area data for ${citySlug}`);
        return null;
    }

    return `
    <!-- Areas We Serve Section -->
    <section class="anaheim-areas-section">
        <div class="anaheim-areas-container">
            <div class="section-badge">Local Coverage</div>
            <h2>Areas We Serve in ${cityData.name}</h2>
            <p class="areas-intro">ShieldWise Security provides comprehensive security services throughout ${cityData.name} and the surrounding communities. Our local expertise allows us to deliver tailored security solutions for the unique needs of each neighborhood:</p>

            <div class="anaheim-areas-grid">
                ${cityData.areas.map(area => `
                <div class="anaheim-area-item">
                    <h3>${area.title}</h3>
                    <p>${area.description}</p>
                </div>`).join('\n                ')}
            </div>
        </div>

        <div class="anaheim-nearby-cities">
            <div class="cities-header">
                <h3>We Also Serve Neighboring San Bernardino County Cities</h3>
                <p>Professional Security Services Throughout the Region</p>
            </div>
            <div class="cities-grid">
                <!-- First Row -->
                <a href="/victorville" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>Victorville</span>
                </a>
                <a href="/hesperia" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>Hesperia</span>
                </a>
                <a href="/fontana" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>Fontana</span>
                </a>
                <!-- Second Row -->
                <a href="/rancho-cucamonga" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>Rancho Cucamonga</span>
                </a>
                <a href="/ontario" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>Ontario</span>
                </a>
                <a href="/san-bernardino" class="city-link">
                    <i class="fas fa-building"></i>
                    <span>San Bernardino</span>
                </a>
            </div>
            <!-- Separate main link -->
            <div class="main-link-container">
                <a href="/san-bernardino-county" class="city-link main-link">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>All of San Bernardino County</span>
                </a>
            </div>
        </div>
    </section>
`;
}

// Function to add areas section to a city file
function addAreasToCity(citySlug) {
    const filepath = path.join(__dirname, '..', 'views', 'cities', `${citySlug}.ejs`);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found: ${citySlug}.ejs`);
        return false;
    }

    // Read the file
    let content = fs.readFileSync(filepath, 'utf8');

    // Check if areas section already exists
    if (content.includes('Areas We Serve in')) {
        console.log(`✅ ${citySlug}.ejs already has Areas We Serve section`);
        return false;
    }

    // Generate the areas section
    const areasSection = generateAreasSection(citySlug);
    if (!areasSection) {
        return false;
    }

    // Find insertion point (before testimonials section or FAQ section)
    const insertMarkers = [
        '<!-- Testimonials Section',
        '<!-- FAQ Section',
        '<!-- Call to Action Section',
        '<!-- Footer'
    ];

    let insertIndex = -1;
    for (const marker of insertMarkers) {
        insertIndex = content.indexOf(marker);
        if (insertIndex !== -1) break;
    }

    if (insertIndex === -1) {
        console.log(`⚠️  Could not find insertion point for ${citySlug}.ejs`);
        return false;
    }

    // Insert the areas section
    const updatedContent = content.slice(0, insertIndex) + areasSection + '\n' + content.slice(insertIndex);

    // Write back to file
    fs.writeFileSync(filepath, updatedContent, 'utf8');
    console.log(`✅ Added Areas We Serve section to ${citySlug}.ejs`);
    return true;
}

// Main execution
function main() {
    console.log('🚀 Starting to add Areas We Serve sections to San Bernardino County cities...\n');

    const citiesToUpdate = Object.keys(cityAreasData);
    let successCount = 0;

    citiesToUpdate.forEach(citySlug => {
        if (addAreasToCity(citySlug)) {
            successCount++;
        }
    });

    console.log(`\n🎉 Completed! Successfully updated ${successCount} out of ${citiesToUpdate.length} city pages.`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { cityAreasData, generateAreasSection, addAreasToCity };
