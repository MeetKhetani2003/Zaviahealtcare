const fs = require('fs');
const path = require('path');

const assetsFile = path.join(__dirname, 'src/assets.ts');
const newAssets = `export const IMG = {
  logo: "/images/logo/zivra-health-logo.png",
  drAdeel: "/images/doctor/dr-adeel.png",
  doctorConsultation: "/images/about/doctor-consultation.jpg",
  doctorClinic: "/images/about/doctor-clinic.jpg",
  urinaryHealth: "/images/conditions/urinary-health.jpg",
  kidneyStones: "/images/conditions/kidney-stones.jpg",
  prostateHealth: "/images/conditions/prostate-health.jpg",
  maleUrology: "/images/conditions/male-urology.jpg",
  bladderHealth: "/images/conditions/bladder-health.jpg",
  sexualHealth: "/images/conditions/sexual-health.jpg",
};`;
fs.writeFileSync(assetsFile, newAssets, 'utf8');

// Fix conditions and treatments [slug] page.tsx
const conditionsSlug = path.join(__dirname, 'src/app/conditions/[slug]/page.tsx');
if (fs.existsSync(conditionsSlug)) {
  let content = fs.readFileSync(conditionsSlug, 'utf8');
  content = content.replace(/c => c\.slug === slug/g, 'c => c.slug === (slug as string)');
  content = content.replace(/slug as string as string/g, 'slug as string');
  fs.writeFileSync(conditionsSlug, content, 'utf8');
}

const treatmentsSlug = path.join(__dirname, 'src/app/treatments/[slug]/page.tsx');
if (fs.existsSync(treatmentsSlug)) {
  let content = fs.readFileSync(treatmentsSlug, 'utf8');
  content = content.replace(/t => t\.slug === slug/g, 't => t.slug === (slug as string)');
  content = content.replace(/slug as string as string/g, 'slug as string');
  fs.writeFileSync(treatmentsSlug, content, 'utf8');
}

console.log("Fixes applied!");
