import { useEffect, useState } from 'react';
export default function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setW(h > 0 ? (document.documentElement.scrollTop / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 z-[100] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 transition-[width] duration-100" style={{ width: `${w}%` }} />;
}
