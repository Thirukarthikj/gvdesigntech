const fs = require('fs');
const modules = JSON.parse(fs.readFileSync('extracted_modules.json', 'utf8'));

let out = '// Auto-generated CSS module mappings from reference site\n';
for (const [key, val] of Object.entries(modules)) {
  const safeName = key.replace(/[^a-zA-Z0-9_$]/g, '_');
  out += `export const mod_${safeName} = ${JSON.stringify(val.mapping, null, 2)};\n\n`;
}

if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/styles.js', out);
console.log('src/data/styles.js written successfully.');
