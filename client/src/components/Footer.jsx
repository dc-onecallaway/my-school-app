import { PHONE, EMAIL } from '../data';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-200/80 text-xs sm:text-sm py-10 px-4 border-t border-amber-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-400 p-0.5 shrink-0"><Logo /></div>
          <div>
            <strong className="text-white font-display text-base">TUTORS HUB</strong> • Commerce Orbit × Tutors Hub & Maths Orbit × Tutors Hub<br />
            <span>Sarojini Nagar, Lucknow, Uttar Pradesh – 226008 | 📞 {PHONE} | ✉️ {EMAIL}</span>
          </div>
        </div>
        <div className="text-yellow-300 font-bold">Founders: Prof. Jyoti Rani & Mr. Ashish Kumar Chauhan</div>
      </div>
    </footer>
  );
}
