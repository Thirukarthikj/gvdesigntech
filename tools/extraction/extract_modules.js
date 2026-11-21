const fs = require('fs');
const js = fs.readFileSync('reference_site.js', 'utf8');

// Search for patterns like var Im={"ab-page":`_ab-page_ouj9p_7`,...}
const regex = /(?:var\s+([a-zA-Z0-9_$]+)\s*=\s*)?(\{(?:[a-zA-Z0-9_$]+|\"[a-zA-Z0-9_\-]+\"):\s*`_[a-zA-Z0-9_\-]+`[^}]+\})/g;

const modules = {};
let match;
while ((match = regex.exec(js)) !== null) {
  const varName = match[1] || 'anon';
  const rawObj = match[2];
  try {
    // evaluate the object safely
    const obj = (new Function(`return ${rawObj}`))();
    const sampleVal = Object.values(obj)[0];
    modules[varName] = { sample: sampleVal, size: Object.keys(obj).length, mapping: obj };
  } catch (e) {}
}

console.log('Total extracted modules:', Object.keys(modules).length);
for (const [name, info] of Object.entries(modules)) {
  console.log(`- ${name}: ${info.size} classes, sample: ${info.sample}`);
}

fs.writeFileSync('extracted_modules.json', JSON.stringify(modules, null, 2));
