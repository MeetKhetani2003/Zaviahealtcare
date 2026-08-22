const fs = require('fs');

let content = fs.readFileSync('src/data/content.ts', 'utf8');

// Replace homeFaqs
const newHomeFaqs = `export const homeFaqs: Faq[] = [
  { q:"Can kidney stones really be managed without surgery?", a:"Yes — for stones up to 8mm, the right diet, hydration protocol, and lifestyle changes can dissolve and flush out stones naturally. Our 96% success rate across 500+ patients confirms this. For larger stones, our experts will give you an honest, medically guided assessment." },
  { q:"How is a Zivra assessment different from seeing a regular doctor?", a:"A Zivra assessment collects detailed information about your stone type, lifestyle, diet, and symptoms — and uses that to build a personalised care pathway. Think of it as the bridge between your doctor's diagnosis and your daily life. We don't replace your doctor; we complement their treatment." },
  { q:"How quickly do I receive my personalised care plan?", a:"Within 24 hours of completing your health assessment and expert review, you will receive your personalised care plan directly via WhatsApp and email." },
  { q:"Is the guidance safe? Will you recommend medicines?", a:"Zivra provides evidence-based dietary and lifestyle guidance reviewed by qualified doctors. Some natural supplements may be recommended. We never prescribe pharmaceutical drugs — that remains with your licensed physician." },
  { q:"What if my stone is larger than 8mm?", a:"Our experts will review your case honestly. If surgery is genuinely required, we will tell you clearly and help you prepare. We will never recommend against medically necessary surgery." },
  { q:"Is Hindi support available?", a:"Yes. Our team is fully bilingual. You can complete your assessment, consult with our experts, and receive your care plan entirely in Hindi if preferred." },
];`;

content = content.replace(/export const homeFaqs: Faq\[\] = \[[\s\S]*?\];/m, newHomeFaqs);

// Replace patientStories
const newPatientStories = `export const patientStories: Story[] = [
  { name:"Ramesh Kumar", category:"Kidney Stones", quote:"Had an 8mm stone and was told surgery was my only option. I tried Zivra as a last resort. 3 months later my ultrasound showed nothing. My urologist was genuinely surprised." },
  { name:"Sunita Deshpande", category:"Kidney Stones", quote:"I used to wake up in severe pain at night and end up in emergency. Zivra's plan changed my diet. The WhatsApp guidance was daily and personal. By week 6, scan was clear." },
  { name:"Arjun Patel", category:"Kidney Stones", quote:"Second stone in 3 years. First time I had surgery — they removed the stone but never told me why it formed. Zivra showed me exactly what was causing it. 4 months later, gone." },
  { name:"Priya Sharma", category:"Kidney Stones", quote:"Kidney stone during pregnancy is terrifying. Surgery was not possible. Zivra's team coordinated with my OB and created a pregnancy-safe diet protocol. 8 weeks — resolved completely." },
];`;

content = content.replace(/export const patientStories: Story\[\] = \[[\s\S]*?\];/m, newPatientStories);

fs.writeFileSync('src/data/content.ts', content);
console.log('content.ts updated');
