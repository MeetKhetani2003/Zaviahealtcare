const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');
const pagesDir = path.join(srcDir, 'pages');

const routes = [
  { from: 'Home.tsx', to: 'page.tsx' },
  { from: 'About.tsx', to: 'about-doctor/page.tsx' },
  { from: 'Conditions.tsx', to: 'conditions/page.tsx' },
  { from: 'ConditionDetail.tsx', to: 'conditions/[slug]/page.tsx' },
  { from: 'Treatments.tsx', to: 'treatments/page.tsx' },
  { from: 'TreatmentDetail.tsx', to: 'treatments/[slug]/page.tsx' },
  { from: 'HowItWorks.tsx', to: 'how-it-works/page.tsx' },
  { from: 'PatientStories.tsx', to: 'patient-stories/page.tsx' },
  { from: 'Faqs.tsx', to: 'faqs/page.tsx' },
  { from: 'BookConsultation.tsx', to: 'book-consultation/page.tsx' },
  { from: 'Contact.tsx', to: 'contact/page.tsx' },
  { from: 'NotFound.tsx', to: 'not-found.tsx' },
];

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

for (const route of routes) {
  const fromPath = path.join(pagesDir, route.from);
  const toPath = path.join(appDir, route.to);
  
  if (fs.existsSync(fromPath)) {
    const toDir = path.dirname(toPath);
    if (!fs.existsSync(toDir)) {
      fs.mkdirSync(toDir, { recursive: true });
    }
    fs.renameSync(fromPath, toPath);
  }
}

// Remove empty pages directory
if (fs.existsSync(pagesDir)) {
  fs.rmSync(pagesDir, { recursive: true, force: true });
}

console.log("Migration complete");
