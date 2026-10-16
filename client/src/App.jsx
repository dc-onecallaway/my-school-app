import { useState } from 'react';
import { PROGRAMS, BOARD_MODES } from './data';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Orbits from './components/Orbits';
import Founders from './components/Founders';
import Courses from './components/Courses';
import QuizLab from './components/QuizLab';
import Planner from './components/Planner';
import Schedule from './components/Schedule';
import Demo from './components/Demo';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import CallbackModal from './components/CallbackModal';

const goDemo = () => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [boardMode, setBoardMode] = useState(BOARD_MODES[0]);
  const [cbOpen, setCbOpen] = useState(false);

  const selectCourse = (p) => { setProgram(p); goDemo(); };
  const quickEnroll = (m) => { setBoardMode(m.includes('Offline') ? BOARD_MODES[0] : BOARD_MODES[2]); goDemo(); };
  const openCb = () => setCbOpen(true);

  return (
    <div className="bg-amber-50/50 text-slate-900 font-sans antialiased pb-24 md:pb-0 selection:bg-yellow-400 selection:text-amber-950 overflow-x-hidden min-h-screen">
      <ScrollProgress />
      <Header openCb={openCb} quickEnroll={quickEnroll} />
      <Hero openCb={openCb} quickEnroll={quickEnroll} />
      <Marquee />
      <Orbits selectCourse={selectCourse} />
      <Founders selectCourse={selectCourse} />
      <Courses selectCourse={selectCourse} />
      <QuizLab />
      <Planner />
      <Schedule selectCourse={selectCourse} />
      <Demo program={program} setProgram={setProgram} boardMode={boardMode} setBoardMode={setBoardMode} />
      <Footer />
      <FloatingActions openCb={openCb} />
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </div>
  );
}
