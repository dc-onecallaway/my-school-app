import { useEffect, useState } from 'react';
import { PHONE, HERO_MODES, HERO_PHRASES, HERO_STATS, OFFLINE, wa } from '../data';
import Logo from './Logo';

export default function Hero({ openCb, quickEnroll }) {
  const [mode, setMode] = useState('offline');
  const [idx, setIdx] = useState(0);
  const [dim, setDim] = useState(false);

  useEffect(() => {
    let t;
    const id = setInterval(() => {
      setDim(true);
      t = setTimeout(() => { setIdx((i) => (i + 1) % HERO_PHRASES.length); setDim(false); }, 220);
    }, 2800);
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);

  const m = HERO_MODES[mode];
  const tab = (active) => `py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition ${active ? 'bg-yellow-400 text-amber-950 shadow-md' : 'text-amber-200 hover:text-white'}`;

  return (
    <section className="hero-gold-luxe text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex flex-wrap items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-yellow-200">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span>Offline Center: Sarojini Nagar, Lucknow • Live Interactive Online</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08]">
            Where Dedicated Mentorship Builds <span className="gradient-gold-title" style={{ opacity: dim ? 0.2 : 1 }}>{HERO_PHRASES[idx]}</span>
          </h1>
          <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed max-w-2xl">
            Experience structured academic excellence across our two specialized wings—<strong>Commerce Orbit × Tutors Hub</strong> (Class 11, 12 & CUET) and <strong>Maths Orbit × Tutors Hub</strong> (Class 8–10 ICSE & CBSE). Daily 2-hour intensive practice, chapter-wise graded worksheets, and personal attention.
          </p>
          <div className="grid sm:grid-cols-2 gap-3.5 pt-2 max-w-xl">
            <a href="#demo" className="gold-cta-btn text-amber-950 font-black px-6 py-4 rounded-2xl text-center shadow-xl hover:scale-[1.02] transition text-sm sm:text-base flex items-center justify-center gap-2">✨ Book Free 3-Day Demo</a>
            <a href={`tel:${PHONE}`} className="bg-white/10 hover:bg-white/20 border-2 border-yellow-400/60 text-yellow-200 font-black px-6 py-4 rounded-2xl text-center transition text-sm sm:text-base flex items-center justify-center gap-2 hover:scale-[1.02]">📞 Call Now: {PHONE}</a>
            <button onClick={() => quickEnroll('Offline Class (Sarojini Nagar)')} className="bg-amber-900/80 hover:bg-amber-800 border border-yellow-400/40 text-amber-100 font-extrabold px-5 py-3.5 rounded-2xl text-xs sm:text-sm transition">📍 Join Offline Classroom</button>
            <button onClick={() => quickEnroll('Live Interactive Online Batch')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg transition">💻 Join Live Online Class</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-yellow-400/20">
            {HERO_STATS.map(([big, small], i) => (
              <div key={big} className="bg-amber-950/70 rounded-2xl p-3.5 border border-yellow-400/30 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                <div className="font-display text-xl sm:text-2xl font-black text-yellow-300">{big}</div>
                <div className="text-xs text-amber-200 mt-0.5">{small}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-gradient-to-b from-amber-900/90 to-amber-950/95 backdrop-blur-xl border-2 border-yellow-400/75 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-yellow-400/25">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 p-0.5 shadow-md shrink-0"><Logo /></div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-yellow-300 block">Interactive Mode Selector</span>
                  <h2 className="font-display text-xl font-black text-white">Offline vs. Live Online</h2>
                </div>
              </div>
              <span className="bg-yellow-400 text-amber-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">2026–27</span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-amber-950 p-1.5 rounded-2xl border border-yellow-400/30 mb-5">
              <button onClick={() => setMode('offline')} className={tab(mode === 'offline')}>📍 Offline Classroom</button>
              <button onClick={() => setMode('online')} className={tab(mode === 'online')}>💻 Live Online Class</button>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-950/90 border border-yellow-400/30 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-yellow-300">{m.title}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${m.pillCls}`}>{m.pill}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">{m.text}</p>
                <ul className="text-xs text-yellow-200 space-y-1 font-semibold pt-1">{m.pts.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button onClick={() => quickEnroll(m.enroll)} className="gold-cta-btn text-amber-950 font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg">{m.cta}</button>
                <a href={wa(m.waText)} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm text-center shadow-lg transition">{m.waLabel}</a>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-yellow-400/20 flex items-center justify-between text-xs">
              <span className="text-amber-200 font-semibold">Want a quick call from our founders?</span>
              <button onClick={openCb} className="text-yellow-300 font-black underline hover:text-white">Request Callback →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
