import { PHONE, FOUNDERS } from '../data';

export default function Founders({ selectCourse }) {
  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-amber-100/80 via-yellow-50 to-amber-100/50 border-y-2 border-amber-300 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-yellow-300 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">👑 Leadership & Mentorship</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-amber-950 mt-3">Meet Our Founders</h2>
          <p className="text-amber-900/85 text-sm sm:text-base mt-2">Dedicated to mentoring every student personally with structured worksheets, concept clarity, and continuous progress tracking.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="card-elevate bg-white rounded-[32px] border-2 border-amber-500 shadow-2xl overflow-hidden group">
              <div className={`bg-gradient-to-r ${f.grad} p-7 text-white`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="inline-block text-[11px] font-black uppercase tracking-widest bg-yellow-400 text-amber-950 px-3 py-1 rounded-full mb-2.5">Founder & Lead Educator</span>
                    <h3 className="font-display text-2xl sm:text-4xl font-black text-white">{f.name}</h3>
                    <p className="text-yellow-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider mt-1">{f.wing}</p>
                  </div>
                  <div className={`w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 p-0.5 shadow-xl shrink-0 ${f.rot} transition duration-300`}>
                    <div className="w-full h-full bg-amber-950 rounded-[14px] flex items-center justify-center font-display font-black text-2xl sm:text-3xl text-yellow-300">{f.mono}</div>
                  </div>
                </div>
              </div>
              <div className="p-7 space-y-5">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{f.bio}</p>
                <div className="flex flex-wrap gap-2 text-xs font-black text-amber-950">
                  {f.tags.map((t) => <span key={t} className="bg-yellow-200/80 border border-amber-400 px-3 py-1.5 rounded-xl">{t}</span>)}
                </div>
                <div className="pt-4 border-t border-amber-200 grid grid-cols-2 gap-3">
                  <button onClick={() => selectCourse(f.program)} className="gold-cta-btn text-amber-950 font-black py-3.5 px-4 rounded-xl text-xs shadow-md">{f.cta}</button>
                  <a href={`tel:${PHONE}`} className="bg-amber-950 hover:bg-amber-800 text-yellow-300 font-black py-3.5 px-4 rounded-xl text-xs text-center shadow-md transition">📞 Call: {PHONE}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
