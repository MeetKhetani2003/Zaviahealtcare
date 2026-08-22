const fs = require('fs');
const path = require('path');

// Move images to public
const srcImages = path.join(__dirname, 'src/assets/images');
const publicImages = path.join(__dirname, 'public/images');
if (fs.existsSync(srcImages)) {
  if (!fs.existsSync(publicImages)) fs.mkdirSync(path.dirname(publicImages), { recursive: true });
  fs.renameSync(srcImages, publicImages);
}

// Fix assets.ts
const assetsFile = path.join(__dirname, 'src/assets.ts');
if (fs.existsSync(assetsFile)) {
  let content = fs.readFileSync(assetsFile, 'utf8');
  content = content.replace(/import \w+ from ".*?\.(png|jpg)";\n/g, '');
  content = content.replace(/logo: .*,/g, 'logo: "/images/logo/zivra-health-logo.png",');
  content = content.replace(/doctor: .*,/g, 'doctor: "/images/doctor/dr-adeel.png",');
  content = content.replace(/consultation: .*,/g, 'consultation: "/images/about/doctor-consultation.jpg",');
  content = content.replace(/clinic: .*,/g, 'clinic: "/images/about/doctor-clinic.jpg",');
  content = content.replace(/urinary: .*,/g, 'urinary: "/images/conditions/urinary-health.jpg",');
  content = content.replace(/kidney: .*,/g, 'kidney: "/images/conditions/kidney-stones.jpg",');
  content = content.replace(/prostate: .*,/g, 'prostate: "/images/conditions/prostate-health.jpg",');
  content = content.replace(/male: .*,/g, 'male: "/images/conditions/male-urology.jpg",');
  content = content.replace(/bladder: .*,/g, 'bladder: "/images/conditions/bladder-health.jpg",');
  content = content.replace(/sexual: .*,/g, 'sexual: "/images/conditions/sexual-health.jpg",');
  
  // Actually, let's just rewrite assets.ts completely to be safe.
  const newAssets = `export const IMG = {
  logo: "/images/logo/zivra-health-logo.png",
  doctor: "/images/doctor/dr-adeel.png",
  about: {
    consultation: "/images/about/doctor-consultation.jpg",
    clinic: "/images/about/doctor-clinic.jpg",
  },
  conditions: {
    urinary: "/images/conditions/urinary-health.jpg",
    kidney: "/images/conditions/kidney-stones.jpg",
    prostate: "/images/conditions/prostate-health.jpg",
    male: "/images/conditions/male-urology.jpg",
    bladder: "/images/conditions/bladder-health.jpg",
    sexual: "/images/conditions/sexual-health.jpg",
  },
};`;
  fs.writeFileSync(assetsFile, newAssets, 'utf8');
}

// Fix layout.tsx
const layoutFile = path.join(__dirname, 'src/components/layout.tsx');
if (fs.existsSync(layoutFile)) {
  let content = fs.readFileSync(layoutFile, 'utf8');
  content = content.replace(/const location = usePathname\(\);/, 'const pathname = usePathname();');
  content = content.replace(/const { pathname } = usePathname\(\);/, 'const pathname = usePathname();');
  content = content.replace(/item\.href/g, 'item.to');
  content = content.replace(/end={.*?}/g, '');
  fs.writeFileSync(layoutFile, content, 'utf8');
}

// Fix conditions and treatments [slug] page.tsx
const conditionsSlug = path.join(__dirname, 'src/app/conditions/[slug]/page.tsx');
if (fs.existsSync(conditionsSlug)) {
  let content = fs.readFileSync(conditionsSlug, 'utf8');
  content = content.replace(/const { slug } = useParams\(\);/, 'const { slug } = useParams() as { slug: string };');
  fs.writeFileSync(conditionsSlug, content, 'utf8');
}

const treatmentsSlug = path.join(__dirname, 'src/app/treatments/[slug]/page.tsx');
if (fs.existsSync(treatmentsSlug)) {
  let content = fs.readFileSync(treatmentsSlug, 'utf8');
  content = content.replace(/const { slug } = useParams\(\);/, 'const { slug } = useParams() as { slug: string };');
  fs.writeFileSync(treatmentsSlug, content, 'utf8');
}

console.log("Fixes applied!");
