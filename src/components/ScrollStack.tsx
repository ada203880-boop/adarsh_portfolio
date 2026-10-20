import { portfolio } from "../data/portfolio";
import { useEffect, useRef, useState } from "react";

// Derive typed entries from the actual portfolio.skills object
type SkillEntry = { category: string; skills: readonly string[] };
const skillEntries: SkillEntry[] = Object.entries(portfolio.skills).map(
    ([category, skills]) => ({ category, skills })
);

export function ScrollStack() {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        function onScroll() {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = el.offsetHeight;
            const visible = window.innerHeight + 150;
            const start = top - visible;
            const end = top + height - window.innerHeight;

            let p = 0;

            if (window.scrollY >= start && end > start) {
                p = (window.scrollY - start) / (end - start);
                p = Math.max(0, Math.min(1, p));
            }

            setProgress(p);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const items = skillEntries;

    return (
        <div
            ref={ref}
            className="scroll-stack relative mx-auto w-full max-w-[580px]"
        >
            <div
                className="sticky top-40"
                style={{ height: items.length * 80 + 280 }}
            >
                {items.map((item, i) => {
                    const indexOffset = i * 68;
                    const cardVisible = i * 10 <= progress * 120;
                    const textVisible = i * 5 <= progress * 100;

                    return (
                        <div
                            key={item.category}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ top: indexOffset }}
                        >
                            {/* Skill card */}
                            <div
                                className="skill-card relative w-[90%] rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl sm:w-[85%] sm:p-8"
                                style={{
                                    transition: "transform .7s ease-out, opacity .5s ease-out",
                                    transform: cardVisible
                                        ? "translateY(0) rotateX(0)"
                                        : "translateY(50px) rotateX(12deg)",
                                    opacity: textVisible ? 1 : 0.35,
                                }}
                            >
                                {/* Animated border glow */}
                                <div
                                    className="pointer-events-none absolute -inset-[1px] rounded-2xl"
                                    style={{
                                        background:
                                            `conic-gradient(from calc(90deg + ${120 * i}deg), transparent 0%, #6d7ba1 25%, #7444ed 55%, #5ee4ff 65%, transparent 100%)`,
                                        opacity: i <= 3 ? Math.min(1, progress * 3) : 0,
                                        transition: "opacity .3s ease-out",
                                    }}
                                />

                                {/* Inner glow */}
                                <div
                                    className="pointer-events-none absolute inset-[-1px] rounded-2xl"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 20% 40%, rgba(109, 123, 161, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(20, 190, 255, 0.12) 0%, transparent 55%)",
                                        opacity: i <= 3 ? Math.min(0.9, progress * 2.5) : 0,
                                        transition: "opacity .4s ease-out .1s",
                                    }}
                                />

                                {/* Skill content */}
                                <div className="relative z-20 flex flex-col gap-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold tracking-[.12em] text-white uppercase">
                                            {item.category}
                                        </h3>
                                        <span
                                            className="text-[9px] font-mono tracking-[.16em] text-white/30"
                                            style={{
                                                opacity: i <= 4 ? Math.min(1, progress * 2.5) : 0.3,
                                            }}
                                        >
                                            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Skills pill list */}
                                    <div
                                        className="flex flex-wrap gap-2"
                                        style={{
                                            opacity: i <= 2 ? Math.min(1, progress * 3) : 0.5,
                                            transition: "opacity .3s ease .1s",
                                        }}
                                    >
                                        {item.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] tracking-[.08em] text-white/70"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ScrollStack;