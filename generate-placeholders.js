// Run: node generate-placeholders.js
// Creates SVG placeholder images in public/images/
// Replace any placeholder with your actual image (same filename but .jpg/.png/.webp)

const fs = require('fs');
const path = require('path');

function createSVG(width, height, bgColor, textColor, label, subLabel) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <rect x="2" y="2" width="${width-4}" height="${height-4}" fill="none" stroke="${textColor}" stroke-width="1" stroke-dasharray="8,4" opacity="0.3"/>
  <text x="${width/2}" y="${height/2 - 12}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="${textColor}">${label}</text>
  <text x="${width/2}" y="${height/2 + 12}" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="${textColor}" opacity="0.7">${subLabel}</text>
  <text x="${width/2}" y="${height - 16}" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="${textColor}" opacity="0.4">${width}x${height} — Replace with your image</text>
</svg>`;
}

const images = [
  // === LUXURIA (Dark Gold theme) ===
  // Brand hero
  { path: 'luxuria/brand-hero.svg', w: 800, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LUXURIA', sub: 'Brand Hero Image' },

  // Theme images (2 per theme for gallery)
  { path: 'luxuria/lux-zen-1.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxZen', sub: 'Japanese Minimalist — Exterior' },
  { path: 'luxuria/lux-zen-2.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxZen', sub: 'Japanese Minimalist — Interior' },
  { path: 'luxuria/lux-roma-1.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxRoma', sub: 'Mediterranean — Exterior' },
  { path: 'luxuria/lux-roma-2.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxRoma', sub: 'Mediterranean — Interior' },
  { path: 'luxuria/lux-moda-1.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxModa', sub: 'Contemporary Modern — Exterior' },
  { path: 'luxuria/lux-moda-2.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxModa', sub: 'Contemporary Modern — Interior' },
  { path: 'luxuria/lux-ai-1.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxAI', sub: 'Futuristic Gen-Z — Exterior' },
  { path: 'luxuria/lux-ai-2.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxAI', sub: 'Futuristic Gen-Z — Interior' },
  { path: 'luxuria/lux-rajasthani-1.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxRajasthani', sub: 'Indian Heritage — Exterior' },
  { path: 'luxuria/lux-rajasthani-2.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: 'LuxRajasthani', sub: 'Indian Heritage — Interior' },

  // Size/floorplan images
  { path: 'luxuria/size-1000.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: '1000 sqft', sub: 'Compact Luxury — 2BHK Floor Plan' },
  { path: 'luxuria/size-1500.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: '1500 sqft', sub: 'Luxury Home — 3BHK Floor Plan' },
  { path: 'luxuria/size-2000.svg', w: 600, h: 400, bg: '#1a1a1a', fg: '#d4a853', label: '2000 sqft', sub: 'Luxury Estate — 4BHK Floor Plan' },

  // === MODURA (Warm Beige theme) ===
  { path: 'modura/brand-hero.svg', w: 800, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'MODURA', sub: 'Brand Hero Image' },

  { path: 'modura/mod-modern-1.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Modern', sub: 'Contemporary Minimalist — Exterior' },
  { path: 'modura/mod-modern-2.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Modern', sub: 'Contemporary Minimalist — Interior' },
  { path: 'modura/mod-neoclassic-1.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Neo-Classic', sub: 'Modern Classic — Exterior' },
  { path: 'modura/mod-neoclassic-2.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Neo-Classic', sub: 'Modern Classic — Interior' },
  { path: 'modura/mod-genz-1.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Gen-Z', sub: 'Digital Modern — Exterior' },
  { path: 'modura/mod-genz-2.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: 'Gen-Z', sub: 'Digital Modern — Interior' },

  { path: 'modura/size-800.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: '800 sqft', sub: 'Compact Modern — 1BHK Floor Plan' },
  { path: 'modura/size-1200.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: '1200 sqft', sub: 'Contemporary Home — 2BHK Floor Plan' },
  { path: 'modura/size-1600.svg', w: 600, h: 400, bg: '#f5f0e8', fg: '#6b5b3e', label: '1600 sqft', sub: 'Modern Family — 3BHK Floor Plan' },

  // === NIVASA (Clean White theme) ===
  { path: 'nivasa/brand-hero.svg', w: 800, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: 'NIVASA', sub: 'Brand Hero Image' },

  { path: 'nivasa/niv-modern-1.svg', w: 600, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: 'Standard Modern', sub: 'Practical Modern — Exterior' },
  { path: 'nivasa/niv-modern-2.svg', w: 600, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: 'Standard Modern', sub: 'Practical Modern — Interior' },

  { path: 'nivasa/size-600.svg', w: 600, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: '600 sqft', sub: 'Starter Home — 1BHK Floor Plan' },
  { path: 'nivasa/size-900.svg', w: 600, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: '900 sqft', sub: 'Growing Family — 2BHK Floor Plan' },
  { path: 'nivasa/size-1200.svg', w: 600, h: 400, bg: '#ffffff', fg: '#2d7d5f', label: '1200 sqft', sub: 'Family Home — 3BHK Floor Plan' },
];

const base = path.join(__dirname, 'public', 'images');

images.forEach(img => {
  const filePath = path.join(base, img.path);
  const svg = createSVG(img.w, img.h, img.bg, img.fg, img.label, img.sub);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`  Created: images/${img.path}`);
});

console.log(`\n  ${images.length} placeholder images created.`);
console.log(`\n  TO REPLACE: Drop your actual image (JPG/PNG/WEBP) with the same base name.`);
console.log(`  Example: Replace "luxuria/lux-zen-1.svg" with "luxuria/lux-zen-1.jpg"\n`);
