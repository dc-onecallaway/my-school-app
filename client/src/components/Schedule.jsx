import { SCHEDULE } from '../data';

export default function Schedule({ selectCourse }) {
  return (
    <section id="schedule" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">Structured Daily Routine</span>
        <h2 className="font-display text-2xl sm:text-4xl font-black text-amber-950 mt-1">Daily Batch Timetable</h2>
        <p className="text-sm text-slate-600 mt-2">Available Offline at our Sarojini Nagar, Lucknow center and Live Interactive Online.</p>
      </div>
      <div className="overflow-x-auto bg-white rounded-3xl border-2 border-amber-400 shadow-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[700px]">
          <thead>
            <tr className="bg-amber-950 text-yellow-300 text-xs uppercase tracking-wider">
              {['Wing & Batch', 'Subjects Covered', 'Timing Slot', 'Mode'].map((h) => <th key={h} className="py-4 px-6">{h}</th>)}
              <th className="py-4 px-6 text-right">Instant Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {SCHEDULE.map((r) => (
              <tr key={r.wing} className="hover:bg-yellow-50 transition">
                <td className="py-4 px-6 font-extrabold text-amber-950">{r.wing}</td>
                <td className="py-4 px-6">{r.subjects}</td>
                <td className="py-4 px-6 font-black text-amber-800">{r.time}</td>
                <td className="py-4 px-6"><span className={`text-xs px-3 py-1 rounded-full text-amber-950 ${r.sig ? 'bg-amber-300 font-black' : 'bg-yellow-200 font-bold'}`}>{r.mode}</span></td>
                <td className="py-4 px-6 text-right">
                  <button onClick={() => selectCourse(r.program)} className="bg-amber-950 hover:bg-amber-800 text-yellow-300 font-bold px-3.5 py-1.5 rounded-xl text-xs">Book Slot →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
