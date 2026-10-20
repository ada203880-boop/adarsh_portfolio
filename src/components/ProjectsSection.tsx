import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolio';

export function ProjectsSection() {
  return (
    <section id="work" className="bg-black px-5 py-24 text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] uppercase tracking-[.35em] text-white/40">02 / SELECTED WORK</p>
        <h2 className="mt-5 max-w-5xl text-5xl font-light tracking-[-.04em] sm:text-7xl">
          Two systems. <span className="text-white/35">Built end to end.</span>
        </h2>
        <div className="mt-16 space-y-24">
          {portfolio.projects.map((project) => (
            <article key={project.id} className="grid gap-10 border-t border-white/10 pt-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <div className="text-[10px] tracking-[.3em] text-white/30">PROJECT {project.number}</div>
                <h3 className="mt-5 text-4xl font-light sm:text-6xl">{project.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[.16em] text-white/40">{project.subtitle}</p>
              </div>
              <div>
                <div className="mb-7 flex items-center justify-between gap-6 border-b border-white/10 pb-4">
                  <span className="text-xs text-white/55">{project.stack}</span>
                  <span className="text-white/30">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <ul className="space-y-5">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-4 text-sm leading-7 text-white/55">
                      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-white/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
