export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    'hero.greeting': 'Namaste 🙏',
    'hero.name': "I'm Adarsh Panda",
    'hero.cta.work': 'Explore My Work',
    'hero.cta.contact': 'Contact Me',
    'hero.cta.resume': 'Resume (PDF)',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'status.available': 'AVAILABLE FOR HIRE // IMMEDIATE',
    'hire.target': 'Target Roles: Full-Stack / React / Node.js',
    'hire.location': 'Bhubaneswar, Odisha',
  },
  hi: {
    'hero.greeting': 'नमस्ते 🙏',
    'hero.name': 'मैं आदर्श पांडा हूँ',
    'hero.cta.work': 'मेरा काम देखें',
    'hero.cta.contact': 'संपर्क करें',
    'hero.cta.resume': 'रिज्यूमे (PDF)',
    'nav.home': 'होम',
    'nav.about': 'परिचय',
    'nav.skills': 'कौशल',
    'nav.projects': 'परियोजनाएं',
    'nav.contact': 'संपर्क',
    'status.available': 'कार्य के लिए उपलब्ध // तत्काल',
    'hire.target': 'लक्षित भूमिकाएं: फुल-स्टैक / रिएक्ट / नोड.जेएस',
    'hire.location': 'भुवनेश्वर, ओडिशा',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS['en'];

