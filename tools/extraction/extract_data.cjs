const fs = require('fs');
const js = fs.readFileSync('reference_site.js', 'utf8');

// Find testimonials jm and Mm
// Let's search for "Arun Kumar"
const tIdx = js.indexOf('Arun Kumar');
console.log('Testimonial snippet:', js.substring(Math.max(0, tIdx - 150), tIdx + 200));

// Find MOU colleges
const mouIdx = js.indexOf('Dr.Mahalingam Group of Institutions');
console.log('MOU snippet:', js.substring(Math.max(0, mouIdx - 150), mouIdx + 200));

// Find gallery items
const galIdx = js.indexOf('Tech Giants Internship');
console.log('Gallery snippet:', js.substring(Math.max(0, galIdx - 150), galIdx + 200));

// Find placements
const plIdx = js.indexOf('Thiruvenkatesh');
console.log('Placements snippet:', js.substring(Math.max(0, plIdx - 150), plIdx + 200));
