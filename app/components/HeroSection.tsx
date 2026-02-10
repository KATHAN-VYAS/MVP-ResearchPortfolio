'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// LED Component for server wall
function LED({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{
        opacity: [0.3, 1, 0.3],
        boxShadow: [
          '0 0 4px rgba(34, 197, 94, 0.3)',
          '0 0 12px rgba(34, 197, 94, 0.8)',
          '0 0 4px rgba(34, 197, 94, 0.3)',
        ],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
      }}
      className="w-2 h-2 rounded-full bg-green-500"
    />
  );
}

// Server Column Component
function ServerColumn({
  index,
  delay,
}: {
  index: number;
  delay: number;
}) {
  const leds = Array.from({ length: 10 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.1, duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <div className="w-20 h-56 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg border-2 border-gray-700 shadow-2xl relative flex-shrink-0">
        {/* Server rack holes pattern */}
        <div className="absolute inset-x-3 top-3 bottom-3 grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-700 rounded-full" />
          ))}
        </div>

        {/* Server LEDs */}
        <div className="absolute left-3 top-6 space-y-3">
          {leds.map((i) => (
            <LED key={i} delay={delay + i * 0.3} />
          ))}
        </div>

        {/* Ventilation slots */}
        <div className="absolute right-3 top-8 space-y-1.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-10 h-0.5 bg-gray-700/50 rounded-full" />
          ))}
        </div>
        
        {/* Server brand label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800/80 rounded text-[0.4rem] text-cyan-400/50 font-mono">
          SRV-{String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
}

// Cable Component (SVG Path)
function CableBundle() {
  return (
    <svg
      className="absolute w-full h-full pointer-events-none"
      style={{ top: 0, left: 0 }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="cableBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cableYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Cable from top left */}
      <path
        d="M 100 50 Q 300 200 600 400"
        stroke="url(#cableBlue)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cable from top right */}
      <path
        d="M 1300 100 Q 900 250 700 450"
        stroke="url(#cableYellow)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cable bundle in center */}
      <path
        d="M 400 0 Q 500 200 550 600"
        stroke="url(#cableBlue)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

// Monitor Component - Redesigned for realistic desk placement
function Monitor({
  width = 'w-80',
  height = 'h-48',
  delay,
  children,
  glowColor,
  zIndex = 'z-10',
}: {
  width?: string;
  height?: string;
  delay: number;
  children: React.ReactNode;
  glowColor: string;
  zIndex?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`${width} ${height} ${zIndex} relative`}
    >
      {/* Monitor stand */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm" />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full" />
      
      {/* Monitor screen */}
      <div className={`w-full h-full rounded-lg overflow-hidden border-4 border-gray-800 ${glowColor} shadow-2xl bg-black relative`}>
        <div className="absolute inset-1 bg-gradient-to-br from-gray-900 via-black to-black rounded">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Matrix Text Component - Vulnerability Scanner
function MatrixText() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const scanLines = [
      '> VULNERABILITY SCAN INITIATED',
      '> Analyzing neural network layers...',
      '> Checking gradient flow: SECURE',
      '> Testing adversarial inputs...',
      '> Backdoor detection: PASSED',
      '> Model poisoning check: CLEAN',
      '> Data leakage test: NO ISSUES',
      '> Robustness score: 94.7%',
      '> Scan complete: 0 critical issues',
      '> Security status: OPTIMAL',
    ];
    
    const interval = setInterval(() => {
      setLines(
        Array.from({ length: 8 }, () =>
          scanLines[Math.floor(Math.random() * scanLines.length)]
        )
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start p-4 overflow-hidden text-xs font-mono space-y-1">
      <div className="text-green-500 font-bold mb-2 flex items-center justify-between">
        <span>SECURITY SCANNER v3.2</span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-cyan-400"
        >
          ●
        </motion.span>
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`text-xs ${
            line.includes('PASSED') || line.includes('CLEAN') || line.includes('SECURE') || line.includes('OPTIMAL')
              ? 'text-green-400'
              : line.includes('CRITICAL')
              ? 'text-red-400'
              : 'text-green-300'
          }`}
        >
          {line}
        </motion.div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-green-500"
      >
        █
      </motion.span>
    </div>
  );
}

// Neural Network Visualization - Analyzing neural connections
function NeuralNetworkAnalysis() {
  const nodes = [
    // Input layer
    { id: 1, x: 20, y: 30, layer: 'input' },
    { id: 2, x: 20, y: 60, layer: 'input' },
    { id: 3, x: 20, y: 90, layer: 'input' },
    // Hidden layer
    { id: 4, x: 60, y: 20, layer: 'hidden' },
    { id: 5, x: 60, y: 50, layer: 'hidden' },
    { id: 6, x: 60, y: 80, layer: 'hidden' },
    { id: 7, x: 60, y: 110, layer: 'hidden' },
    // Output layer
    { id: 8, x: 100, y: 40, layer: 'output' },
    { id: 9, x: 100, y: 80, layer: 'output' },
  ];

  const connections = [
    { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 1, to: 6 },
    { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 6 }, { from: 2, to: 7 },
    { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 3, to: 7 },
    { from: 4, to: 8 }, { from: 4, to: 9 },
    { from: 5, to: 8 }, { from: 5, to: 9 },
    { from: 6, to: 8 }, { from: 6, to: 9 },
    { from: 7, to: 9 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-blue-950/50 to-black">
      <div className="text-xs text-blue-300 absolute top-2 left-2 font-bold">NEURAL NETWORK ANALYSIS</div>
      <div className="text-xs text-cyan-400 absolute top-2 right-2">LIVE</div>
      
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Draw connections */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill={node.layer === 'input' ? '#10b981' : node.layer === 'hidden' ? '#3b82f6' : '#8b5cf6'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="none"
              stroke={node.layer === 'input' ? '#10b981' : node.layer === 'hidden' ? '#3b82f6' : '#8b5cf6'}
              strokeWidth="0.5"
              animate={{ r: [3, 6, 3], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          </motion.g>
        ))}
        
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Analysis stats */}
      <div className="absolute bottom-2 left-2 text-xs space-y-1">
        <div className="text-green-400">Accuracy: 96.8%</div>
        <div className="text-blue-400">Layers: 3</div>
        <div className="text-purple-400">Params: 1.2M</div>
      </div>
    </div>
  );
}

// JARVIS-style Chat Interface Component
function ChatInterface() {
  const [messages, setMessages] = useState([
    { type: 'system', text: 'JARVIS PROTOCOL INITIALIZED' },
    { type: 'user', text: 'Run diagnostics on neural model' },
    { type: 'jarvis', text: 'Analyzing architecture...' },
    { type: 'jarvis', text: 'Model convergence optimal, sir.' },
  ]);

  useEffect(() => {
    const newMessages = [
      { type: 'user', text: 'Check GPU utilization' },
      { type: 'jarvis', text: 'GPU usage at 87%, thermal normal' },
      { type: 'user', text: 'Optimize hyperparameters' },
      { type: 'jarvis', text: 'Adjusting learning rate to 0.001' },
      { type: 'jarvis', text: 'Performance improved by 12%' },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < newMessages.length) {
        setMessages(prev => [...prev.slice(-3), newMessages[index]]);
        index++;
      } else {
        index = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-3 text-xs space-y-2 bg-gradient-to-br from-purple-950/50 to-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
          <span className="text-purple-400 font-bold text-sm">J.A.R.V.I.S</span>
        </div>
        <div className="text-purple-300 text-xs">ONLINE</div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {messages.filter(msg => msg && msg.type).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.type === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xs ${
              msg.type === 'system'
                ? 'text-cyan-400 text-center font-bold'
                : msg.type === 'user'
                ? 'text-blue-300 text-right'
                : 'text-purple-300'
            }`}
          >
            {msg.type === 'jarvis' && '> '}
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Pulsing waveform */}
      <motion.div className="flex items-center justify-center gap-1 h-8 border-t border-purple-500/30 pt-2">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            animate={{ height: ['4px', '20px', '4px'] }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
            }}
            className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
}

// Desk Component - Side view with monitors
function WorkstationSetup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full">
      {/* Desk surface - side view */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? '0 -20px 120px rgba(245, 158, 11, 0.4), 0 -10px 80px rgba(139, 92, 246, 0.3)'
            : '0 -20px 80px rgba(245, 158, 11, 0.25), 0 -10px 60px rgba(139, 92, 246, 0.2)',
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-[15%] right-0 w-[80%] h-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-sm border border-gray-700 shadow-2xl"
      >
        {/* Desk legs */}
        <div className="absolute -bottom-24 right-8 w-1 h-24 bg-gray-700" />
        <div className="absolute -bottom-24 right-56 w-1 h-24 bg-gray-700" />
      </motion.div>

      {/* Monitors on desk - stacked view */}
      <div className="absolute bottom-[20%] right-[8%] flex items-end gap-2 md:gap-4 scale-75 md:scale-90 lg:scale-100">
        {/* Left Monitor */}
        <Monitor delay={1.2} glowColor="shadow-green-500/50" width="w-48 md:w-56" height="h-28 md:h-36">
          <MatrixText />
        </Monitor>

        {/* Center Monitor - Main */}
        <Monitor delay={1.4} glowColor="shadow-blue-500/50" width="w-56 md:w-72" height="h-36 md:h-48" zIndex="z-20">
          <NeuralNetworkAnalysis />
        </Monitor>

        {/* Right Monitor */}
        <Monitor delay={1.6} glowColor="shadow-purple-500/50" width="w-48 md:w-56" height="h-28 md:h-36">
          <ChatInterface />
        </Monitor>
      </div>

      {/* Keyboard in front */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-[17%] right-[25%] w-32 md:w-48 h-4 md:h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg border border-gray-600 shadow-xl"
      >
        {/* Keys representation */}
        <div className="grid grid-cols-12 gap-0.5 p-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-full h-0.5 md:h-1 bg-gray-900 rounded-sm" />
          ))}
        </div>
      </motion.div>

      {/* Mouse */}
      <motion.div
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-[17%] right-[18%] w-3 md:w-4 h-4 md:h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border border-gray-500 shadow-lg"
      />
    </div>
  );
}

// Equipment Table Component - Bottom right background
function EquipmentTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="relative w-full h-full opacity-60"
    >
      {/* Table surface */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-sm border border-gray-700 shadow-2xl" />
      
      {/* Table legs */}
      <div className="absolute bottom-0 left-[15%] w-1 h-16 md:h-24 bg-gray-700" />
      <div className="absolute bottom-0 right-[15%] w-1 h-16 md:h-24 bg-gray-700" />

      {/* Server rack on table */}
      <div className="absolute bottom-2 left-[10%] flex gap-2 md:gap-4 scale-75 md:scale-90">
        {Array.from({ length: 3 }, (_, i) => (
          <ServerColumn key={i} index={i} delay={2.5 + i * 0.2} />
        ))}
      </div>

      {/* Arduino boards and electronics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-4 right-[10%] flex flex-col gap-2 md:gap-3 scale-75 md:scale-90"
      >
        {/* Arduino board */}
        <div className="w-20 md:w-24 h-24 md:h-28 bg-gradient-to-br from-teal-700 to-teal-900 border-2 border-teal-500 rounded-sm shadow-lg">
          <div className="grid grid-cols-2 gap-1 md:gap-2 p-1 md:p-2">
            <div className="space-y-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full" />
              ))}
            </div>
            <div className="space-y-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 md:w-6 h-1 md:h-2 bg-gray-800 rounded-sm" />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2 w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
          />
        </div>

        {/* Scattered components */}
        <div className="flex gap-2">
          <div className="w-12 md:w-16 h-1.5 md:h-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full shadow" />
          <div className="w-8 md:w-10 h-4 md:h-6 bg-gray-800 border border-gray-600 rounded-sm shadow flex items-center justify-center">
            <div className="w-4 md:w-5 h-0.5 md:h-1 bg-yellow-600 rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Hero Section
export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen max-h-screen overflow-hidden bg-gradient-to-b from-[#0a0a12] via-[#0f0f20] to-[#0a0a12] flex flex-col items-center justify-center">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Background glow effects - desk lamp from top-left */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-[15vh] left-[10vw] w-[40vw] h-[40vh] bg-gradient-radial from-amber-900/40 via-amber-900/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* Purple glow from equipment area */}
      <motion.div
        className="absolute bottom-[10vh] right-[10vw] w-[30vw] h-[30vh] bg-gradient-to-tl from-purple-900/30 via-blue-900/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* Cable bundles */}
      <CableBundle />

      {/* FAINT PORTAL BACKGROUND - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[50vw] max-w-[500px] max-h-[500px] aspect-square">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            rotate: 360
          }}
          transition={{ 
            opacity: { duration: 2, delay: 0.5 },
            scale: { duration: 2, delay: 0.5 },
            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
          }}
          className="w-full h-full"
        >
          <img
            src="/Images/image.png"
            alt="Cosmic Energy Signature"
            className="w-full h-full object-contain opacity-20"
            style={{
              maskImage: 'radial-gradient(circle, white 0%, white 40%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, white 0%, white 40%, transparent 70%)'
            }}
          />
          
          {/* Subtle pulsing glow */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-radial from-amber-500/30 via-amber-500/10 to-transparent blur-3xl pointer-events-none"
          />
        </motion.div>
      </div>

      {/* LAB SCENE WRAPPER - Centered and contained */}
      <div className="absolute bottom-[8vh] left-0 w-full h-[55vh] flex flex-col justify-end items-center z-10">
        <div className="relative w-full h-full max-w-7xl mx-auto px-4">
          {/* Scale wrapper for entire lab assembly */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-center" style={{ transform: 'scale(0.75)', transformOrigin: 'bottom center' }}>
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Workstation area - Left side */}
              <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="absolute bottom-0 left-0 w-[55%] h-full flex items-end"
              >
                <WorkstationSetup isHovered={isHovered} />
              </motion.div>

              {/* Equipment table - Right side */}
              <div className="absolute bottom-0 right-0 w-[45%] h-[90%] flex items-end">
                <EquipmentTable />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Caption - Floating center text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute top-[18vh] left-0 right-0 z-20 flex justify-center items-center px-4"
      >
        <div className="max-w-4xl w-full relative">
          {/* Animated glow effects behind text */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-blue-600/20 blur-3xl"
          />
          
          {/* Scanline effect */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-20 pointer-events-none"
          />
          
          <motion.p 
            className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed relative z-10 px-4"
            style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)' }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7, duration: 0.8 }}
              className="inline-block"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 font-semibold drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                Welcome to my digital laboratory.
              </span>
            </motion.span>
            {' '}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.8 }}
              className="inline-block text-gray-200"
            >
              I'm an{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
            >
              Artificial Intelligence
            </motion.span>
            {' '}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.3, duration: 0.6 }}
              className="inline-block text-gray-200 font-semibold"
            >
              &
            </motion.span>
            {' '}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            >
              Cybersecurity
            </motion.span>
            {' '}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.7, duration: 0.6 }}
              className="inline-block text-gray-200"
            >
              Researcher exploring the intersection of{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.9, duration: 0.6 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            >
              Quantum Machine Learning
            </motion.span>
            ,{' '}
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 font-semibold drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              Large Language Models
            </motion.span>
            , and{' '}
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.3, duration: 0.6 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              Cybersecurity
            </motion.span>
            .
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
