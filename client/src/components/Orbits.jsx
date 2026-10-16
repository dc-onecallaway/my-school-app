import { PHONE, ACC, M910 } from '../data';

export default function Orbits({ selectCourse }) {
  return (
    <section id="orbits" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-yellow-300 px-4 py-1.5 rounded-full border border-amber-500">Dual-Wing Architecture</span>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-amber-950 mt-3">Two Specialized Wings Under One Roof</h2>
        <p className="text-slate-700 text-sm sm:text-base mt-2">Focused subject ecosystems designed for maximum board exam marks and competitive entrance success.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-elevate bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-950 text-white rounded-3xl p-7 sm:p-9 border-2 border-yellow-400 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wider bg-yellow-400 text-amber-950 px-3.5 py-1 rounded-full">Wing 01 • Senior Secondary & Entrance</span>
              <span className="text-xs font-bold text-yellow-300">Class 11, 12 & CUET</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-black">Commerce Orbit × Tutors Hub</h3>
            <p className="text-amber-100/90 text-sm sm:text-base mt-3 leading-relaxed">In-depth conceptual command over Accountancy, Economics, Business Studies, Banking, and Applied GST with corporate balance sheet drills and morning CUET target sessions.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-6 text-xs font-bold text-yellow-200">
              {['📊 Accountancy (2-Hr Slot)', '📈 Macro & Micro Economics', '💼 Business Studies', '🏦 Banking & Applied GST'].map((t) => <div key={t} className="bg-white/10 border border-yellow-400/30 p-3 rounded-xl">{t}</div>)}
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-yellow-400/25 grid sm:grid-cols-2 gap-3">
            <button onClick={() => selectCourse(ACC)} className="gold-cta-btn text-amber-950 font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg">✨ Book Commerce Demo</button>
            <a href={`tel:${PHONE}`} className="bg-white/10 hover:bg-white/20 border border-yellow-400/50 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm text-center transition">📞 Call: {PHONE}</a>
          </div>
        </div>

        <div className="card-elevate bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-100 text-amber-950 rounded-3xl p-7 sm:p-9 border-2 border-amber-600 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wider bg-amber-950 text-yellow-300 px-3.5 py-1 rounded-full">Wing 02 • Middle & High School</span>
              <span className="text-xs font-extrabold text-amber-900">Class 8, 9 & 10</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-black">Maths Orbit × Tutors Hub</h3>
            <p className="text-amber-950/85 text-sm sm:text-base mt-3 leading-relaxed">High-scoring numerical foundation across ICSE & CBSE Mathematics, Physics, Chemistry, and Biology through step-marking theorems, numerical labs, and weekly tests.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-6 text-xs font-extrabold text-amber-950">
              {['📐 ICSE & CBSE Mathematics', '⚡ Physics & Chemistry Labs', '🧬 Diagrammatic Biology', '📝 Graded Chapter Sheets'].map((t) => <div key={t} className="bg-white/85 border border-amber-400 p-3 rounded-xl">{t}</div>)}
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-amber-400/60 grid sm:grid-cols-2 gap-3">
            <button onClick={() => selectCourse(M910)} className="bg-amber-950 hover:bg-amber-900 text-yellow-300 font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg transition">✨ Book Maths Orbit Demo</button>
            <a href={`tel:${PHONE}`} className="bg-white hover:bg-amber-50 border-2 border-amber-950 text-amber-950 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm text-center transition">📞 Call: {PHONE}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
