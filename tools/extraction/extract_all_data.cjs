const fs = require('fs');
const js = fs.readFileSync('reference_site.js', 'utf8');

// Helper to extract array from js starting at a substring
function extractArray(startSubstr) {
  const idx = js.indexOf(startSubstr);
  if (idx === -1) return null;
  const startBracket = js.indexOf('[', idx);
  let depth = 0, end = -1;
  for (let i = startBracket; i < js.length; i++) {
    if (js[i] === '[') depth++;
    if (js[i] === ']') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) return null;
  let raw = js.substring(startBracket, end);
  raw = raw.replace(/`([^`]*)`/g, (m, p1) => JSON.stringify(p1));
  try {
    return (new Function('return ' + raw))();
  } catch (e) {
    return null;
  }
}

// Extract image mappings
const imgAssignRegex = /([a-zA-Z0-9_$]+)\s*=\s*`(\/assets\/[^`]+)`/g;
let m;
const imgMap = {};
while ((m = imgAssignRegex.exec(js)) !== null) {
  imgMap[m[1]] = m[2];
}

// 1. Testimonials: jm and Mm
const jm = extractArray('jm=[');
const mm = extractArray('Mm=[');
fs.writeFileSync('src/data/testimonials.js', `export const testimonialsRow1 = ${JSON.stringify(jm || [], null, 2)};\n\nexport const testimonialsRow2 = ${JSON.stringify(mm || [], null, 2)};\n`);
console.log('Testimonials saved, row1:', jm?.length, 'row2:', mm?.length);

// 2. MOU: Lb
const mouIdx = js.indexOf('Lb=[');
if (mouIdx !== -1) {
  let end = -1, depth = 0;
  for (let i = mouIdx + 3; i < js.length; i++) {
    if (js[i] === '[') depth++;
    if (js[i] === ']') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  let raw = js.substring(mouIdx + 3, end);
  for (const [v, p] of Object.entries(imgMap)) {
    const r = new RegExp(`img:\\s*${v}\\b`, 'g');
    raw = raw.replace(r, `img:${JSON.stringify(p)}`);
  }
  raw = raw.replace(/`([^`]*)`/g, (m, p1) => JSON.stringify(p1));
  try {
    const mous = (new Function('return ' + raw))();
    fs.writeFileSync('src/data/mous.js', `export const mouList = ${JSON.stringify(mous, null, 2)};\n`);
    console.log('MOUs saved:', mous.length);
  } catch (e) {
    console.log('Error parsing MOUs:', e.message);
  }
}

// 3. Gallery: nC
const galIdx = js.indexOf('galleryItems:[');
if (galIdx !== -1) {
  let end = -1, depth = 0;
  for (let i = galIdx + 13; i < js.length; i++) {
    if (js[i] === '[') depth++;
    if (js[i] === ']') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  let raw = js.substring(galIdx + 13, end);
  raw = raw.replace(/`([^`]*)`/g, (m, p1) => JSON.stringify(p1));
  try {
    const gallery = (new Function('return ' + raw))();
    fs.writeFileSync('src/data/gallery.js', `export const galleryItems = ${JSON.stringify(gallery, null, 2)};\n`);
    console.log('Gallery saved:', gallery.length);
  } catch (e) {
    console.log('Error parsing Gallery:', e.message);
  }
}
