import { useState } from 'react';
import { PHONE, EMAIL } from '../data';

const input = 'w-full px-4 py-3 rounded-xl border-2 border-amber-200 text-sm focus:outline-none focus:border-amber-500';

export default function CallbackModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timing, setTiming] = useState('Call Immediately');
  const [done, setDone] = useState(null);
  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setDone({ pending: true });
    try {
      await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: `Urgent Callback Request: ${name} (${phone})`, Student_Name: name, Phone_Number: phone, Preferred_Call_Time: timing }),
      });
    } catch { /* show confirmation regardless, as in original */ }
    setDone({ name, phone, timing });
    setName(''); setPhone('');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-yellow-400 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button onClick={() => { setDone(null); onClose(); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-100 text-amber-950 font-black flex items-center justify-center hover:bg-amber-200">✕</button>
        <span className="text-xs font-black uppercase bg-yellow-300 text-amber-950 px-3 py-1 rounded-full">🔔 Fast-Track Counseling</span>
        <h3 className="font-display text-2xl font-black text-amber-950 mt-2">Request a Quick Call Back</h3>
        <p className="text-xs text-slate-600 mt-1">Enter your number below and our founders will call you from <strong>{PHONE}</strong>.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Student / Parent Name *" className={input} />
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-Digit Mobile Number *" className={input} />
          <select value={timing} onChange={(e) => setTiming(e.target.value)} className={`${input} bg-white font-semibold`}>
            <option value="Call Immediately">Call Me Immediately</option>
            <option value="Morning (9 AM - 12 PM)">Morning (9 AM – 12 PM)</option>
            <option value="Evening (4 PM - 8 PM)">Evening (4 PM – 8 PM)</option>
          </select>
          <button type="submit" className="w-full gold-cta-btn text-amber-950 font-black py-3.5 rounded-xl text-sm shadow-lg">📞 Send Callback Request Now</button>
        </form>
        {done && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
            {done.pending ? '⏳ Sending your callback request...' : <>✅ Thank you, <strong>{done.name}</strong>! We will call you on <strong>{done.phone}</strong> ({done.timing}) from <strong>{PHONE}</strong>.</>}
          </div>
        )}
      </div>
    </div>
  );
}
