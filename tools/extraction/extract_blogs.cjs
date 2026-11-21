const fs = require('fs');
const js = fs.readFileSync('reference_site.js', 'utf8');

// Find all image variable assignments
const imgAssignRegex = /([a-zA-Z0-9_$]+)\s*=\s*`(\/assets\/[^`]+)`/g;
let m;
const imgMap = {};
while ((m = imgAssignRegex.exec(js)) !== null) {
  imgMap[m[1]] = m[2];
}

const idx = js.indexOf('KC=[');
let depth = 0, end = -1;
for (let i = idx + 3; i < js.length; i++) {
  if (js[i] === '[') depth++;
  if (js[i] === ']') {
    depth--;
    if (depth === 0) { end = i + 1; break; }
  }
}
let rawKC = js.substring(idx + 3, end);
for (const [varName, p] of Object.entries(imgMap)) {
  const r = new RegExp(`image:\\s*${varName}\\b`, 'g');
  rawKC = rawKC.replace(r, `image:${JSON.stringify(p)}`);
}

// Convert backticks to double quotes
rawKC = rawKC.replace(/`([^`]*)`/g, (match, p1) => JSON.stringify(p1));

const blogs = (new Function('return ' + rawKC))();
console.log('Total blogs parsed:', blogs.length);

const out = `export const blogCategories = ['All', 'Full Stack', 'Data Science', 'AI & ML', 'Java', 'MERN Stack', 'UI/UX', 'Python', 'others'];\n\nexport const blogPosts = ${JSON.stringify(blogs, null, 2)};\n`;
fs.writeFileSync('src/data/blogs.js', out);
console.log('src/data/blogs.js written successfully.');
