import { IMG } from "../assets";

/* ------------------------------------------------------------------ */
/*  Site                                                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: "ZivRA HEALTH",
  doctor: "Dr. Adeel",
  qualification: "BUMS",
  experience: "15+ Years Experience",
  role: "Urologist",
  phone: "7004553815",
  phoneHref: "tel:+917004553815",
  email: "rehanansari2503@gmail.com",
  address: "Sarai Sattar Khan, Laheriasarai, Darbhanga, Bihar, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sarai+Sattar+Khan%2C+Laheriasarai%2C+Darbhanga%2C+Bihar%2C+India",
  location: "Darbhanga, Bihar",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about-doctor", label: "About Doctor" },
  { to: "/conditions", label: "Conditions" },
  { to: "/treatments", label: "Treatments" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/patient-stories", label: "Patient Stories" },
  { to: "/faqs", label: "FAQs" },
];

export const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "BUMS", label: "Professional Qualification" },
  { value: "Urologist", label: "Area of Practice" },
];

export const whyPoints = [
  {
    icon: "pulse",
    title: "Experienced Care",
    text: "15+ years of professional experience.",
  },
  {
    icon: "user",
    title: "Personal Attention",
    text: "A consultation approach centred around the patient's concerns.",
  },
  {
    icon: "chat",
    title: "Clear Communication",
    text: "Healthcare information explained simply and respectfully.",
  },
  {
    icon: "shield",
    title: "Privacy & Comfort",
    text: "A comfortable environment for discussing sensitive concerns.",
  },
];

/* ------------------------------------------------------------------ */
/*  Stock editorial photography (licensed Pexels)                      */
/* ------------------------------------------------------------------ */

const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const PHOTO = {
  conditionsHero: px(7579831, 1600, 900),
  treatmentsHero: px(7659869, 1600, 900),
  howItWorksHero: px(8121246, 1600, 900),
  storiesHero: px(7545048, 1600, 900),
  storiesSupport: px(7545214, 1000, 750),
  education: px(5093596, 1200, 900),
  consultation: px(6129441, 1200, 900),
  assessment: px(6129444, 1200, 900),
  care: px(7578802, 1200, 900),
  followup: px(7578816, 1200, 900),
  listening: px(5593720, 1200, 900),
  seniorExam: px(18870282, 1200, 900),
  checkup: px(14558557, 1200, 900),
};

/* ------------------------------------------------------------------ */
/*  Conditions                                                         */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export type Condition = {
  slug: string;
  title: string;
  short: string;
  image: string;
  understanding: string[];
  symptoms: string[];
  seekAdvice: string[];
  consultation: string[];
  faqs: Faq[];
};

export const conditions: Condition[] = [
  {
    slug: "urinary-health",
    title: "Urinary Health",
    short:
      "Concerns around urine, urgency, frequency or discomfort that deserve a proper evaluation.",
    image: IMG.urinaryHealth,
    understanding: [
      "The urinary system includes the kidneys, ureters, bladder and urethra. Concerns in this area are common, and most are manageable once properly evaluated. Symptoms can arise from infections, structural factors, lifestyle, or other conditions — which is exactly why a careful assessment matters before drawing any conclusions.",
      "A urologist evaluates the full picture: your symptoms, your history, a physical examination, and relevant investigations where appropriate. This helps separate common, straightforward causes from concerns that deserve closer attention.",
    ],
    symptoms: [
      "Burning or pain while passing urine",
      "Needing to pass urine more often than usual",
      "A sudden, strong urge to urinate",
      "Blood in the urine",
      "Pain or discomfort in the lower abdomen or back",
      "A weak or interrupted urine flow",
    ],
    seekAdvice: [
      "If you notice blood in your urine",
      "If burning or pain persists for more than a few days",
      "If urinary frequency is disrupting sleep or daily life",
      "If symptoms keep returning after initial care",
      "If urinary symptoms come with fever — this needs prompt attention",
    ],
    consultation: [
      "A consultation begins with an unhurried discussion of your symptoms and history. Depending on your concern, Dr. Adeel may suggest basic investigations such as a urine examination, and will explain the findings and the next steps in plain, respectful language.",
      "You leave the consultation knowing what is likely going on, what has been ruled out, and what — if anything — needs follow-up. No jargon, no guesswork.",
    ],
    faqs: [
      {
        q: "Is a urinary infection something I should ignore?",
        a: "No. Urinary symptoms deserve a proper evaluation. Persistent or recurring symptoms are a good reason to consult a urologist.",
      },
      {
        q: "What happens in a urology consultation?",
        a: "The consultation focuses on listening to your concerns, reviewing your history, a physical examination where relevant, and clear guidance on next steps.",
      },
      {
        q: "Will I need investigations?",
        a: "Only if your symptoms and history suggest it. Many concerns can be evaluated within the initial consultation itself.",
      },
    ],
  },
  {
    slug: "kidney-stones",
    title: "Kidney Stone Concerns",
    short:
      "Pain, recurrence, or symptoms that suggest stones forming in the urinary tract.",
    image: IMG.kidneyStones,
    understanding: [
      "Kidney stones form when certain substances in the urine concentrate and crystallise. Many people pass small stones without realising it, but larger stones can cause significant pain and blockage. A history of stones, or a family history, makes awareness especially important.",
      "Managing stone concerns is less about a single event and more about understanding your risk, dealing with symptoms appropriately, and reducing the chances of recurrence through the right professional guidance.",
    ],
    symptoms: [
      "Sudden severe pain in the side, back or lower abdomen",
      "Pain that comes in waves and may move toward the groin",
      "Burning or discomfort while urinating",
      "Blood in the urine",
      "Nausea or vomiting accompanying pain",
      "Urinary urgency or frequency",
    ],
    seekAdvice: [
      "If you have sudden, severe flank or abdominal pain",
      "If you see blood in your urine",
      "If you have a history of kidney stones",
      "If you've been advised to pass a stone or follow up on one",
      "If pain is accompanied by fever — seek prompt medical attention",
    ],
    consultation: [
      "The consultation reviews your symptoms, past stones and family history. Where relevant, an ultrasound or urine analysis may be suggested to understand the current situation.",
      "You'll receive clear guidance on what to watch for, what to do next, and how to reduce the chance of the issue recurring.",
    ],
    faqs: [
      {
        q: "Do kidney stones always cause pain?",
        a: "Not always. Some small stones pass without symptoms and are only discovered incidentally during an examination for another reason.",
      },
      {
        q: "Can kidney stones come back?",
        a: "They can. Understanding your personal risk and following professional guidance is what helps reduce recurrence.",
      },
      {
        q: "When should I go to an emergency room?",
        a: "Severe pain with fever, persistent vomiting, or an inability to pass urine needs urgent medical attention — don't wait for a routine appointment in such cases.",
      },
    ],
  },
  {
    slug: "prostate-health",
    title: "Prostate Health",
    short:
      "Age-related urinary changes and other prostate concerns that deserve attention.",
    image: IMG.prostateHealth,
    understanding: [
      "The prostate is a small gland in the male reproductive system that surrounds the urethra. As men age, changes in the prostate can affect urinary flow — and many men feel hesitant to discuss this. Prostate concerns are common, and bringing them up early makes management far simpler.",
      "A calm, private consultation is the right place to raise these concerns. Evaluation typically includes your history, an examination, and investigations such as PSA testing or an ultrasound where appropriate.",
    ],
    symptoms: [
      "A weaker urine stream",
      "Starting and stopping urine flow",
      "Needing to urinate more often at night",
      "Difficulty starting urination",
      "Feeling the bladder doesn't empty completely",
      "Discomfort in the pelvic area",
    ],
    seekAdvice: [
      "If urinary symptoms are gradually worsening with age",
      "If you notice blood in urine or semen",
      "If you have a family history of prostate conditions",
      "If symptoms are affecting sleep or daily confidence",
      "For any new, persistent pelvic discomfort",
    ],
    consultation: [
      "The consultation is private and judgement-free. Dr. Adeel reviews your symptoms and history, performs a relevant examination, and may suggest basic investigations such as a PSA test or ultrasound.",
      "You'll understand what the findings mean, what they do not mean, and what follow-up — if any — is appropriate.",
    ],
    faqs: [
      {
        q: "At what age should men start paying attention to prostate health?",
        a: "Changes often become noticeable in the 50s and 60s, but symptoms can appear earlier. Any persistent urinary change is worth a consultation, at any age.",
      },
      {
        q: "Are prostate concerns common?",
        a: "Yes, they are very common with age — which is also why they shouldn't be a source of embarrassment or hesitation.",
      },
      {
        q: "Is the consultation private?",
        a: "Completely. Sensitive concerns are a routine part of urological practice and are treated with full confidentiality.",
      },
    ],
  },
  {
    slug: "male-urology",
    title: "Male Urological Health",
    short:
      "Health concerns specific to the male urinary and reproductive system.",
    image: IMG.maleUrology,
    understanding: [
      "The male urinary and reproductive system is closely connected, and concerns in one area can relate to the other. From hormonal changes to urinary flow, a urologist looks at the whole picture rather than isolated symptoms.",
      "Many men put these conversations off. A professional consultation removes the guesswork — your concern is understood, evaluated respectfully, and a clear path forward is discussed.",
    ],
    symptoms: [
      "Changes in urinary flow or pattern",
      "Pain or discomfort in the groin or pelvic area",
      "Changes in testicular size or tenderness",
      "Persistent urinary symptoms",
      "Concerns related to hormonal or metabolic changes",
      "Fatigue or low energy you'd like professionally evaluated",
    ],
    seekAdvice: [
      "If you notice sudden testicular pain or swelling — this should be seen promptly",
      "If urinary symptoms persist or worsen",
      "If you have concerns about reproductive or hormonal health",
      "If symptoms are affecting daily confidence or activity",
    ],
    consultation: [
      "A focused, respectful consultation covering your history, a relevant examination, and investigations where appropriate.",
      "The goal is a clear understanding of your concern and a practical, agreed path forward — discussed in terms you're comfortable with.",
    ],
    faqs: [
      {
        q: "I've been ignoring a concern for months. Is it too late to discuss it now?",
        a: "It is never too late to seek professional input. Early discussion is always better, but a consultation at any stage still provides clarity and direction.",
      },
      {
        q: "How is a urologist different from a general physician for these concerns?",
        a: "A urologist specialises in the urinary and male reproductive systems, so the depth of evaluation and guidance is specific to your concern.",
      },
      {
        q: "Will my information be kept confidential?",
        a: "Yes. Everything discussed in consultation is treated with strict confidentiality.",
      },
    ],
  },
  {
    slug: "bladder-health",
    title: "Bladder Health",
    short:
      "Frequent urgency, weak control, or persistent discomfort needing careful assessment.",
    image: IMG.bladderHealth,
    understanding: [
      "The bladder stores urine, and when it behaves unpredictably — urgent urges, weak control, or persistent discomfort — daily life is affected. Bladder symptoms have many possible causes, from infections to an overactive bladder to other conditions, and careful assessment is what brings clarity.",
      "Bladder concerns are very discussable. In a urology consultation, your symptom pattern is mapped in detail, because the pattern itself is often the most important clue.",
    ],
    symptoms: [
      "Strong, sudden urges to urinate",
      "Passing urine very frequently, day or night",
      "Leaking urine before reaching the toilet",
      "Straining to pass urine",
      "Pain or pressure in the lower abdomen",
      "Waking multiple times at night to urinate",
    ],
    seekAdvice: [
      "If leakage is affecting daily life or confidence",
      "If frequency is disrupting sleep",
      "If you have pain along with urgency",
      "If symptoms follow a recent urinary infection",
      "If symptoms are gradually worsening",
    ],
    consultation: [
      "The consultation maps your symptoms carefully — timing, triggers, and patterns — and reviews your history. Where helpful, a urine examination or further evaluation may be suggested.",
      "You'll understand the likely causes, what can be done, and what to expect going forward.",
    ],
    faqs: [
      {
        q: "Is urinary leakage a normal part of ageing?",
        a: "It is common, but it is not something to simply accept without evaluation. Many causes are treatable or manageable with the right guidance.",
      },
      {
        q: "How is an overactive bladder diagnosed?",
        a: "Through a detailed symptom history, examination, and where relevant, investigations. A proper evaluation rules out other causes first.",
      },
      {
        q: "Can bladder symptoms affect my overall health?",
        a: "They can — particularly through sleep disruption and reduced confidence. Addressing them early improves quality of life.",
      },
    ],
  },
  {
    slug: "sexual-health",
    title: "Sexual Health",
    short:
      "A private, judgement-free conversation about sexual well-being concerns.",
    image: IMG.sexualHealth,
    understanding: [
      "Sexual well-being is an established part of urological practice, and it is handled in the clinic with the same professional calm as any other concern. Many issues in this area have clear, manageable causes — but only a proper evaluation can identify them.",
      "This is a private, judgement-free space. You can share as much or as little as you're comfortable with, and the consultation is structured to respect that.",
    ],
    symptoms: [
      "Changes in sexual performance or confidence",
      "Pain during intercourse",
      "Concerns related to hormonal changes",
      "Anxiety or stress linked to a specific concern",
      "Changes that have developed gradually over time",
      "Any physical discomfort you'd like evaluated",
    ],
    seekAdvice: [
      "If changes are affecting confidence or relationships",
      "If any concern is causing persistent stress",
      "If there is pain or a physical change",
      "If you simply want a professional's honest perspective",
    ],
    consultation: [
      "A confidential, one-to-one consultation. Dr. Adeel listens without judgement, reviews possible causes with you, and discusses what professional guidance is appropriate.",
      "No detail is too small to matter, and no question is too difficult to ask.",
    ],
    faqs: [
      {
        q: "Is what I discuss kept private?",
        a: "Yes. Everything discussed in consultation is confidential and is never discussed outside the clinical setting.",
      },
      {
        q: "Will I feel judged?",
        a: "No. These concerns are a routine part of urological practice and are approached with complete professionalism.",
      },
      {
        q: "Can family members accompany me?",
        a: "The consultation is one-to-one. For concerns in this area, it is usually most helpful when you attend on your own.",
      },
    ],
  },
  {
    slug: "other-concerns",
    title: "Other Urological Concerns",
    short:
      "If your concern doesn't fit a category, that's fine. The right path becomes clear in a conversation.",
    image: PHOTO.listening,
    understanding: [
      "Urology covers more ground than most people expect. If your concern doesn't fit neatly into a category — or if you're simply unsure about something — a consultation is the simplest way to get clarity.",
      "You don't need to have it figured out. Describe what you're experiencing, and the right path will become clear from there.",
    ],
    symptoms: [
      "A symptom you can't quite name",
      "A report result you'd like professionally explained",
      "A concern a friend or family member raised",
      "Persistent discomfort you've put off discussing",
      "A change in urinary habits or general well-being",
    ],
    seekAdvice: [
      "If you're unsure where a symptom belongs",
      "If you want a second opinion on a concern",
      "If a health check-up raised something to review",
      "If you've been putting a question off for a while",
    ],
    consultation: [
      "The consultation is simply a professional conversation about your concern — what you're experiencing, what you've tried, and what you're worried about.",
      "From there, you'll know clearly whether the matter falls within urology, what to do next, and what can safely wait.",
    ],
    faqs: [
      {
        q: "I'm not sure if my problem is even a urology issue. Should I still consult?",
        a: "Yes. A urology consultation is a reasonable first step for most urinary and related concerns — and you'll get clarity either way.",
      },
      {
        q: "Can I bring an old report I'm confused about?",
        a: "Please do. Bringing previous reports or results helps the consultation be far more focused and useful.",
      },
      {
        q: "What if the consultation decides my concern needs another specialist?",
        a: "You'll be told straightforwardly, with an explanation of why and what kind of specialist would be appropriate.",
      },
    ],
  },
];

export const getCondition = (slug: string) =>
  conditions.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ */
/*  Treatments                                                         */
/* ------------------------------------------------------------------ */

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  image: string;
  overview: string[];
  whoShould: string[];
  involves: string[];
  faqs: Faq[];
};

export const treatments: Treatment[] = [
  {
    slug: "urology-consultation",
    title: "Urology Consultation & Care Guidance",
    short:
      "A dedicated, unhurried consultation to understand your concern and agree on the right next steps.",
    image: PHOTO.consultation,
    overview: [
      "Every urological concern begins the same way — with a conversation. The consultation at ZivRA HEALTH is structured around listening first: your symptoms, your history, your questions, and your comfort.",
      "Depending on what your history reveals, the consultation may be the complete answer, or it may point to simple investigations. Either way, you leave with a clear understanding and an agreed path forward.",
    ],
    whoShould: [
      "Anyone with a urological symptom you'd like evaluated",
      "Those wanting a second opinion before making decisions",
      "Men and women with urinary or kidney-related concerns",
      "Patients who'd like a report or finding professionally explained",
    ],
    involves: [
      "A detailed, private discussion of your symptoms and history",
      "A focused physical examination where relevant",
      "Guidance on any investigations that may help clarify things",
      "A clear explanation of findings in simple language",
      "Agreed next steps — discussed openly, no pressure",
    ],
    faqs: [
      {
        q: "How should I prepare for my first consultation?",
        a: "Note down your symptoms and when they started, list the medicines you take, and bring any previous reports. That's all you need.",
      },
      {
        q: "Do I need a referral from another doctor?",
        a: "No referral is needed. You can book a urology consultation directly.",
      },
      {
        q: "Can I bring a family member along?",
        a: "You're welcome to, unless your concern is a sensitive one you'd rather keep one-to-one.",
      },
    ],
  },
  {
    slug: "kidney-stone-care",
    title: "Kidney Stone Care",
    short:
      "Evaluation, symptom guidance and recurrence awareness for kidney and urinary tract stone concerns.",
    image: PHOTO.care,
    overview: [
      "Kidney stone care is about more than dealing with the pain of a single episode. It's about understanding whether stones are present, how they formed, and what you can do — with professional guidance — to make a recurrence far less likely.",
      "Care at ZivRA HEALTH is centred on careful evaluation, clear explanation of your specific situation, and practical guidance you can live with. Where a concern needs a procedure or specialist input beyond the clinic, you'll be told directly.",
    ],
    whoShould: [
      "Anyone with symptoms suggestive of kidney or urinary stones",
      "Patients with a history of stones who want recurrence guidance",
      "Those with a family history of stone formation",
      "Patients who've been told to pass a stone and want follow-up clarity",
    ],
    involves: [
      "A thorough review of your symptoms, history and family background",
      "Guidance on investigations such as ultrasound or urine analysis where relevant",
      "A clear explanation of what's found and what it means",
      "Practical, individualised guidance to reduce recurrence risk",
      "A direct conversation about when urgent care is needed",
    ],
    faqs: [
      {
        q: "Will I need an ultrasound?",
        a: "It's commonly useful in stone evaluation, but it's decided based on your symptoms and history — not automatically.",
      },
      {
        q: "Can diet and lifestyle really affect stone risk?",
        a: "Yes — hydration and certain dietary habits can play a real role. Specific guidance is given based on your situation.",
      },
      {
        q: "What if my stone needs a procedure?",
        a: "You'll be informed clearly and directly, with an explanation of why and what the appropriate next step would be.",
      },
    ],
  },
  {
    slug: "prostate-care",
    title: "Prostate Health Care",
    short:
      "Private, professional evaluation and guidance for age-related prostate concerns.",
    image: PHOTO.seniorExam,
    overview: [
      "Prostate concerns are among the most common reasons men reach out to a urologist — and among the most delayed. Prostate care at ZivRA HEALTH is built on privacy, patience and plain-language explanation, because these conversations only work when the patient feels comfortable.",
      "Evaluation may include a focused examination and investigations such as a PSA test or ultrasound where appropriate. The emphasis is always on what the findings actually mean for you — nothing more, nothing less.",
    ],
    whoShould: [
      "Men noticing gradual changes in urinary flow with age",
      "Those with a family history of prostate conditions",
      "Patients who've been advised a PSA test or prostate ultrasound",
      "Anyone with new pelvic discomfort they'd like evaluated",
    ],
    involves: [
      "A confidential, judgement-free conversation about your symptoms",
      "A focused physical examination where clinically indicated",
      "Guidance on investigations such as PSA testing or ultrasound",
      "A clear, honest explanation of findings in simple terms",
      "An agreed plan for follow-up or observation, as appropriate",
    ],
    faqs: [
      {
        q: "Is the prostate examination uncomfortable?",
        a: "The examination is brief and performed respectfully, with your comfort kept in mind throughout.",
      },
      {
        q: "Does a PSA test mean I have a problem?",
        a: "No. It is a screening tool. Findings must be interpreted alongside age, symptoms and other factors — which is what the consultation is for.",
      },
      {
        q: "How often should men get their prostate checked?",
        a: "There's no single answer — it depends on age and family history. A consultation helps you decide what's right for you.",
      },
    ],
  },
  {
    slug: "urinary-bladder-care",
    title: "Urinary & Bladder Health Care",
    short:
      "Assessment and guidance for infections, urgency, frequency and bladder discomfort.",
    image: IMG.doctorConsultation,
    overview: [
      "Urinary and bladder concerns are common, and they range from straightforward to ones that deserve careful attention. The first job of care is to sort them out properly — through history, examination, and simple investigations where helpful.",
      "Care is then individual: practical guidance for what can be managed conservatively, and a clear, direct conversation about what needs further evaluation. No symptom is dismissed, and none is overstated.",
    ],
    whoShould: [
      "Patients with burning, frequency or painful urination",
      "Those with urgency, leakage or sleep disruption from urination",
      "People with recurrent urinary symptoms",
      "Patients who'd like an old report or infection history reviewed",
    ],
    involves: [
      "A careful mapping of your symptoms — timing, triggers and patterns",
      "Review of your history and any past infections or treatments",
      "Guidance on a urine examination or other evaluation where relevant",
      "Clear, practical guidance for your specific situation",
      "A direct plan for follow-up if symptoms persist",
    ],
    faqs: [
      {
        q: "Will I need antibiotics?",
        a: "Only where an evaluation supports it. Not every urinary symptom is an infection, which is why proper assessment comes first.",
      },
      {
        q: "How long should I wait before consulting?",
        a: "If symptoms persist beyond a few days, or if you see blood or have fever, don't wait — book a consultation.",
      },
      {
        q: "Can I discuss female urinary concerns here?",
        a: "Absolutely. Urology covers urinary health for all patients, and every patient is treated with the same respect.",
      },
    ],
  },
];

export const getTreatment = (slug: string) =>
  treatments.find((t) => t.slug === slug);

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  no: string;
  title: string;
  text: string;
  image: string;
  points: string[];
};

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Book Your Consultation",
    text: "Choose a convenient consultation option.",
    image: PHOTO.checkup,
    points: [
      "Call 7004553815 or use the online form",
      "Share your main concern in a line or two",
      "A convenient time is confirmed with you",
    ],
  },
  {
    no: "02",
    title: "Discuss Your Concern",
    text: "Talk openly about your health concerns.",
    image: PHOTO.assessment,
    points: [
      "A private, unhurried one-to-one conversation",
      "Your symptoms, history and questions, fully heard",
      "Sensitive concerns are completely welcome",
    ],
  },
  {
    no: "03",
    title: "Understand Your Care",
    text: "Receive appropriate professional guidance.",
    image: PHOTO.care,
    points: [
      "Findings explained in simple, plain language",
      "Investigations suggested only where relevant",
      "An agreed, pressure-free path forward",
    ],
  },
  {
    no: "04",
    title: "Continue Your Journey",
    text: "Follow the recommended next steps.",
    image: PHOTO.followup,
    points: [
      "Clear instructions you can follow at home",
      "Follow-up where your concern needs it",
      "A number to call whenever you're unsure",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */

export const homeFaqs: Faq[] = [
  { q:"Can kidney stones really be managed without surgery?", a:"Yes — for stones up to 8mm, the right diet, hydration protocol, and lifestyle changes can dissolve and flush out stones naturally. Our 96% success rate across 500+ patients confirms this. For larger stones, our experts will give you an honest, medically guided assessment." },
  { q:"How is a Zivra assessment different from seeing a regular doctor?", a:"A Zivra assessment collects detailed information about your stone type, lifestyle, diet, and symptoms — and uses that to build a personalised care pathway. Think of it as the bridge between your doctor's diagnosis and your daily life. We don't replace your doctor; we complement their treatment." },
  { q:"How quickly do I receive my personalised care plan?", a:"Within 24 hours of completing your health assessment and expert review, you will receive your personalised care plan directly via WhatsApp and email." },
  { q:"Is the guidance safe? Will you recommend medicines?", a:"Zivra provides evidence-based dietary and lifestyle guidance reviewed by qualified doctors. Some natural supplements may be recommended. We never prescribe pharmaceutical drugs — that remains with your licensed physician." },
  { q:"What if my stone is larger than 8mm?", a:"Our experts will review your case honestly. If surgery is genuinely required, we will tell you clearly and help you prepare. We will never recommend against medically necessary surgery." },
  { q:"Is Hindi support available?", a:"Yes. Our team is fully bilingual. You can complete your assessment, consult with our experts, and receive your care plan entirely in Hindi if preferred." },
];

export const faqCategories: { id: string; title: string; blurb: string; items: Faq[] }[] = [
  {
    id: "consultation",
    title: "Consultation",
    blurb: "Booking, preparation and what to expect.",
    items: [
      {
        q: "How can I book a consultation?",
        a: `Call ${site.phone} or use the Book Consultation form on this website. Our team will confirm a convenient time with you.`,
      },
      {
        q: "What should I bring to my appointment?",
        a: "Previous reports, test results or prescriptions related to your concern, and a list of medicines you currently take.",
      },
      {
        q: "Do I need a referral to see a urologist?",
        a: "No referral is needed. You can book a urology consultation directly.",
      },
      {
        q: "Can I book a consultation for a family member?",
        a: "Yes. You may book on their behalf and note the patient's details in the form or over the phone.",
      },
    ],
  },
  {
    id: "urological-health",
    title: "Urological Health",
    blurb: "Common questions about urological concerns.",
    items: [
      {
        q: "When should I consult a urologist?",
        a: "For persistent urinary symptoms, pain, blood in urine, or concerns about kidney, prostate or bladder health. Early consultation is always better than waiting for a symptom to worsen.",
      },
      {
        q: "Is blood in urine always serious?",
        a: "It can have treatable causes, but it should never be ignored. Blood in urine is a clear reason to book a consultation.",
      },
      {
        q: "What are early signs of kidney stones?",
        a: "Sudden severe pain in the side or back, blood in urine, burning while urinating, or pain that moves toward the groin. A history of stones also raises awareness.",
      },
      {
        q: "At what age do prostate concerns usually begin?",
        a: "Prostate changes often become noticeable in the 50s and 60s, but symptoms can appear earlier. Any persistent urinary change deserves a consultation.",
      },
    ],
  },
  {
    id: "clinic",
    title: "Clinic",
    blurb: "Location, privacy and practice details.",
    items: [
      {
        q: "Where is ZivRA HEALTH located?",
        a: `${site.address}. You can open the location in Google Maps from the Contact page.`,
      },
      {
        q: "Is my information kept confidential?",
        a: "Yes. Privacy is central to urological care, and everything discussed in consultation is treated with confidentiality.",
      },
      {
        q: "Do you see female patients?",
        a: "Yes. Urology covers conditions for all patients, and every patient is treated with the same respect and privacy.",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    blurb: "A few things worth knowing.",
    items: [
      {
        q: "What if my concern is urgent?",
        a: "If you have severe pain, fever with urinary symptoms, or an inability to pass urine, please seek immediate medical attention at the nearest emergency facility rather than waiting for a routine consultation.",
      },
      {
        q: "Does ZivRA HEALTH provide follow-up?",
        a: "Yes. Where a concern needs continued guidance, follow-up is an integral part of the care plan.",
      },
      {
        q: "Does this website provide diagnosis or treatment?",
        a: "No. The content on this website is for general information only. Diagnosis and treatment happen through a proper consultation with Dr. Adeel.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Patient stories — intentionally empty.                             */
/*  Add genuine, consented stories here. No fabricated reviews.        */
/* ------------------------------------------------------------------ */

export type Story = {
  name: string; // first name only
  quote: string;
  category: string;
  image?: string;
};

export const patientStories: Story[] = [
  { name:"Ramesh Kumar", category:"Kidney Stones", quote:"Had an 8mm stone and was told surgery was my only option. I tried Zivra as a last resort. 3 months later my ultrasound showed nothing. My urologist was genuinely surprised." },
  { name:"Sunita Deshpande", category:"Kidney Stones", quote:"I used to wake up in severe pain at night and end up in emergency. Zivra's plan changed my diet. The WhatsApp guidance was daily and personal. By week 6, scan was clear." },
  { name:"Arjun Patel", category:"Kidney Stones", quote:"Second stone in 3 years. First time I had surgery — they removed the stone but never told me why it formed. Zivra showed me exactly what was causing it. 4 months later, gone." },
  { name:"Priya Sharma", category:"Kidney Stones", quote:"Kidney stone during pregnancy is terrifying. Surgery was not possible. Zivra's team coordinated with my OB and created a pregnancy-safe diet protocol. 8 weeks — resolved completely." },
];

export const disclaimer =
  "The content on this website is for general information only and is not a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of a qualified healthcare provider with any questions about a medical condition.";
