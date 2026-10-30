import React from 'react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

interface SocialBadgeItem {
  id: string;
  name: string;
  href: string;
  gradient: string;
  glowColor: string;
  baseShadow: string;
  cursorLabel: string;
  ariaLabel: string;
  svg: React.ReactNode;
}

export function ClaymorphicSocialBadges() {
  const socialItems: SocialBadgeItem[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: portfolio.links.whatsapp,
      gradient: 'linear-gradient(135deg, #2ae878 0%, #25D366 50%, #128C7E 100%)',
      glowColor: 'rgba(37, 211, 102, 0.55)',
      baseShadow: `
        inset -6px -6px 12px rgba(0, 0, 0, 0.45),
        inset -2px -2px 5px rgba(0, 0, 0, 0.35),
        inset 5px 5px 10px rgba(255, 255, 255, 0.45),
        inset 2px 2px 3px rgba(255, 255, 255, 0.6),
        0 14px 28px -4px rgba(37, 211, 102, 0.45),
        0 8px 14px -4px rgba(0, 0, 0, 0.65)
      `,
      cursorLabel: 'WHATSAPP',
      ariaLabel: 'Chat directly with Adarsh Panda on WhatsApp',
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: portfolio.links.instagram,
      gradient: 'linear-gradient(135deg, #833ab4 0%, #c13584 30%, #e1306c 55%, #fd1d1d 75%, #f56040 90%, #fcb045 100%)',
      glowColor: 'rgba(245, 96, 64, 0.55)',
      baseShadow: `
        inset -6px -6px 12px rgba(0, 0, 0, 0.45),
        inset -2px -2px 5px rgba(0, 0, 0, 0.35),
        inset 5px 5px 10px rgba(255, 255, 255, 0.45),
        inset 2px 2px 3px rgba(255, 255, 255, 0.6),
        0 14px 28px -4px rgba(225, 48, 108, 0.45),
        0 8px 14px -4px rgba(0, 0, 0, 0.65)
      `,
      cursorLabel: 'INSTAGRAM',
      ariaLabel: 'Follow Adarsh Panda on Instagram',
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-none stroke-white stroke-[2] stroke-linecap-round stroke-linejoin-round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      id: 'github',
      name: 'GitHub',
      href: portfolio.links.github,
      gradient: 'linear-gradient(135deg, #3c4450 0%, #24292e 50%, #0d1117 100%)',
      glowColor: 'rgba(255, 255, 255, 0.35)',
      baseShadow: `
        inset -6px -6px 12px rgba(0, 0, 0, 0.55),
        inset -2px -2px 5px rgba(0, 0, 0, 0.45),
        inset 5px 5px 10px rgba(255, 255, 255, 0.35),
        inset 2px 2px 3px rgba(255, 255, 255, 0.5),
        0 14px 28px -4px rgba(0, 0, 0, 0.7),
        0 8px 14px -4px rgba(0, 0, 0, 0.8)
      `,
      cursorLabel: 'GITHUB',
      ariaLabel: 'View Adarsh Panda’s repositories on GitHub',
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: portfolio.links.linkedin,
      gradient: 'linear-gradient(135deg, #0288d1 0%, #0077b5 50%, #004b79 100%)',
      glowColor: 'rgba(0, 119, 181, 0.55)',
      baseShadow: `
        inset -6px -6px 12px rgba(0, 0, 0, 0.45),
        inset -2px -2px 5px rgba(0, 0, 0, 0.35),
        inset 5px 5px 10px rgba(255, 255, 255, 0.45),
        inset 2px 2px 3px rgba(255, 255, 255, 0.6),
        0 14px 28px -4px rgba(0, 119, 181, 0.45),
        0 8px 14px -4px rgba(0, 0, 0, 0.65)
      `,
      cursorLabel: 'LINKEDIN',
      ariaLabel: 'Connect with Adarsh Panda on LinkedIn',
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      ),
    },
    {
      id: 'gmail',
      name: 'Gmail',
      href: `mailto:${portfolio.email}`,
      gradient: 'linear-gradient(135deg, #ff5747 0%, #EA4335 50%, #b31412 100%)',
      glowColor: 'rgba(234, 67, 53, 0.55)',
      baseShadow: `
        inset -6px -6px 12px rgba(0, 0, 0, 0.45),
        inset -2px -2px 5px rgba(0, 0, 0, 0.35),
        inset 5px 5px 10px rgba(255, 255, 255, 0.45),
        inset 2px 2px 3px rgba(255, 255, 255, 0.6),
        0 14px 28px -4px rgba(234, 67, 53, 0.45),
        0 8px 14px -4px rgba(0, 0, 0, 0.65)
      `,
      cursorLabel: 'GMAIL',
      ariaLabel: 'Send email to Adarsh Panda (ada203880@gmail.com)',
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  /* 3D Cursor Tracking Tilt & Dynamic Shadow Logic */
  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    sound.playHover();
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.style.animationPlayState = 'paused';
    }
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLAnchorElement>,
    glowColor: string
  ) => {
    const el = e.currentTarget;
    if (el.parentElement && el.parentElement.style.animationPlayState !== 'paused') {
      el.parentElement.style.animationPlayState = 'paused';
    }
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Relative offset range: -1 to +1
    const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

    // Dynamic 3D tilt up to 25 degrees
    const rotateX = -normY * 25;
    const rotateY = normX * 25;

    // Dynamic shadow displaced in opposite direction away from the mouse pointer
    const shadowX = -normX * 18;
    const shadowY = -normY * 18 + 18;

    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.12, 1.12, 1.12)`;
    el.style.boxShadow = `
      inset -6px -6px 12px rgba(0, 0, 0, 0.5),
      inset -2px -2px 5px rgba(0, 0, 0, 0.4),
      inset 5px 5px 10px rgba(255, 255, 255, 0.5),
      inset 2px 2px 3px rgba(255, 255, 255, 0.7),
      ${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 32px -2px ${glowColor},
      ${(shadowX * 0.4).toFixed(1)}px ${(shadowY * 0.4).toFixed(1)}px 16px -2px rgba(0, 0, 0, 0.7)
    `;
  };

  const handlePointerLeave = (
    e: React.PointerEvent<HTMLAnchorElement>,
    baseShadow: string
  ) => {
    const el = e.currentTarget;
    if (el.parentElement) {
      el.parentElement.style.animationPlayState = 'running';
    }
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.boxShadow = baseShadow;
  };

  return (
    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5 py-2">
      {socialItems.map((item, index) => (
        <div
          key={item.id}
          className="relative group transition-all duration-300"
          style={{
            /* Staggered idle vertical floating animation across the row */
            animation: 'clayFloat 3.8s ease-in-out infinite',
            animationDelay: `${index * 0.22}s`,
          }}
        >
          {/* Apple Squircle 3D App Icon Badge (22.5% corner radius) */}
          <a
            href={item.href}
            target={item.id === 'gmail' ? undefined : '_blank'}
            rel={item.id === 'gmail' ? undefined : 'noreferrer'}
            data-cursor={item.cursorLabel}
            aria-label={item.ariaLabel}
            title={item.name}
            onClick={() => sound.playClick()}
            onPointerEnter={handlePointerEnter}
            onPointerMove={(e) => handlePointerMove(e, item.glowColor)}
            onPointerLeave={(e) => handlePointerLeave(e, item.baseShadow)}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 transition-transform duration-150 ease-out select-none cursor-pointer"
            style={{
              borderRadius: '22.5%',
              background: item.gradient,
              boxShadow: item.baseShadow,
              border: '1px solid rgba(255, 255, 255, 0.28)',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              willChange: 'transform, box-shadow',
            }}
          >
            {/* Extruded Inner Vector SVG Logo (transform: translateZ(20px) + soft drop-shadow) */}
            <div
              className="pointer-events-none flex items-center justify-center transition-transform duration-150"
              style={{
                transform: 'translateZ(20px)',
                filter:
                  'drop-shadow(0 8px 10px rgba(0, 0, 0, 0.45)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))',
                transformStyle: 'preserve-3d',
              }}
            >
              {item.svg}
            </div>

            {/* Subtle gloss reflection overlay across upper corner */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
              style={{
                borderRadius: '22.5%',
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
              }}
            />
          </a>

          {/* Micro platform label below for accessibility & instant identification */}
          <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-[9px] tracking-wider text-zinc-400 whitespace-nowrap">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
