import { useState } from 'react';
import { PHONE, EMAIL, NAV, MOBILE_NAV, OFFLINE, ONLINE, wa } from '../data';
import Logo from './Logo';

export default function Header({ openCb, quickEnroll }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-amber-950 text-amber-100 text-xs sm:text-sm font-semibold py-2.5 px-4 border-b border-yellow-400/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">★ Admissions Open</span>
            <span>Morning CUET & Class 12 Batches + Evening 2-Hr Intensive Sessions (Sarojini Nagar & Online)</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
            <a href={`tel:${PHONE}`} className="text-yellow-300 hover:underline">📞 {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="text-amber-200 hover:underline">✉️ {EMAIL}</a>
            <button onClick={openCb} className="bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 border border-yellow-400/40 px-2.5 py-0.5 rounded-md transition">🔔 Request Callback</button>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 glass-nav border-b-2 border-amber-300/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:h-20 py-2.5 flex items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 p-0.5 shadow-lg group-hover:scale-105 transition duration-300">
              <Logo />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-amber-950 leading-none">TUTORS HUB</span>
                <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider bg-yellow-300 text-amber-950 px-2 py-0.5 rounded-md border border-amber-500">Lucknow</span>
              </div>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-800 block mt-1">Commerce Orbit × Maths Orbit</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5 text-xs xl:text-sm font-extrabold text-amber-950">
            {NAV.map(([id, label]) => id === 'quiz-lab'
              ? <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-xl bg-yellow-300/90 hover:bg-yellow-400 border border-amber-500 transition shadow-sm">{label}</a>
              : <a key={id} href={`#${id}`} className="hover:text-amber-700 transition py-1">{label}</a>)}
          </nav>

          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-950 bg-yellow-100 hover:bg-yellow-200 border-2 border-amber-500 px-3.5 py-2.5 rounded-xl shadow-sm transition">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />📞 {PHONE}
            </a>
            <a href={wa('Hello Tutors Hub! I would like to book a Free Demo Class.')} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold px-3.5 py-2.5 rounded-xl shadow-sm transition">💬 WhatsApp</a>
            <a href="#demo" className="gold-cta-btn text-amber-950 border-2 border-amber-600 text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition">✨ Book Free Demo</a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={`tel:${PHONE}`} className="md:hidden bg-yellow-300 text-amber-950 border-2 border-amber-500 font-black text-xs px-3 py-2 rounded-xl shadow-sm">📞 Call</a>
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu" className="p-2.5 rounded-xl border-2 border-amber-500 text-amber-950 bg-yellow-100 hover:bg-yellow-200 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-amber-50 border-b-2 border-amber-400 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-amber-200">
              <button onClick={() => { quickEnroll(OFFLINE); setOpen(false); }} className="py-2.5 px-3 rounded-xl bg-amber-950 text-yellow-300 font-black text-xs">📍 Join Offline Batch</button>
              <button onClick={() => { quickEnroll(ONLINE); setOpen(false); }} className="py-2.5 px-3 rounded-xl bg-yellow-400 text-amber-950 border border-amber-600 font-black text-xs">💻 Join Online Batch</button>
            </div>
            {MOBILE_NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={`block py-2.5 px-3 rounded-xl text-sm font-extrabold text-amber-950 ${id === 'quiz-lab' ? 'bg-yellow-200' : 'hover:bg-yellow-200/70'}`}>{label}</a>
            ))}
            <div className="pt-3 grid grid-cols-3 gap-2">
              <a href={`tel:${PHONE}`} className="text-center py-3 rounded-xl border-2 border-amber-500 font-black text-xs text-amber-950 bg-yellow-100">📞 Call</a>
              <a href={wa('Hello Tutors Hub! I want to book a Free Demo Class.')} target="_blank" rel="noreferrer" className="text-center py-3 rounded-xl bg-emerald-600 font-black text-xs text-white">💬 WhatsApp</a>
              <button onClick={() => { openCb(); setOpen(false); }} className="text-center py-3 rounded-xl bg-amber-950 font-black text-xs text-yellow-300">🔔 Callback</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
