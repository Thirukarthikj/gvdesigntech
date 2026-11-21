const fs = require('fs');
const js = fs.readFileSync('reference_site.js', 'utf8');

// Find all object literals containing `_[a-z0-9-]+_[a-z0-9]+_[0-9]+`
const regex = /(?:([a-zA-Z0-9_$]+)\s*=\s*)?(\{(?:[a-zA-Z0-9_$]+|\"[a-zA-Z0-9_\-]+\"):\s*`_[a-zA-Z0-9_\-]+`[\s\S]*?\n?[^;]*?\})/g;

// Let's specifically find P, Zp, Im, etc.
function findObject(varName) {
  const target = `${varName}={`;
  const idx = js.indexOf(target);
  if (idx === -1) return null;
  // find end of object
  let depth = 0;
  let end = -1;
  for (let i = idx + target.length - 1; i < js.length; i++) {
    if (js[i] === '{') depth++;
    if (js[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  const raw = js.substring(idx + target.length - 1, end);
  try {
    return (new Function(`return ${raw}`))();
  } catch (e) {
    return null;
  }
}

const vars = {
  home: 'P',
  modal: 'Zp',
  about: 'Im',
  contact: 'L',
  ai: 'z',
  ml: 'B',
  sidebar: '_b',
  mou: 'yb',
  aiIntern: 'V',
  summerIntern: 'H',
  collegeIntern: 'U',
  dsIntern: 'W',
  mlIntern: 'K',
  placement: 'G',
  gallery: 'im',
  blog: 'gC',
  cert: 'q',
  pest: 'J',
  login: 'th',
  register: 'Ov',
  otp: 'jv',
  dash: 'Nv',
  adminLogin: 'Fv',
  adminDash: 'Rv',
  adminStudent: 'Bv',
  video: 'Ew'
};

const result = {};
for (const [key, vName] of Object.entries(vars)) {
  const obj = findObject(vName);
  if (obj) {
    result[key] = obj;
    console.log(`Found ${key} (${vName}): ${Object.keys(obj).length} keys`);
  } else {
    console.log(`NOT found: ${key} (${vName})`);
  }
}

let out = '// Auto-generated CSS module mappings with named exports\n';
for (const [key, obj] of Object.entries(result)) {
  out += `export const ${key}Styles = ${JSON.stringify(obj, null, 2)};\n\n`;
}

fs.writeFileSync('src/data/styles.js', out);
console.log('src/data/styles.js generated successfully.');
