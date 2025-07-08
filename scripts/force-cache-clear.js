
const fs = require('fs');
const path = require('path');

// Update a timestamp file to force cache invalidation
const timestampFile = path.join(__dirname, '..', 'Public', 'cache-bust.txt');
const timestamp = new Date().toISOString();

fs.writeFileSync(timestampFile, timestamp);
console.log('Cache timestamp updated:', timestamp);
console.log('Clear your browser cache with Ctrl+Shift+R or Cmd+Shift+R');
