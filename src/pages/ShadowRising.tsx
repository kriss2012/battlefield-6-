import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../utils/storyData';
import type { Scene } from '../utils/storyData';
import { CharacterPortraits } from '../utils/characterAssets';
import TacticalHUD from '../components/TacticalHUD';

const ShadowRising: React.FC = () => {
  const [currentSceneKey, setCurrentSceneKey] = useState('s1_intro');
  const [state, setState] = useState({
    rage: 0,
    resolve: 'broken',
    path: 'shadow',
    chapter: 1,
    skills: {
      combat: false,
      stealth: false,
      intel: false,
    },
    gear: {
      map: false,
      drawing: true,
      flashDrive: false,
    },
    foughtBack: false,
    savedEvidence: false,
    hadAlliance: false,
    motherDead: false,
  });
  const [showOverlay, setShowOverlay] = useState<'JUSTICE' | 'VICTORY' | null>(null);
  const [flash, setFlash] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const typingIntervalRef = useRef<any>(null);

  const scene: Scene = storyData[currentSceneKey] || storyData['s1_intro'];

  useEffect(() => {
    // Typing effect
    let i = 0;
    setDisplayText('');
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    
    const fullText = scene.text;
    typingIntervalRef.current = setInterval(() => {
      setDisplayText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      }
    }, 15);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [currentSceneKey, scene.text]);

  const handleChoice = (choice: any) => {
    const newState = { ...state };
    
    // Apply state changes
    if (choice.raiseRage && newState.rage < 5) newState.rage++;
    if (choice.lowerRage && newState.rage > 0) newState.rage--;
    if (choice.setFought) newState.foughtBack = true;
    if (choice.saveEvidence) newState.savedEvidence = true;
    if (choice.setAlliance) newState.hadAlliance = true;
    
    if (choice.unlockSkill) {
      newState.skills[choice.unlockSkill as keyof typeof newState.skills] = true;
    }

    // Update path
    if (choice.tag === 'fight') newState.path = 'warrior';
    else if (choice.tag === 'intel') newState.path = 'shadow';
    else if (choice.tag === 'stealth') newState.path = 'ghost';

    setState(newState);

    if (choice.goto === 'RESTART') {
      restartGame();
    } else if (choice.goto === 'END_JUSTICE') {
      setShowOverlay('JUSTICE');
    } else if (choice.goto === 'END_FIGHT') {
      setShowOverlay('VICTORY');
    } else {
      setCurrentSceneKey(choice.goto);
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const restartGame = () => {
    setState({
      rage: 0,
      resolve: 'broken',
      path: 'shadow',
      chapter: 1,
      skills: { combat: false, stealth: false, intel: false },
      gear: { map: false, drawing: true, flashDrive: false },
      foughtBack: false,
      savedEvidence: false,
      hadAlliance: false,
      motherDead: false,
    });
    setCurrentSceneKey('s1_intro');
    setShowOverlay(null);
  };

  const Arts: Record<string, React.ReactNode> = {
    schoolyard: (
      <svg viewBox="0 0 800 220" className="w-full h-full text-[#333]">
        <rect width="800" height="220" fill="#090909"/>
        <rect x="0" y="60" width="800" height="160" fill="#0d0d0d"/>
        <rect x="50" y="80" width="60" height="80" fill="#111" stroke="currentColor" strokeWidth="1"/>
        <rect x="160" y="70" width="80" height="90" fill="#111" stroke="currentColor" strokeWidth="1"/>
        <rect x="600" y="75" width="100" height="85" fill="#111" stroke="currentColor" strokeWidth="1"/>
        <rect x="0" y="185" width="800" height="35" fill="#0a0a0a" stroke="#151515"/>
        <ellipse cx="320" cy="190" rx="18" ry="5" fill="#050505"/>
        <line x1="320" y1="155" x2="320" y2="185" stroke="#1e1e1e" strokeWidth="2"/>
        <circle cx="320" cy="148" r="8" fill="#1e1e1e"/>
        <circle cx="380" cy="146" r="8" fill="#2a1414"/>
        <line x1="380" y1="154" x2="380" y2="182" stroke="#2a1414" strokeWidth="3"/>
        <text x="400" y="30" fontFamily="monospace" fontSize="10" fill="#2a0000" letterSpacing="4">NAGPUR DISTRICT — 2009</text>
      </svg>
    ),
    firstfight: (
      <svg viewBox="0 0 800 220" className="w-full h-full">
        <rect width="800" height="220" fill="#060606"/>
        <circle cx="400" cy="110" r="100" fill="#1a0000" opacity="0.1"/>
        <circle cx="340" cy="100" r="10" fill="#222"/>
        <line x1="340" y1="110" x2="340" y2="148" stroke="#222" strokeWidth="3"/>
        <circle cx="460" cy="105" r="10" fill="#3d1212"/>
        <line x1="460" y1="115" x2="465" y2="155" stroke="#3d1212" strokeWidth="3"/>
        <text x="400" y="20" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#400000" letterSpacing="3">THE CONFRONTATION</text>
      </svg>
    ),
    kidnap: (
      <svg viewBox="0 0 800 220" className="w-full h-full">
        <rect width="800" height="220" fill="#050505"/>
        <rect x="100" y="80" width="70" height="50" fill="#030d12" stroke="#0a2030" rx="3"/>
        <text x="135" y="100" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#0a4060">MISSED CALLS</text>
        <circle cx="580" cy="95" r="9" fill="#1a1414"/>
        <rect x="572" y="104" width="16" height="30" fill="#1a1414"/>
        <text x="400" y="25" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#3a0000" letterSpacing="3">THE EMPTY HOME</text>
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 800 220" className="w-full h-full text-[#222]">
        <rect width="800" height="220" fill="#080808"/>
        <line x1="0" y1="40" x2="800" y2="40" stroke="currentColor" strokeWidth="4"/>
        <rect x="50" y="155" width="50" height="40" fill="#0d0d0d" stroke="currentColor"/>
        <circle cx="400" cy="125" r="10" fill="#1a1a1a"/>
        <text x="400" y="22" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#1a0000" letterSpacing="3">ISF COMPOUND</text>
      </svg>
    ),
    final: (
      <svg viewBox="0 0 800 220" className="w-full h-full text-[#300]">
        <rect width="800" height="220" fill="#000"/>
        <circle cx="400" cy="110" r="150" fill="currentColor" opacity="0.2"/>
        <rect x="340" y="60" width="120" height="100" fill="#0d0505" stroke="currentColor"/>
        <text x="400" y="22" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#500000" letterSpacing="3">THE FINAL RECKONING</text>
      </svg>
    )
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d5] font-['Crimson_Pro',_serif] overflow-x-hidden relative selection:bg-red-900/40 pb-20">
      <TacticalHUD />
      
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')] " />

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-10 text-center"
          >
            <h2 className={`text-6xl md:text-8xl font-['Bebas_Neue'] tracking-[6px] mb-5 ${showOverlay === 'JUSTICE' ? 'text-[#D4AC0D]' : 'text-[#C0392B]'}`}>
              {showOverlay === 'JUSTICE' ? 'JUSTICE ACHIEVED' : 'SHADOW RISEN'}
            </h2>
            <p className="max-w-xl text-xl italic text-[#a09080] leading-relaxed mb-8">
              {showOverlay === 'JUSTICE' 
                ? 'Through patience, intelligence, and quiet devastation — you dismantled the network and brought the Director to justice.'
                : 'Through fire and blood, you walked into the heart of the machine and walked out the other side. The shadows know your name now.'
              }
            </p>
            <button
              onClick={restartGame}
              className="bg-[#8B0000] hover:bg-[#C0392B] text-white px-9 py-3.5 font-mono text-sm tracking-[3px] uppercase transition-colors"
            >
              ↺ RESTART SAGA
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[900px] mx-auto p-5 min-h-screen flex flex-col pt-24">
        {/* Stats / HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 font-mono text-[10px] tracking-[2px] text-[#a09080]">
          <div className="bg-[#111] p-3 border border-[#222] flex flex-col gap-1">
            <span className="text-[#555]">RESOLVE</span>
            <span className="text-[#D4AC0D] text-xs font-bold">{state.resolve.toUpperCase()}</span>
          </div>
          <div className="bg-[#111] p-3 border border-[#222] flex flex-col gap-1">
            <span className="text-[#555]">RAGE LEVEL</span>
            <div className="flex gap-1.5 mt-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2.5 h-2.5 border border-[#333] ${i <= state.rage ? 'bg-[#C0392B] shadow-[0_0_5px_#C0392B]' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
          <div className="bg-[#111] p-3 border border-[#222] flex flex-col gap-1">
            <span className="text-[#555]">ACTIVE SKILLS</span>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(state.skills).map(([skill, active]) => (
                <span key={skill} className={`text-[8px] px-1 border ${active ? 'text-blue-400 border-blue-400/30 font-bold' : 'text-[#333] border-[#222]'}`}>{skill.toUpperCase()}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#111] p-3 border border-[#222] flex flex-col gap-1">
            <span className="text-[#555]">GEAR</span>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(state.gear).map(([item, has]) => (
                <span key={item} className={`text-[8px] px-1 border ${has ? 'text-emerald-400 border-emerald-400/30 font-bold' : 'text-[#333] border-[#222]'}`}>{item.toUpperCase()}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Visuals */}
        <div className="w-full h-[240px] bg-[#0d0d0d] border border-[#1e1e1e] flex items-center justify-center relative overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.art}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              {Arts[scene.art] || Arts.schoolyard}
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#8B0000] tracking-[3px] uppercase bg-black/40 px-2 py-1 backdrop-blur-sm border border-[#8B0000]/20">
            {scene.chapter}
          </div>
        </div>

        {/* Dialogue / Story Box */}
        <div className="flex flex-col md:flex-row bg-[#0f0f0f] border border-[#1e1e1e] border-t-0 min-h-[350px] relative overflow-hidden">
          {/* Portrait Area */}
          {(scene.portrait || scene.speaker) && (
            <div className="w-full md:w-[240px] border-r border-[#1e1e1e] bg-[#0d0d0d] p-6 flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 border border-[#222] bg-[#111] rounded-full overflow-hidden p-2 relative">
                {scene.portrait && CharacterPortraits[scene.portrait]}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
              <div className="text-center">
                <div className="font-mono text-[10px] text-[#8B0000] tracking-[3px] mb-1 uppercase font-bold">IDENTITY</div>
                <div className="font-['Bebas_Neue'] text-2xl tracking-[2px] text-[#f5f0ea]">{scene.speaker || 'UNKNOWN'}</div>
              </div>
            </div>
          )}

          <div className="flex-1 p-8 md:p-10 relative flex flex-col">
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#8B0000] to-transparent" />
            
            <motion.h2 
              key={scene.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-['Bebas_Neue'] text-4xl tracking-[4px] text-[#f5f0ea] mb-6 uppercase border-b border-[#222] pb-4"
            >
              {scene.title}
            </motion.h2>

            <div className="text-xl leading-[1.9] text-[#c8bfb0] font-light flex-1 story-container italic">
              {displayText}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-2 h-5 bg-[#8B0000] ml-1 align-middle"
              />
            </div>

            {/* Choices Container */}
            <div className="mt-10 space-y-3">
              <div className="font-mono text-[9px] tracking-[4px] text-[#333] mb-4 uppercase border-t border-[#1a1a1a] pt-4">INTERACTION REQUIRED</div>
              {scene.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="w-full bg-transparent border border-[#252525] text-[#e8e0d5] px-6 py-4 text-left font-serif text-lg cursor-pointer transition-all duration-300 group relative overflow-hidden hover:border-[#8B0000] hover:text-white"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-[#8B0000] font-black border border-[#8B0000]/30 px-1.5 py-0.5">{String.fromCharCode(65+i)}</span>
                    <span className="flex-1 transition-all group-hover:pl-2">{c.text}</span>
                  </div>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="absolute bottom-0 left-0 h-[1px] bg-[#8B0000]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center mt-4 px-2 font-mono text-[9px] text-[#333] tracking-[2px] uppercase">
          <div>LOC: NAGPUR_DIST_SECTOR_07</div>
          <div>SIG_STRENGTH: 98% // ENCRYPTED_LINK</div>
        </div>
      </div>

      {/* Flash Effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[1000] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShadowRising;
