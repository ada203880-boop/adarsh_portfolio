import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Copy, Check, ArrowUpRight, Send, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolio.email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Recruiter/Client'}`);
    const body = encodeURIComponent(`Hi Adarsh,\n\n${msg}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#03060c] py-28 text-white">
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-cyan-600/[0.1] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>05 // INITIATE TRANSMISSION</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Let's Build Something <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                Extraordinary.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 py-2 font-mono text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>RADAR OPEN // READY FOR INTERVIEWS</span>
          </div>
        </div>

        {/* Transmission Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Direct Coordinates Deck */}
          <div className="space-y-4">
            {/* Email Copy Card */}
            <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-950/40 text-cyan-300">
                  <Mail size={18} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">PRIMARY DISPATCH</div>
                  <strong className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    {portfolio.email}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor="COPY"
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 font-mono text-xs text-white/70 hover:border-cyan-400 hover:text-cyan-300 transition"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>

                <a
                  href={`mailto:${portfolio.email}`}
                  data-cursor="MAIL"
                  onClick={() => sound.playClick()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 hover:border-cyan-400 hover:text-cyan-300 transition"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href={`tel:${portfolio.phone}`}
              data-cursor="CALL"
              onClick={() => sound.playClick()}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white/80 group-hover:text-cyan-400">
                  <Phone size={18} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">DIRECT LINE / WHATSAPP</div>
                  <strong className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    {portfolio.phone}
                  </strong>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={portfolio.links.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="PROFILE"
              onClick={() => sound.playHover()}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white/80 group-hover:text-cyan-400">
                  <Linkedin size={18} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">PROFESSIONAL NETWORK</div>
                  <strong className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    linkedin.com/in/adarsh-panda-5181b9214
                  </strong>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
            </a>

            {/* GitHub Card */}
            <a
              href={portfolio.links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="CODE"
              onClick={() => sound.playHover()}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white/80 group-hover:text-cyan-400">
                  <Github size={18} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">OPEN SOURCE WORKSPACE</div>
                  <strong className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    github.com/ada203880-boop
                  </strong>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
            </a>

            {/* Location Coordinate */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.01] p-6 font-mono text-xs text-zinc-400">
              <MapPin size={18} className="text-cyan-400" />
              <span>GEOLOCATION: Bhubaneswar, Odisha, India [IST +5:30]</span>
            </div>
          </div>

          {/* Right Column: Direct Transmission Form */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            <h3 className="text-2xl font-light tracking-tight text-white">Send Direct Dispatch</h3>
            <p className="mt-1 text-xs font-mono text-zinc-400">
              Fill out this quick form to automatically initiate an email draft with your notes.
            </p>

            <form onSubmit={handleSend} className="mt-8 space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins // Tech Recruiter"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  Message / Role Overview
                </label>
                <textarea
                  rows={4}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell me about the role, project, or collaboration..."
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="DISPATCH"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
              >
                Launch Transmission <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-28 border-t border-white/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} ADARSH PANDA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-cyan-400 transition">BACK TO TOP ↑</a>
            <span>•</span>
            <span>BUILT WITH REACT 19 & GSAP</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
