const fs = require('fs');

const size = 600;
const center = size / 2;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="cadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="cyanViolet" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#d946ef" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <path id="textCircle" d="M ${center} ${center - 225} A 225 225 0 1 1 ${center - 0.1} ${center - 225}" fill="none" />
  </defs>
`;

// 1. Outer CAD border track (r = 275 and 265)
svg += `<circle cx="${center}" cy="${center}" r="275" fill="none" stroke="url(#cadGrad)" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.65" />\n`;
svg += `<circle cx="${center}" cy="${center}" r="265" fill="none" stroke="url(#cyanViolet)" stroke-width="1" opacity="0.4" />\n`;

// 2. Ticks around perimeter (every 5 degrees, major every 30 degrees)
for (let deg = 0; deg < 360; deg += 5) {
  const rad = (deg * Math.PI) / 180;
  const isMajor = deg % 30 === 0;
  const isMid = deg % 15 === 0 && !isMajor;
  const len = isMajor ? 14 : (isMid ? 8 : 4);
  const r1 = 265;
  const r2 = r1 - len;
  const x1 = center + r1 * Math.cos(rad);
  const y1 = center + r1 * Math.sin(rad);
  const x2 = center + r2 * Math.cos(rad);
  const y2 = center + r2 * Math.sin(rad);
  const color = isMajor ? '#c084fc' : (isMid ? '#8b5cf6' : '#a855f7');
  const width = isMajor ? 2 : 1;
  const opacity = isMajor ? 0.9 : 0.45;
  svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${width}" opacity="${opacity}" />\n`;
}

// 3. Segmented heavy CAD brackets (r = 242)
const brackets = [
  { start: 10, end: 50 },
  { start: 70, end: 110 },
  { start: 130, end: 170 },
  { start: 190, end: 230 },
  { start: 250, end: 290 },
  { start: 310, end: 350 }
];

brackets.forEach((b) => {
  const r = 242;
  const startRad = (b.start * Math.PI) / 180;
  const endRad = (b.end * Math.PI) / 180;
  const x1 = center + r * Math.cos(startRad);
  const y1 = center + r * Math.sin(startRad);
  const x2 = center + r * Math.cos(endRad);
  const y2 = center + r * Math.sin(endRad);
  svg += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="url(#cadGrad)" stroke-width="4" stroke-linecap="round" filter="url(#glow)" />\n`;
  // Corner notch
  const nr = r + 7;
  const nx = center + nr * Math.cos(startRad);
  const ny = center + nr * Math.sin(startRad);
  svg += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="3" fill="#38bdf8" />\n`;
});

// 4. Middle CAD Dimension Track (r = 210)
svg += `<circle cx="${center}" cy="${center}" r="210" fill="none" stroke="url(#cyanViolet)" stroke-width="1.5" stroke-dasharray="18 8 4 8" opacity="0.7" />\n`;

// 5. Cardinal Engineering Crosshair Markers (0, 90, 180, 270)
[0, 90, 180, 270].forEach((deg) => {
  const rad = (deg * Math.PI) / 180;
  const x1 = center + 195 * Math.cos(rad);
  const y1 = center + 195 * Math.sin(rad);
  const x2 = center + 285 * Math.cos(rad);
  const y2 = center + 285 * Math.sin(rad);
  svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.8" />\n`;
});

// 6. Inner CAD Gear Pitch Circle (r = 175)
svg += `<circle cx="${center}" cy="${center}" r="175" fill="none" stroke="url(#cadGrad)" stroke-width="2" stroke-dasharray="3 6" opacity="0.65" />\n`;
// Inner clear circle border (r = 162)
svg += `<circle cx="${center}" cy="${center}" r="162" fill="none" stroke="url(#cyanViolet)" stroke-width="1" opacity="0.5" />\n`;

// 7. CAD Technical Annotations along circular paths
svg += `<text fill="#c084fc" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" letter-spacing="3" opacity="0.85">
  <textPath href="#textCircle" startOffset="3%">GV DESIGNTECH • CAD / CAM / CAE ENGINEERING • MODELING &amp; SIMULATION</textPath>
</text>\n`;

svg += `</svg>`;

fs.writeFileSync('public/assets/cad-engineering-circle.svg', svg);
console.log('Generated public/assets/cad-engineering-circle.svg successfully!');
