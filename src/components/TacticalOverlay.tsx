import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const TacticalOverlay: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    const { clientX, clientY } = e as MouseEvent;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Subtle parallax for the grid based on scroll
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const smoothGridY = useSpring(gridY, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Dynamic Tactical Grid */}
      <motion.div 
        style={{ x: smoothMouseX, y: smoothGridY }}
        className="absolute inset-0 opacity-[0.07]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:200px_200px]" />
      </motion.div>

      {/* Vignette & CRT Scars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* HUD Elements - Static corners with subtle reaction */}
      <motion.div 
        style={{ x: useTransform(smoothMouseX, (v) => v * 0.2), y: useTransform(smoothMouseY, (v) => v * 0.2) }}
        className="absolute inset-0 p-8"
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />
      </motion.div>

      {/* Top Bar Telemetry */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-8 text-[8px] font-mono text-white/40 tracking-[0.2em] uppercase">
        <span>SYS: ONLINE</span>
        <span>LAT: 24MS</span>
        <span>SIG: STABLE</span>
        <span>TRK: ACTIVE</span>
      </div>

      {/* Scanline Animation Overlay (already in CSS usually, but adding a refined version here) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[size:100%_4px,3px_100%]" />
    </div>
  );
};

export default TacticalOverlay;
