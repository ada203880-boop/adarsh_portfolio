import { GraduationCap, Layers3, BriefcaseBusiness, Award, Code2, Mail } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { RadialOrbitalTimeline } from './ui/radial-orbital-timeline';

export function ExperienceSection() {
  const p = portfolio;
  const items = [
    { id: 'profile', title: 'Profile', date: 'NOW', category: 'PROFILE', icon: <Code2 size={16} />, relatedIds: ['education', 'skills'], content: 'Computer Science graduate and Full-Stack Developer focused on reliable, responsive and database-driven applications.' },
    { id: 'education', title: 'Education', date: '2021–2025', category: 'EDUCATION', icon: <GraduationCap size={16} />, relatedIds: ['profile', 'skills'], content: `${p.education[0].institution} · ${p.education[0].detail}` },
    { id: 'skills', title: 'Full-Stack', date: 'CORE', category: 'FULL-STACK', icon: <Layers3 size={16} />, relatedIds: ['education', 'rmh', 'forge'], content: 'JavaScript, React.js, Python, Node.js, Express.js, PHP, MySQL, WordPress and WooCommerce.' },
    { id: 'rmh', title: 'Rabindra Medical Hall', date: 'PROJECT 01', category: 'PROJECT', icon: <BriefcaseBusiness size={16} />, relatedIds: ['skills', 'forge'], content: p.projects[0].subtitle },
    { id: 'forge', title: 'FORGE Fitness', date: 'PROJECT 02', category: 'PROJECT', icon: <BriefcaseBusiness size={16} />, relatedIds: ['skills', 'rmh', 'certifications'], content: p.projects[1].subtitle },
    { id: 'certifications', title: 'Certifications', date: 'TRAINING', category: 'CERTIFICATIONS', icon: <Award size={16} />, relatedIds: ['forge', 'contact'], content: 'NPTEL IIT Kanpur, LearnWik Solutions, Palo Alto Networks via Coursera, and Google via Coursera.' },
    { id: 'contact', title: 'Contact', date: 'OPEN', category: 'CONTACT', icon: <Mail size={16} />, relatedIds: ['profile', 'certifications'], content: `${p.email} · ${p.location}` },
  ];
  return <section id="journey" className="bg-black px-5 py-24 text-white sm:px-8 lg:px-16"><div className="mx-auto max-w-7xl"><p className="mb-5 text-[10px] uppercase tracking-[.35em] text-white/40">03 / NAVIGATION UNIVERSE</p><h2 className="max-w-4xl text-5xl font-light tracking-[-.04em] sm:text-7xl">A journey built around <span className="text-white/35">systems, projects and growth.</span></h2><p className="mt-6 max-w-2xl text-sm leading-7 text-white/45">Explore the orbit to move through education, technical focus, projects, certifications and contact.</p><div className="mt-10"><RadialOrbitalTimeline items={items} /></div></div></section>;
}
