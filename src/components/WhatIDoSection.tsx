import { useState } from 'react';
import {
  Globe, Code2, Server, ShoppingCart, Wrench, Database,
  Sparkles, CheckCircle2, MessageSquare
} from 'lucide-react';
import { sound } from '../lib/sound';
import { SpotlightCard } from './SpotlightCard';
import { BlurFadeText } from './BlurFadeText';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  icon: typeof Globe;
  problem: string;
  deliverables: string[];
  scope: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'responsive-web',
    num: '01',
    icon: Globe,
    title: 'Responsive Website Development',
    problem:
      'Many businesses have outdated websites that look broken on mobile devices, load slowly, or fail to convert visitors into inquiries.',
    deliverables: [
      'Mobile-first, responsive layouts tailored for mobile, tablet, and desktop',
      'Clean semantic HTML5, modern CSS/Tailwind, and fast asset loading',
      'Contact forms, Google Analytics / telemetry setup, and SEO-friendly metadata',
    ],
    scope: 'Ideal for small businesses, agencies, and professionals needing a credible web presence.',
  },
  {
    id: 'frontend-ui',
    num: '02',
    icon: Code2,
    title: 'Frontend Interface Development',
    problem:
      'Product teams and founders often have backend services or design files (Figma) but lack dedicated frontend engineering to build accessible, interactive web apps.',
    deliverables: [
      'Modular React.js / TypeScript component architectures',
      'Responsive state management, modal dialogues, and interactive filters',
      'Cross-browser tested interfaces compliant with accessibility best practices',
    ],
    scope: 'Ideal for startups, SaaS products, and digital agencies needing reliable frontend execution.',
  },
  {
    id: 'fullstack-apps',
    num: '03',
    icon: Server,
    title: 'Full-Stack Web Applications',
    problem:
      'Building bespoke internal tools, customer portals, or interactive platforms requires end-to-end engineering across the frontend, API, and database.',
    deliverables: [
      'Single-page application (SPA) connected to Node.js / Express or Python backend',
      'User authentication, session handling, and protected route authorization',
      'Persistent database schemas and clean REST API endpoint integrations',
    ],
    scope: 'Best suited for custom software tools, dashboard prototypes, and data workflows.',
  },
  {
    id: 'woocommerce-wp',
    num: '04',
    icon: ShoppingCart,
    title: 'WordPress & WooCommerce Customization',
    problem:
      'Off-the-shelf e-commerce templates rarely match unique business workflows like customized medicine inquiries, bespoke checkout forms, or local dispatch alerts.',
    deliverables: [
      'Tailored WooCommerce catalog setup and category architecture',
      'Custom PHP checkout filters, file-upload fields, and inquiry gating',
      'Automated order alerts via WhatsApp or email webhooks for retail teams',
    ],
    scope: 'Ideal for retail stores, boutique merchants, and pharmacies modernizing order operations.',
  },
  {
    id: 'maintenance-perf',
    num: '05',
    icon: Wrench,
    title: 'Website Maintenance & Performance Optimization',
    problem:
      'Existing websites frequently suffer from slow loading times, broken plugins, mobile layout shifts, or out-of-date dependencies.',
    deliverables: [
      'Performance audit addressing image compression, layout shifts, and caching',
      'Bug fixes, responsive styling repairs, and broken navigation correction',
      'Security review, dependency updates, and automated backup routines',
    ],
    scope: 'Suitable for business owners who want their existing website to stay fast and secure.',
  },
  {
    id: 'api-database',
    num: '06',
    icon: Database,
    title: 'API & Database Integration',
    problem:
      'Applications need to store structured user data safely and communicate reliably with third-party APIs or internal services.',
    deliverables: [
      'Normalized MySQL relational schema design with proper keys and indexes',
      'Structured REST API design with JSON schema validation and error handling',
      'Integration with external webhooks, email providers, or cloud APIs',
    ],
    scope: 'Ideal for teams needing robust backend data models and predictable API integrations.',
  },
];

export function WhatIDoSection() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);

  return (
    <section id="services" className="relative bg-[#07060f] py-28 text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-violet-950/[0.1] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-violet-400 uppercase">
              <Sparkles size={13} />
              <span>02 // SERVICES FOR CLIENTS</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              <BlurFadeText text="Practical Development Services" delay={100} />{' '}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-400">
                <BlurFadeText text="Tailored for Real Needs." delay={300} />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed">
            Delivering clean, dependable development solutions for companies, founders, and local businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedService === s.id;

            return (
              <SpotlightCard
                key={s.id}
                onClick={() => {
                  setSelectedService(s.id);
                  sound.playHover();
                }}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 cursor-pointer ${isSelected
                    ? 'border-violet-500/40 bg-violet-950/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                    : 'border-white/[0.08] bg-[#0c0a1d]/60 hover:border-violet-500/25 hover:bg-[#0c0a1d]'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-950/30 text-violet-300">
                      <Icon size={17} />
                    </span>
                    <span className="font-mono text-xs text-zinc-500">{s.num}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
                  <p className="mt-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    {s.problem}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-violet-300">
                      What You Receive:
                    </div>
                    {s.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 font-light">
                        <CheckCircle2 size={13} className="text-violet-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/[0.06] pt-3 text-[10px] font-mono text-zinc-500">
                  <span>Scope: {s.scope}</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Prominent Client Conversion Call to Action */}
        <div className="mt-14 rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-950/30 via-[#0d0b22] to-violet-950/20 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-light text-white">
              Have a project in mind?{' '}
              <span className="font-medium text-violet-300">Let's discuss it.</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
              Whether you need a custom business website, WooCommerce customization, or frontend application engineering, I'm available to review requirements and propose practical solutions.
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            <MessageSquare size={14} />
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
