import { useState } from 'react';
import { PHONE, COURSES, FILTERS } from '../data';

export default function Courses({ selectCourse }) {
  const [filter, setFilter] = useState('all');
  const list = COURSES.filter((c) => filter === 'all' || c.cat === filter);
  return (
    <section id="courses" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-800">Board & Entrance Programs</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-amber-950 mt-1">Explore Our Coaching Batches</h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTERS.map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} className={`shrink-0 text-xs sm:text-sm px-4 py-2.5 rounded-xl transition ${filter === key ? 'bg-amber-950 text-yellow-300 font-black shadow-sm' : 'bg-white text-amber-950 hover:bg-yellow-200 font-bold border border-amber-400'}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((c) => (
          <div key={c.title} className="card-elevate bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full ${c.dark ? 'bg-amber-950 text-yellow-300' : 'bg-yellow-300 text-amber-950'}`}>{c.wing}</span>
                <span className="text-xs font-extrabold text-amber-800">{c.tag}</span>
              </div>
              <h3 className="font-display text-xl font-black text-amber-950">{c.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{c.desc}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-700 font-semibold border-t border-amber-100 pt-3.5">
                {c.pts.map((p) => <li key={p}>✔ {p}</li>)}
              </ul>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button onClick={() => selectCourse(c.program)} className="gold-cta-btn text-amber-950 font-black py-3 rounded-xl text-xs shadow">✨ Free Demo</button>
              <a href={`tel:${PHONE}`} className="bg-amber-950 hover:bg-amber-800 text-yellow-300 font-bold py-3 rounded-xl text-xs text-center transition">📞 Call Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
