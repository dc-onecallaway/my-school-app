import { useState } from 'react';
import { PHONE, PLANS, MODE_TEXT, wa } from '../data';

const sel = 'w-full px-4 py-3 rounded-2xl bg-white border-2 border-amber-500 text-amber-950 text-xs sm:text-sm font-bold focus:outline-none';
const lbl = 'block text-xs font-black uppercase text-amber-950 mb-1.5';

export default function Planner() {
  const [grade, setGrade] = useState('middle');
  const [board, setBoard] = useState('ICSE / ISC Board');
  const [mode, setMode] = useState('offline');
  const [result, setResult] = useState(null);

  const generate = () => {
    const [plan, slot] = PLANS[grade];
    setResult({ plan, slot, board, modeText: MODE_TEXT[mode] });
  };

  return (
    <section id="calculator" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 border-2 border-amber-600 rounded-[32px] p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest bg-amber-950 text-yellow-300 px-3.5 py-1 rounded-full">🎯 Interactive Batch Planner</span>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-amber-950 mt-3">Generate Your Personalized Study Roadmap</h2>
          <p className="text-xs sm:text-sm text-amber-950/85 font-semibold mt-1">Select your class, board, and preferred mode to view your recommended batch slot and claim your free 3-day trial.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={lbl}>1. Class / Stream</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className={sel}>
              <option value="middle">Class 8 & 9 (Maths & Science)</option>
              <option value="high">Class 10 (ICSE / CBSE Boards)</option>
              <option value="commerce">Class 11 & 12 (Commerce Orbit)</option>
              <option value="cuet">CUET (UG) Commerce Target</option>
            </select>
          </div>
          <div>
            <label className={lbl}>2. Board</label>
            <select value={board} onChange={(e) => setBoard(e.target.value)} className={sel}>
              <option value="ICSE / ISC Board">ICSE / ISC Board</option>
              <option value="CBSE Board">CBSE Board</option>
              <option value="CUET / Skill Module">CUET / Skill Cert.</option>
            </select>
          </div>
          <div>
            <label className={lbl}>3. Learning Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className={sel}>
              <option value="offline">Offline (Sarojini Nagar)</option>
              <option value="online">Live Interactive Online</option>
              <option value="hybrid">Hybrid (Offline + Online)</option>
            </select>
          </div>
        </div>
        <button onClick={generate} className="w-full bg-amber-950 hover:bg-amber-900 text-yellow-300 font-black py-4 rounded-2xl shadow-xl transition hover:scale-[1.01] text-sm sm:text-base">🚀 Generate My Study Plan & Unlock Free Demo</button>

        {result && (
          <div className="mt-6 p-6 rounded-2xl bg-white border-2 border-amber-600 text-slate-900 text-xs sm:text-sm space-y-3 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
              <h4 className="font-display font-black text-base sm:text-lg text-amber-950">🎉 Your Personalized Success Plan is Ready!</h4>
              <span className="text-xs font-black bg-yellow-300 text-amber-950 px-2.5 py-1 rounded-full">{result.board}</span>
            </div>
            <p><strong>📍 Selected Mode:</strong> {result.modeText}</p>
            <p><strong>⏰ Recommended Batch Timing:</strong> {result.slot}</p>
            <p><strong>📚 Strategy:</strong> {result.plan}</p>
            <div className="pt-2 grid sm:grid-cols-3 gap-2">
              <a href={`tel:${PHONE}`} className="text-center py-2.5 rounded-xl bg-amber-950 text-yellow-300 font-extrabold text-xs hover:bg-amber-900 transition">📞 Call {PHONE}</a>
              <a href={wa(`Hello Tutors Hub! I generated my study plan for ${result.board} (${result.modeText}). I want to join!`)} target="_blank" rel="noreferrer" className="text-center py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition">💬 Send Plan on WhatsApp</a>
              <a href="#demo" className="text-center py-2.5 rounded-xl gold-cta-btn text-amber-950 font-black text-xs">✨ Book Free 3-Day Demo</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
