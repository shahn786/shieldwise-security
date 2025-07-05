
const fs = require('fs');
const path = require('path');

// Available images in Public/img directory
const availableImages = [
  '1.webp', '15.webp', '2.webp', '4.webp',
  'Apartment-security-.png', 'California_SecurityGuards.webp',
  'Hotel-Security.webp', 'LA.webp', 'OC1.webp',
  'alamendsa1.webp', 'apartmentsecurity.webp', 'armsecurity.png',
  'asis1.avif', 'bakerfield.webp', 'bsis.png',
  'cali_map.png', 'califonia-map.webp', 'california_cities.webp',
  'car-logo.png', 'career1.webp', 'client-1.jpg',
  'commercial-security.png', 'commercialsecurity .webp',
  'constructionsecurity.webp', 'contact10.webp',
  'culver-city-security.webp', 'downtown-la1.webp',
  'downtown_la.webp', 'eventsecurity.png', 'eventsecurity1.png',
  'excutivesecurity.png', 'favicon.ico', 'firewatch.webp',
  'firswatch.png', 'flag.WEBP', 'fresno.webp',
  'hawthorne-security.webp', 'hospitalsecurity.png',
  'hotel- ssecurity.png', 'hsecurity.webp', 'james (2).png',
  'james.png', 'jassica.png', 'la-pic.webp',
  'logo1.png', 'main2.png', 'mobilesecurity.webp',
  'okland.webp', 'orange.webp', 'quot.webp',
  'riverside.webp', 'sacraamento12.webp', 'sacramento.webp',
  'samanta.png', 'san jose.webp', 'san-diego.webp',
  'san-francsco.webp', 'sanbardino12.webp', 'sanbernadino.webp',
  'sandeigo1.webp', 'sanfrancisco1.webp', 'sanjos1e.webp',
  'sanjose1111.webp', 'santa-clara-county-neighborhood.webp',
  'santaclara.webp', 'schoolsecurity.webp', 'services page .png',
  'services-area.webp', 'servies1.webp', 'shahn1.png',
  'shoppingsecurity.webp', 'unarmsecurity1.png',
  'ventura-california-1-2.webp', 'ventura.webp'
];

console.log('Available images:');
availableImages.forEach(img => console.log(`/img/${img}`));

console.log('\nSuggested replacements:');
console.log('california-security-hero.jpg → /img/California_SecurityGuards.webp');
console.log('shieldwise-security-logo.png → /img/logo1.png');
