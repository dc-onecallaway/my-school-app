import { useState } from 'react';
import { QUIZ, SAMPLES } from '../data';

export default function QuizLab() {
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState(null);
  const [tab, setTab] = useState('maths');
  const [open, setOpen] = useState({});
  const item = QUIZ[q];
  const sample = SAMPLES[tab];

  const next = () => { setQ((q + 1) % QUIZ.length); setPicked(null); };
  const switchTab = (k) => { setTab(k); setOpen({}); };

  return (
    <section id="quiz-lab" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-950 rounded-[36px] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border-2 border-yellow-400">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 bg-amber-950/90 border border-yellow-400/40 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wider bg-yellow-400 text-amber-950 px-3 py-1 rounded-full">⚡ Interactive Concept Quiz</span>
              <span className="text-xs font-bold text-yellow-300">Question {q + 1} of {QUIZ.length}</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black text-white leading-snug">{item.q}</h3>
            <div className="mt-5 space-y-2.5">
              {item.options.map((opt, i) => (
                <button key={opt} onClick={() => setPicked(i)} className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-yellow-400 hover:text-amber-950 border border-yellow-400/30 font-bold text-xs sm:text-sm transition">
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {picked !== null && (
              <div className={`mt-4 p-3.5 rounded-2xl border text-xs sm:text-sm font-bold ${picked === item.correct ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-amber-500/20 border-yellow-400 text-yellow-200'}`}>
                {picked === item.correct ? '✅ ' : '💡 Not quite! '}{item.explanation}
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-yellow-400/20 flex items-center justify-between">
              <button onClick={next} className="text-xs font-black uppercase tracking-wider text-yellow-300 hover:text-white underline">Next Question →</button>
              <a href="#demo" className="gold-cta-btn text-amber-950 font-black px-4 py-2 rounded-xl text-xs shadow">Get Full Worksheet PDF</a>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-300">Tutors Hub Classroom Material</span>
              <h2 className="font-display text-2xl sm:text-4xl font-black mt-1">Inspect Our Graded Worksheets</h2>
              <p className="text-amber-100/90 text-xs sm:text-sm mt-2">Click any wing below to preview real problems and step-marking solutions from our batches:</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SAMPLES).map(([k, s]) => (
                <button key={k} onClick={() => switchTab(k)} className={`py-2.5 px-3 rounded-xl text-xs ${tab === k ? 'font-black bg-yellow-400 text-amber-950 shadow' : 'font-bold bg-white/10 text-white hover:bg-white/20'}`}>{s.tab}</button>
              ))}
            </div>
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl">
              <div className="border-b border-amber-200 pb-3 mb-4">
                <span className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-md ${sample.dark ? 'text-yellow-300 bg-amber-950' : 'text-amber-950 bg-yellow-300'}`}>{sample.badge}</span>
                <h4 className="font-display text-lg font-black mt-1 text-amber-950">{sample.title}</h4>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                {sample.items.map((it, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 whitespace-pre-line">
                    <strong>{it.label}</strong>{it.text}
                    {it.ans && (
                      <>
                        <button onClick={() => setOpen({ ...open, [`${tab}${i}`]: !open[`${tab}${i}`] })} className="block mt-2 text-xs font-extrabold text-amber-800 underline">👁️ Show / Hide Step-by-Step Solution Key</button>
                        {open[`${tab}${i}`] && <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-emerald-800 font-bold">{it.ans}</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
