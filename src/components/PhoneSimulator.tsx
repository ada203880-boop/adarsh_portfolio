import { useState, useEffect } from 'react';
import {
  ExternalLink, ShieldCheck, Wifi, BatteryCharging, Signal,
  Search, ShoppingCart, Pill, Upload, CheckCircle2, RefreshCw
} from 'lucide-react';
import { sound } from '../lib/sound';
import rmhScreenshot from '../assets/rmh-screenshot.png';

interface PhoneSimulatorProps {
  url?: string;
  title?: string;
}

export function PhoneSimulator({
  url = 'https://rabindramedicalhall.in',
  title = 'Rabindra Medical Hall',
}: PhoneSimulatorProps) {
  const [time, setTime] = useState('09:41');
  const [cartCount, setCartCount] = useState(2);
  const [uploadedRx, setUploadedRx] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    sound.playClick();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleRxUpload = () => {
    sound.playSuccess();
    setUploadedRx(true);
    setTimeout(() => setUploadedRx(false), 3500);
  };

  const handleAddToCart = () => {
    sound.playClick();
    setCartCount((c) => c + 1);
  };

  const categories = ['All', 'Prescription Rx', 'OTC Care', 'Vitamins', 'Ayurveda', 'Baby Care'];

  return (
    <div className="flex flex-col items-center justify-center p-0 sm:p-2 select-none w-full max-w-full">
      {/* Smartphone Outer Chassis with 3D Bevel and Depth */}
      <div className="relative mx-auto w-full max-w-[305px] min-[390px]:max-w-[340px] sm:max-w-[370px] rounded-[36px] sm:rounded-[48px] border-[6px] sm:border-[10px] border-[#161726] bg-[#03060c] p-1.5 sm:p-2 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.18)] ring-1 ring-white/10">
        
        {/* Hardware side button accents */}
        <div className="absolute -left-[10px] sm:-left-[13px] top-24 h-9 w-[3px] rounded-l bg-zinc-700" />
        <div className="absolute -left-[10px] sm:-left-[13px] top-36 h-12 w-[3px] rounded-l bg-zinc-700" />
        <div className="absolute -left-[10px] sm:-left-[13px] top-52 h-12 w-[3px] rounded-l bg-zinc-700" />
        <div className="absolute -right-[10px] sm:-right-[13px] top-28 h-16 w-[3px] rounded-r bg-zinc-700" />

        {/* Inner Phone Screen */}
        <div className="relative flex flex-col h-[520px] min-[390px]:h-[580px] sm:h-[620px] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#f8fafc] text-zinc-900">
          
          {/* Top Status Bar with Dynamic Island */}
          <div className="relative z-30 flex items-center justify-between bg-black px-6 pt-2 pb-1 text-[11px] font-medium text-white select-none">
            <span className="font-mono text-[11px] tracking-tight">{time}</span>

            {/* Dynamic Island Notch */}
            <div className="flex items-center gap-1.5 rounded-full bg-[#11131f] px-3 py-1 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-300 font-semibold tracking-wider">RMH LIVE</span>
            </div>

            <div className="flex items-center gap-1.5 text-white/80">
              <Signal size={12} />
              <Wifi size={12} />
              <BatteryCharging size={13} className="text-emerald-400" />
            </div>
          </div>

          {/* Browser Address Bar with One-Click Direct Link */}
          <div className="relative z-20 flex items-center justify-between gap-2 border-b border-white/10 bg-[#0d0f1e] px-3 py-2 text-white">
            <div className="flex flex-1 items-center gap-1.5 overflow-hidden rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px]">
              <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
              <span className="truncate font-mono text-[10px] text-zinc-300">
                https://rabindramedicalhall.in
              </span>
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition"
                title="Reload"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin text-cyan-400' : ''} />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300 hover:bg-emerald-500/30 transition"
                title="Open live site in new tab"
              >
                <span>OPEN</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Interactive Mobile Storefront Viewport */}
          <div className="relative flex-1 w-full overflow-y-auto bg-slate-50 text-slate-800 scrollbar-none">
            {/* Storefront Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3.5 py-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-sm">
                    <Pill size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Rabindra Medical Hall</h4>
                    <p className="text-[9px] text-emerald-700 font-medium">Licensed Pharmacy · Fast Delivery</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => sound.playClick()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                    aria-label="View Cart"
                  >
                    <ShoppingCart size={15} />
                  </button>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                <Search size={13} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search medicines, vitamins, baby care..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Interactive Prescription Upload Banner */}
            <div className="m-3 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 p-3.5 text-white shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded bg-emerald-500/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100">
                    Fast Rx Fulfillment
                  </span>
                  <h5 className="mt-1 text-xs font-bold text-white leading-tight">Upload Doctor's Prescription</h5>
                  <p className="mt-0.5 text-[10px] text-emerald-100/90 leading-tight">
                    Get Schedule-H medicines delivered safely to your doorstep.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRxUpload}
                  className="shrink-0 rounded-xl bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-800 shadow transition hover:bg-emerald-50 active:scale-95 flex items-center gap-1"
                >
                  {uploadedRx ? (
                    <>
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      <span>Uploaded!</span>
                    </>
                  ) : (
                    <>
                      <Upload size={12} />
                      <span>Upload Rx</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 px-3 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    sound.playHover();
                  }}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition ${
                    activeCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Storefront Screenshot Visual Anchor */}
            <div className="px-3 py-1">
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm relative group">
                <img
                  src={rmhScreenshot}
                  alt={title}
                  className="w-full h-auto object-cover object-top"
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-bold text-white"
                >
                  <span>Explore Live Store</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Featured Fast-Moving Medicines Grid */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
                  Common Healthcare Essentials
                </h5>
                <span className="text-[9px] font-semibold text-emerald-600">IN STOCK</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Dolo 650mg Tablets', pack: 'Strip of 15', price: '₹34', mrp: '₹40' },
                  { name: 'Multivitamin Immunity Capsules', pack: 'Bottle of 30', price: '₹220', mrp: '₹260' },
                  { name: 'Electral ORS Energy Drink', pack: '21.8g Sachet', price: '₹22', mrp: '₹25' },
                  { name: 'Fast Gel Pain Relief', pack: '30g Tube', price: '₹95', mrp: '₹115' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm"
                  >
                    <div>
                      <div className="h-2 w-8 rounded-full bg-emerald-100 mb-1" />
                      <p className="text-[10px] font-bold text-slate-800 leading-tight">{item.name}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{item.pack}</p>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-1.5">
                      <div>
                        <span className="text-xs font-bold text-emerald-700">{item.price}</span>
                        <span className="ml-1 text-[9px] text-slate-400 line-through">{item.mrp}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm hover:bg-emerald-500 active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Guarantee Badge */}
            <div className="px-3 pb-4">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-2.5 text-[10px] text-slate-600">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>100% Genuine Medicines · Sealed Packaging · Licensed Pharmacist Verified</span>
              </div>
            </div>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="relative z-20 flex h-5 w-full items-center justify-center bg-black">
            <div className="h-1 w-28 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* Simulator Caption with Verified Link */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[370px] px-2 text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE PRODUCTION E-PHARMACY
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
        >
          Launch Website <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
