import { PHONE, wa } from '../data';

export default function FloatingActions({ openCb }) {
  return (
    <>
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-2.5">
        <button onClick={openCb} className="bg-amber-950 hover:bg-amber-900 text-yellow-300 border-2 border-yellow-400 font-black text-xs px-4 py-3 rounded-2xl shadow-2xl transition hover:scale-105">🔔 Request Callback</button>
        <a href={wa('Hello Tutors Hub! I would like to enquire about classes.')} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-3 rounded-2xl shadow-2xl transition hover:scale-105">💬 WhatsApp Chat</a>
        <a href={`tel:${PHONE}`} className="gold-cta-btn text-amber-950 border-2 border-amber-700 font-black text-xs px-4 py-3 rounded-2xl shadow-2xl animate-pulse-glow">📞 Call: {PHONE}</a>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-amber-50/95 backdrop-blur-md border-t-2 border-amber-400 px-2.5 py-2 grid grid-cols-4 gap-1.5 shadow-2xl">
        <a href={`tel:${PHONE}`} className="flex items-center justify-center py-2 rounded-xl bg-amber-950 text-yellow-300 font-black text-[11px]">📞 Call</a>
        <a href={wa('Hello Tutors Hub! I would like to book a Free Demo Class.')} target="_blank" rel="noreferrer" className="flex items-center justify-center py-2 rounded-xl bg-emerald-600 text-white font-black text-[11px]">💬 WhatsApp</a>
        <button onClick={openCb} className="flex items-center justify-center py-2 rounded-xl bg-yellow-200 text-amber-950 font-black text-[11px] border border-amber-400">🔔 Callback</button>
        <a href="#demo" className="flex items-center justify-center py-2 rounded-xl gold-cta-btn text-amber-950 font-black text-[11px] border border-amber-500">✨ Demo</a>
      </div>
    </>
  );
}
