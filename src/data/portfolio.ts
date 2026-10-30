export const portfolio = {
  name: 'ADARSH PANDA',
  title: 'Full-Stack Developer',
  specialization: 'JavaScript • React.js • Python • Node.js • Express.js',
  location: 'Bhubaneswar, Odisha',
  phone: '+91 9861054025',
  email: 'ada203880@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/adarsh-panda-5181b9214',
    github: 'https://github.com/ada203880-boop',
    instagram: 'https://www.instagram.com/__a_._d_._i__?srtk=MWpwd2IwczBqaHN2eA==',
    whatsapp: 'https://wa.me/919861054025?text=Hi%20Adarsh!%20I%20reviewed%20your%20portfolio.%20How%20can%20you%20help%20me%3F',
    portfolio: 'https://ada203880-boop.github.io/adarsh_portfolio/',
  },
  summary:
    'Computer Science graduate and Full-Stack Developer with hands-on experience building responsive, database-driven web applications and e-commerce platforms using JavaScript, Python, Node.js, Express.js, PHP, MySQL, WordPress and WooCommerce. Experienced in developing REST APIs, authentication, database workflows and end-to-end application features, with a strong focus on reliability, security and user experience.',
  skills: {
    Languages: ['JavaScript', 'Python', 'Java', 'C++', 'PHP'],
    Frontend: ['HTML5', 'CSS3', 'React.js', 'Responsive Web Design'],
    Backend: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Input Validation'],
    'Databases & CMS': ['MySQL', 'SQL', 'DBMS', 'WordPress', 'WooCommerce'],
    'Data & AI': ['Pandas', 'NumPy', 'Machine Learning', 'AI Integration'],
    'Tools & Cloud': ['Git', 'GitHub', 'VS Code', 'AWS Fundamentals'],
  },
  projects: [
    {
      id: 'rmh',
      number: '01',
      name: 'Rabindra Medical Hall',
      subtitle: 'E-Pharmacy Website',
      stack: 'WordPress • WooCommerce • PHP • JavaScript • MySQL',
      points: [
        'Engineered a responsive e-pharmacy storefront on an existing WooCommerce backend while preserving product, customer and order data.',
        'Developed end-to-end medicine purchasing workflows covering product categories, cart, checkout, order processing and prescription-required products.',
        'Implemented prescription-upload validation and ordering safeguards to improve compliance and reduce invalid submissions.',
        'Integrated WhatsApp-based order notifications and performed end-to-end QA across product, cart, checkout and order workflows.',
      ],
    },
    {
      id: 'forge',
      number: '02',
      name: 'FORGE Fitness',
      subtitle: 'AI-Powered Health Platform',
      stack: 'JavaScript • Python • REST APIs • MySQL • AI Integration',
      points: [
        'Developed a feature-rich fitness application covering authentication, workout tracking, nutrition planning and recovery insights.',
        'Implemented REST API integrations, persistent data models, background processing and structured database migrations.',
        'Integrated AI-powered contextual fitness coaching and multimodal analysis using structured JSON configurations and offline fallback handling.',
        'Built data synchronization and reliability mechanisms for interactive health and fitness workflows.',
      ],
    },
  ],
  education: [
    { title: 'B.Tech in Computer Science and Engineering', period: '2021–2025', institution: 'CV Raman Global University', location: 'Bhubaneswar, Odisha', detail: 'CGPA: 7.6/10', coursework: 'Data Structures • Object-Oriented Programming (OOPS) • DBMS • Operating Systems' },
    { title: 'Intermediate — Class XII', period: '2018–2020', institution: 'Suddhananda Vidyalaya', location: 'Cuttack, Odisha' },
  ],
  certifications: [
    'Practical Cyber Security for Cyber Security Practitioners — NPTEL, IIT Kanpur',
    'Industrial Training in Data Science — LearnWik Solutions Pvt. Ltd.',
    'Palo Alto Networks Cloud Security Fundamentals — Palo Alto Networks via Coursera',
    'Foundations of User Experience (UX) Design — Google via Coursera',
  ],
} as const;
