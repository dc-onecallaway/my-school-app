import { useState } from "react";
import { PHONE, EMAIL, PROGRAMS, BOARD_MODES, wa } from "../data";

const input =
  "w-full px-4 py-3 rounded-xl border-2 border-amber-200 text-sm focus:outline-none focus:border-amber-500";
const lbl = "block text-xs font-extrabold uppercase text-amber-950 mb-1";

export default function Demo({ program, setProgram, boardMode, setBoardMode }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [fb, setFb] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const n = note.trim() || "None";
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`New Tutors Hub Free Demo Registration - ${name}`)}&body=${encodeURIComponent(
      `New Student Demo Registration for Tutors Hub:\n\n• Student Name: ${name}\n• Phone Number: ${phone}\n• Selected Orbit & Program: ${program}\n• Board & Mode: ${boardMode}\n• Additional Note: ${n}`,
    )}`;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Tutors Hub Free Demo Registration: ${name}`,
          Student_Name: name,
          Phone_Number: phone,
          Selected_Program: program,
          Board_And_Mode: boardMode,
          Additional_Notes: n,
        }),
      });
      if (!res.ok) throw new Error("fallback");
      setFb({ ok: true, name });
      setName("");
      setPhone("");
      setNote("");
    } catch {
      setFb({ ok: false, name, mailto });
      window.location.href = mailto;
    } finally {
      setSending(false);
    }
  };

  const whatsapp = () => {
    window.open(
      wa(
        `Hello Tutors Hub!\n\nI would like to book a Free 3-Day Demo Class:\n• Name: ${name.trim() || "Student"}\n• Phone: ${phone.trim() || "Not provided"}\n• Program: ${program}\n• Mode: ${boardMode}\n• Note: ${note.trim() || "None"}`,
      ),
      "_blank",
    );
  };

  const info = [
    [
      "📍",
      "Offline Center Address",
      "Sarojini Nagar, Lucknow, Uttar Pradesh – 226008",
      {
        href: "https://www.google.com/maps/search/?api=1&query=Tutors+Hub%2C+New+Housing+Society%2C+F-15%2C+Sarojini+Nagar%2C+Lucknow%2C+Uttar+Pradesh+226008",
        label: "🗺️ Map",
        blank: true,
      },
    ],
    [
      "📞",
      "Direct Helpline Number",
      PHONE,
      { href: `tel:${PHONE}`, label: "📞 Call" },
    ],
  ];

  return (
    <section
      id="demo"
      className="py-16 sm:py-24 hero-gold-luxe text-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-300">
            Admissions & Counseling
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black leading-tight">
            Book Your Free 3-Day Demo Class Today
          </h2>
          <p className="text-amber-100/90 text-sm leading-relaxed">
            Visit our offline center in <strong>Sarojini Nagar, Lucknow</strong>{" "}
            or attend live interactive online sessions from home.
          </p>
          <div className="space-y-3.5 text-sm">
            {info.map(([icon, title, val, btn]) => (
              <div
                key={title}
                className="bg-amber-900/50 backdrop-blur-md border border-yellow-400/30 p-4 rounded-2xl flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className="font-extrabold text-white">{title}</div>
                    <div className="text-amber-200 mt-0.5">{val}</div>
                  </div>
                </div>
                <a
                  href={btn.href}
                  target={btn.blank ? "_blank" : undefined}
                  rel="noreferrer"
                  className="shrink-0 bg-yellow-400 text-amber-950 font-black text-xs px-3 py-2 rounded-xl"
                >
                  {btn.label}
                </a>
              </div>
            ))}
            <div className="bg-amber-900/50 backdrop-blur-md border border-yellow-400/30 p-4 rounded-2xl flex items-start gap-3">
              <span className="text-xl">✉️</span>
              <div>
                <div className="font-extrabold text-white">
                  Official Email Inbox
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-amber-200 underline hover:text-yellow-300"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-yellow-400">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-2xl font-black text-amber-950">
              Student Trial Registration
            </h3>
            {/* <span className="text-[11px] font-extrabold uppercase bg-yellow-200 text-amber-950 px-3 py-1 rounded-full border border-amber-400">✉️ Direct Email & WhatsApp Sync</span> */}
          </div>
          {/* <p className="text-xs sm:text-sm text-slate-600 mt-1">Clicking <strong>"✅ Confirm Free Demo Slot"</strong> automatically emails your registration details directly to <strong>{EMAIL}</strong>.</p> */}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Student Full Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className={input}
                />
              </div>
              <div>
                <label className={lbl}>Parent / Student Mobile *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className={input}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Select Orbit & Program *</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className={`${input} bg-white font-semibold`}
                >
                  {PROGRAMS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={lbl}>Board & Mode *</label>
                <select
                  value={boardMode}
                  onChange={(e) => setBoardMode(e.target.value)}
                  className={`${input} bg-white font-semibold`}
                >
                  {BOARD_MODES.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={lbl}>Optional Note / Preferred Timing</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Morning batch / Evening 5:30 PM slot"
                className={input}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                disabled={sending}
                className="w-full gold-cta-btn text-amber-950 font-black py-3.5 px-4 rounded-xl shadow-md transition text-xs sm:text-sm disabled:opacity-70"
              >
                {sending
                  ? "⏳ Sending Registration to Email..."
                  : "✅ Confirm Free Demo Slot"}
              </button>
              <button
                type="button"
                onClick={whatsapp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition text-xs sm:text-sm"
              >
                💬 Instant WhatsApp Booking
              </button>
            </div>
            {fb &&
              (fb.ok ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium">
                  ✅ <strong>Registration Emailed Successfully!</strong>
                  <br />
                  Thank you, <strong>{fb.name}</strong>. Your details have been
                  sent to <strong>{EMAIL}</strong>. We will call you from{" "}
                  <strong>{PHONE}</strong> shortly.
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                  ✉️ <strong>Opening Your Email App...</strong>
                  <br />
                  If it did not open,{" "}
                  <a href={fb.mailto} className="underline font-bold">
                    click here to send the email to {EMAIL}
                  </a>
                  .
                </div>
              ))}
          </form>
        </div>
      </div>
    </section>
  );
}
