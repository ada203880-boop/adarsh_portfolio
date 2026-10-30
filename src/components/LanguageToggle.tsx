import { useI18n } from '../lib/useI18n';
import { sound } from '../lib/sound';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useI18n();

  return (
    <button
      type="button"
      onClick={() => {
        sound.playClick();
        toggleLanguage();
      }}
      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-300 hover:border-cyan-400/40 hover:text-white transition-all backdrop-blur-md"
      title="Switch Language (English / हिन्दी)"
    >
      <Languages size={12} className="text-cyan-400" />
      <span>{language === 'en' ? 'EN 🇬🇧' : 'हिन्दी 🇮🇳'}</span>
    </button>
  );
}
