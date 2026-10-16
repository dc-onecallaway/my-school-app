import { MARQUEE } from '../data';
export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="bg-yellow-400 border-y-2 border-amber-700 py-3 overflow-hidden shadow-sm">
      <div className="flex whitespace-nowrap animate-marquee font-display font-black text-xs sm:text-sm text-amber-950 uppercase tracking-wider w-max">
        {items.map((t, i) => <span key={i} className="mx-6">{t}</span>)}
      </div>
    </div>
  );
}
