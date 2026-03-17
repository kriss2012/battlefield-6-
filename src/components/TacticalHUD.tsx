import React from 'react';
import { motion } from 'framer-motion';

const TacticalHUD: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Corner UI Brackets */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-blue-500/30 rounded-tl-3xl" />
      <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-blue-500/30 rounded-tr-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border-l-2 border-b-2 border-blue-500/30 rounded-bl-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-blue-500/30 rounded-br-3xl" />

      {/* Real-time Telemetry Markers */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/4 left-20 flex flex-col gap-1"
      >
        <span className="text-[8px] font-mono text-blue-400 uppercase tracking-widest">Uplink: STABLE</span>
        <div className="w-12 h-[1px] bg-blue-500/50" />
      </motion.div>

      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-20 flex flex-col items-end gap-1"
      >
        <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest">Latency: 12ms</span>
        <div className="w-12 h-[1px] bg-purple-500/50" />
      </motion.div>

      {/* Global Scanline Glitch Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.01)_50%)] bg-[size:100%_4px]" />
      
      {/* Animated HUD Elements */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent origin-left"
      />
    </div>
  );
};

export default TacticalHUD;
