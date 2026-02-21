'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Linkedin, Github, Instagram, Mail, Shield, Zap, Building2, GraduationCap, Microscope, Activity, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useThreatMode } from '../contexts/ThreatContext';
import Navbar from '../components/Navbar';

// Scramble-to-real decryption animation
function DecryptText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = '!@#$%^&*<>[]{}ABCDEFXYZabcxyz0123456789';

  useEffect(() => {
    if (!trigger) {
      setDisplayed(text);
      return;
    }
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplayed(text);
        clearInterval(interval);
        return;
      }
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < Math.floor((frame / totalFrames) * text.length)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      frame++;
    }, 40);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <>{displayed}</>;
}

// Typewriter effect – types out text letter-by-letter
function TypewriterText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!trigger) {
      setDisplayed('');
      return;
    }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
    }, 35);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && trigger && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-cyan-300 ml-0.5 align-middle"
        />
      )}
    </>
  );
}

export default function AboutPage() {
  const { isThreatMode, setThreatMode } = useThreatMode();

  const [jarvisUnlocked, setJarvisUnlocked] = useState(false);
  const [ultronUnlocked, setUltronUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Preloader effect
  useEffect(() => {
    // Hide scrollbar during loading to prevent flash
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const experiences = [
    {
      title: 'Forensic Knight',
      role: 'Digital Forensics Intern',
      subtitle: 'The Awakening',
      date: '2023',
      status: 'COMPLETED',
      icon: Building2,
      description: 'Began my journey into cybersecurity, analyzing digital evidence and understanding attack vectors.',
      details: [
        'Executed forensic investigations using Kali Linux artifact analysis.',
        'Analyzed malware behavior and file obfuscation techniques',
        'Learned MITRE ATT&CK and NIST frameworks for structured threat classification',
      ],
   },
    {
      title: 'LLM Researcher at PDEU',
      role: 'Research on LLM Security',
      subtitle: 'The Training',
      date: '2024',
      status: 'COMPLETED',
      icon: Microscope,
      description: 'Dove deep into Large Language Model vulnerabilities, exploring prompt injection attacks and defensive strategies.',
      details: [
        'Researched prompt injection vulnerabilities in LLMs',
        'Analyzed advanced defense strategies.',
        'Learned scientific writing and gap identification, translating findings into actionable security insights.',
      ],
    },
    {
      title: 'Research Intern at IIT Gandhinagar',
      role: 'Research Intern',
      subtitle: 'The Proving Ground',
      date: 'Summer 2024',
      status: 'COMPLETED',
      icon: GraduationCap,
      description: 'Advanced research internship focusing on AI safety protocols and quantum-resistant cryptography.',
      details: [
        'Developed the "QNI-CCP" hybrid Classical-Quantum framework for robust malware detection.',
        'Achieved 97% accuracy on a large-scale dataset.',
        'Evaluated models under adversarial conditions.',
      ],
    },
    {
      title: 'AI Researcher at PDEU',
      role: 'Independent Researcher',
      subtitle: 'The Expansion',
      date: '2024-2025',
      status: 'COMPLETED',
      icon: GraduationCap,
      description: 'Expanded research scope to include broader AI alignment challenges and ML security frameworks.',
      details: [
        'Developed "LODO" framework to sanitize malicious prompts.',
        'Engineered a detection pipeline using Sentence-BERT and XGBoost, achieving 96% accuracy.',
        'Extension work of Prompt Injection research.',
      ],
    },
    {
      title: ' Research Intern at IIT Gandhinagar (Current)',
      role: 'Advanced Research Intern',
      subtitle: 'The Deployment',
      date: '2025-Present',
      status: 'ACTIVE',
      icon: Activity,
      description: 'Currently engineering production-ready AI security solutions bridging theory with practice.',
      details: [
        'Proposed the novel QSLP framework for advanced malware classification.',
        'Validated framework performance and robustness on the Malevis dataset.',
        'Authored and submitted findings to a top ACM conference.',
      ],
    },
  ];

  return (
    <>
      {/* Preloader Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-6 border-4 border-cyan-500 border-t-transparent rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-cyan-400 text-xl tracking-widest mb-2"
            >
              Initiating Digital Lab Sequence...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-gray-400 text-sm"
            >
              Glad to have you here.
            </motion.p>
          </div>
        </motion.div>
      )}

      <motion.div
        animate={{ backgroundColor: isThreatMode ? '#150000' : '#050510' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="min-h-screen relative overflow-x-hidden"
      >
      {/* Fixed Ambient Glassmorphism Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orb 1 – Cyan (top-left) */}
        <motion.div
          animate={{
            y: isThreatMode ? [0, -20, 0] : [0, 20, 0],
            backgroundColor: isThreatMode ? 'rgba(239,68,68,0.10)' : 'rgba(6,182,212,0.10)',
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px]"
        />
        {/* Orb 2 – Purple (bottom-right) */}
        <motion.div
          animate={{
            y: isThreatMode ? [0, 20, 0] : [0, -20, 0],
            backgroundColor: isThreatMode ? 'rgba(220,38,38,0.10)' : 'rgba(168,85,247,0.10)',
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px]"
        />
        {/* Orb 3 – Blue / Crimson accent (centre-right) */}
        <motion.div
          animate={{
            y: isThreatMode ? [0, -15, 0] : [0, 15, 0],
            backgroundColor: isThreatMode ? 'rgba(185,28,28,0.07)' : 'rgba(59,130,246,0.05)',
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full blur-[100px]"
        />
      </div>

      {/* Shared Navigation Bar */}
      <Navbar />

      {/* Section 1: The Hero Identity Card */}
      <section className="relative px-6 pb-20 pt-8">
        <div className="max-w-6xl mx-auto w-full relative z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">

              {/* Left Column: Profile & Identity */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full ring-2 ring-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden">
                  <Image
                    src="/Images/kathan.jpeg"
                    alt="Kathan Vyas"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-6">
                  Kathan Vyas
                </h2>
                <p className="text-gray-400 text-lg mt-2">AI and Cybersecurity Researcher</p>
              </div>

              {/* Right Column: Core Directives */}
              <div className="flex flex-col gap-8">

                {/* Block 1: What I Do */}
                <div>
                  <span className="font-mono text-cyan-400 text-sm tracking-widest">WHAT I DO?</span>
                  <p className="text-gray-200 text-lg leading-relaxed mt-2">
                    I engineer intelligent and resilient solutions for complex problems. You can usually find me engaged in Artificial Intelligence or cybersecurity projects.
                  </p>
                </div>

                {/* Block 2: Vision */}
                <div>
                  <span className="font-mono text-purple-400 text-sm tracking-widest">VISION</span>
                  <p className="text-gray-200 text-lg leading-relaxed mt-2">
                    To contribute to the world by securing millions of lives and their billions of devices.
                  </p>
                </div>

                {/* Block 3: Mission */}
                <div>
                  <span className="font-mono text-blue-400 text-sm tracking-widest">MISSION</span>
                  <p className="text-gray-200 text-lg leading-relaxed mt-2">
                    Cultivating a digital landscape where technology empowers humanity without compromising security or privacy.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Origin Story (Iron Man Motivation) */}
      <section className="min-h-[70vh] flex items-center justify-center relative px-6 py-16 overflow-hidden">
        {/* Marvel/Iron Man Animated Background */}
        <div className="absolute inset-0">
          {/* Arc Reactor Pulse Rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 3, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-cyan-400/30"
              style={{
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
              }}
            />
          ))}

          {/* Energy Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -1000],
                x: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
              className="absolute bottom-0 w-1 h-1 rounded-full bg-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
              }}
            />
          ))}

          {/* Hexagonal Grid Pattern */}
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(30deg, transparent 48%, rgba(251, 191, 36, 0.1) 49%, rgba(251, 191, 36, 0.1) 51%, transparent 52%),
                linear-gradient(150deg, transparent 48%, rgba(251, 191, 36, 0.1) 49%, rgba(251, 191, 36, 0.1) 51%, transparent 52%),
                linear-gradient(90deg, transparent 48%, rgba(251, 191, 36, 0.1) 49%, rgba(251, 191, 36, 0.1) 51%, transparent 52%)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Central Arc Reactor Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
            }}
          />

          {/* Sparks/Light Trails */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-1/2 left-1/2 w-full h-1"
              style={{
                transformOrigin: '0% 50%',
              }}
            >
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-2 h-2 rounded-full bg-red-400 absolute right-0"
                style={{
                  boxShadow: '0 0 15px rgba(248, 113, 113, 0.8)',
                }}
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 bg-clip-text text-transparent"
          >
            A Motivated Child
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: The Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl border border-white/10 space-y-4"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">The Iron Man Legacy</h3>
              <p className="text-gray-300 leading-relaxed">
                As a huge fan of Tony Stark, I've always been inspired by his vision of creating technology that protects humanity. I want to build a <span className="text-cyan-400 font-semibold">JARVIS</span> that saves digital assets the way JARVIS saved Iron Man.
              </p>
              <p className="text-gray-300 leading-relaxed">
                But I also recognize the threat of <span className="text-red-400 font-semibold">Ultron</span> — the risk of misuse and uncontrolled AI. This duality drives everything I do.
              </p>
              <p className="text-purple-300 font-semibold italic text-lg mt-6">
                My goal: Build the Savior, kill the Destroyer (the way Iron Man do).
              </p>

              {/* Kill Ultron Dynamic Island + Jarvis Transmission */}
              <AnimatePresence>
                {isThreatMode && (
                  <motion.div
                    key="kill-ultron-group"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    className="flex flex-col items-start gap-4 pt-2"
                  >
                    {/* Jarvis Message Box */}
                    <div className="bg-blue-950/40 backdrop-blur-md border-l-4 border-cyan-400 p-4 rounded-r-2xl rounded-bl-2xl max-w-md">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"
                        />
                        <span className="font-mono text-cyan-400 text-xs tracking-widest">
                          &gt;_ INCOMING TRANSMISSION: J.A.R.V.I.S.
                        </span>
                      </div>
                      {/* Typewriter message */}
                      <p className="font-mono text-cyan-100 text-sm leading-relaxed">
                        <TypewriterText
                          text="Click on the KILL ULTRON button to save the universe."
                          trigger={isThreatMode}
                        />
                      </p>
                    </div>

                    {/* Kill Ultron Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setUltronUnlocked(false);
                        setThreatMode(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-black/80 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] text-cyan-400 font-mono font-bold tracking-widest text-sm cursor-pointer select-none"
                    >
                      <Shield className="w-4 h-4" />
                      KILL ULTRON
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Compact JARVIS vs ULTRON Module */}
            <div className="space-y-4">
              {/* JARVIS Card - Compact */}
              <motion.div
                layout
                onClick={() => {
                  setJarvisUnlocked(!jarvisUnlocked);
                  setThreatMode(false); // Deactivate threat mode
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`glass-effect p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  jarvisUnlocked 
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                    : 'border-cyan-500/30 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <h4 className="text-lg font-bold text-cyan-400 font-mono">J.A.R.V.I.S</h4>
                  </div>
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                
                {!jarvisUnlocked ? (
                  <p className="text-sm text-cyan-300">Click to unlock</p>
                ) : (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-1 flex flex-col gap-2"
                  >
                    {[
                      { href: '#', label: 'Researched Prompt Injection (Understanding Ultron)' },
                      { href: '#', label: 'Developed Malicious Prompt Classification & Sanitization Framework (Killing the Ultron)' },
                      { href: '#', label: 'Developed QNI-CCP Training (Strengthening Jarvis for future adversaries)' },
                    ].map(({ href, label }, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.35 }}
                      >
                        <Link
                          href={href}
                          onClick={(e) => e.stopPropagation()}
                          className="group flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono transition-all duration-200 hover:text-white hover:bg-cyan-500/20 hover:translate-x-1"
                        >
                          <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-400 group-hover:text-white" />
                          <span>
                            <DecryptText text={label} trigger={jarvisUnlocked} />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>

              {/* ULTRON Card - Compact */}
              <motion.div
                layout
                onClick={() => {
                  setUltronUnlocked(!ultronUnlocked);
                  setThreatMode(true); // Activate threat mode
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className={`glass-effect p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  ultronUnlocked 
                    ? 'border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.3)]' 
                    : 'border-red-500/30 hover:border-red-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <h4 className="text-lg font-bold text-red-400 font-mono">U.L.T.R.O.N</h4>
                  </div>
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                
                {!ultronUnlocked ? (
                  <p className="text-sm text-red-300">Click to unlock</p>
                ) : (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-1 flex flex-col gap-2"
                  >
                    {[
                      { label: 'Prompt Injection (Main Strength)' },
                      { label: 'Adversarial Attacks (Ultron on Steroids)' },
                    ].map(({ label }, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.35 }}
                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-red-400 font-mono border border-red-500/20 bg-red-500/5"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400 animate-pulse" />
                        <span>
                          <DecryptText text={label} trigger={ultronUnlocked} />
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Operational History - The Research Circuit */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Formative Experiences
            </h2>
            
            {/* System Uptime Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black/40 border border-cyan-500/30"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-sm md:text-base text-cyan-300 tracking-widest">
                Research Experience: 12 months and counting
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-cyan-400 font-mono"
              >
                _
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Horizontal Scrollable Circuit Track */}
          <div className="relative">
            {/* SVG Connecting Line with Pulse Animation */}
            <svg 
              className="absolute top-24 left-0 w-full h-1 hidden md:block pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
                </linearGradient>
                
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0)">
                    <animate attributeName="offset" values="0;1" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 1)">
                    <animate attributeName="offset" values="0.5;1.5" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0)">
                    <animate attributeName="offset" values="1;2" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              
              <line 
                x1="10%" 
                y1="0" 
                x2="90%" 
                y2="0" 
                stroke="url(#lineGradient)" 
                strokeWidth="2"
              />
              <line 
                x1="10%" 
                y1="0" 
                x2="90%" 
                y2="0" 
                stroke="url(#pulseGradient)" 
                strokeWidth="4"
                opacity="0.8"
              />
            </svg>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
              <div className="flex gap-8 min-w-max px-4 md:px-0 md:justify-center">

                {experiences.map((exp, index) => {
                  const isHovered = hoveredCard === index;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      viewport={{ once: true }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="relative flex-shrink-0 w-64 h-80 group"
                      style={{ zIndex: isHovered ? 10 : 1 }}
                    >
                      {/* Cyberpunk Card with Cut Corners */}
                      <motion.div
                        whileHover={{ y: -20, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full glass-effect rounded-lg overflow-hidden"
                        style={{
                          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                          background: isHovered 
                            ? 'rgba(15, 15, 35, 0.95)'
                            : 'rgba(15, 15, 25, 0.7)',
                          border: isHovered ? '2px solid rgba(34, 211, 238, 0.4)' : '2px solid rgba(168, 85, 247, 0.2)',
                        }}
                      >
                        {/* Top Section: Status */}
                        <div className="relative p-6 flex flex-col items-center">
                          {/* Status Badge */}
                          <div
                            className={`px-4 py-1.5 rounded-full border text-xs font-semibold ${
                              exp.status === 'ACTIVE' 
                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/60' 
                                : 'bg-purple-500/10 text-purple-300 border-purple-400/60'
                            }`}
                          >
                            {exp.status}
                          </div>
                        </div>

                        {/* Middle Section: Title & Role */}
                        <div className="px-6 pb-4 text-center">
                          <h3 className="text-xl font-bold text-cyan-400 mb-2 leading-tight">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-semibold text-purple-300 mb-1">
                            {exp.role}
                          </p>
                          <p className="text-xs text-gray-400">{exp.date}</p>
                        </div>

                        {/* Bottom Section: Details Panel (Slides up on hover) */}
                        <motion.div
                          initial={{ y: '100%', opacity: 0 }}
                          animate={{
                            y: isHovered ? 0 : '100%',
                            opacity: isHovered ? 1 : 0,
                          }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-black/80 p-6 pt-12"
                          style={{
                            clipPath: 'polygon(0 10%, 100% 10%, 100% 100%, 0 100%)',
                          }}
                        >
                          <h4 className="text-xs font-semibold text-cyan-300 mb-3">
                            Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {exp.details.slice(0, 3).map((detail, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isHovered ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2 text-xs text-gray-100 leading-relaxed"
                              >
                                <span className="text-cyan-300 mt-0.5">•</span>
                                <span>{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* More Link */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={isHovered ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="mt-4 pt-3 border-t border-cyan-400/30"
                          >
                            <a
                              href="#"
                              className="text-xs text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors"
                            >
                              Learn more →
                            </a>
                          </motion.div>
                        </motion.div>

                        {/* Corner Accent Lines */}
                        <div className="absolute top-0 right-0 w-20 h-0.5 bg-gradient-to-l from-cyan-400/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent" />
                      </motion.div>

                      {/* Connection Line to Next Card (hidden on last card) */}
                      {index < experiences.length - 1 && (
                        <motion.div
                          animate={{
                            opacity: isHovered || hoveredCard === index + 1 ? 1 : 0.3,
                          }}
                          className="absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 hidden md:block"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Hint (Mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="md:hidden text-center mt-4 text-gray-400 text-sm flex items-center justify-center gap-2"
            >
              <span>←</span>
              <span>Scroll to explore</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: The Trophy Case */}
      <section className="min-h-[60vh] flex items-center justify-center relative px-6 py-16">
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent"
          >
            Trophy Case
          </motion.h2>

          {/* Achievement Badges Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏆',
                title: 'The Quant Master',
                description: 'Perfect Score in GRE Quant',
                score: '170/170',
                color: 'from-yellow-500 to-amber-500',
                delay: 0.1,
              },
              {
                icon: '🥈',
                title: 'National Elite',
                description: 'Top 8% in JEE Mains',
                score: 'Top 8%',
                color: 'from-gray-400 to-gray-300',
                delay: 0.2,
              },
              {
                icon: '📜',
                title: 'The Researcher',
                description: '3 Publications',
                score: 'Elsevier/Taylor & Francis/IEE',
                color: 'from-blue-500 to-purple-500',
                delay: 0.3,
              },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: achievement.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass-effect p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="text-4xl mb-3 text-center">{achievement.icon}</div>
                <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                <p className="text-base font-semibold text-white">{achievement.score}</p>
                
                {/* Unlock Animation */}
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: achievement.delay + 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`h-1 mt-3 rounded-full bg-gradient-to-r ${achievement.color}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Footer */}
      <footer className="relative mt-12">
        <div className="w-full max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-[0_0_60px_rgba(168,85,247,0.15)] overflow-hidden"
          >
            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
              
              {/* Left Column: Identity & Socials */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    Kathan Vyas
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-300 font-semibold mb-1"
                  >
                    AI Security Researcher
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-400"
                  >
                    Final Year B.Tech, PDEU | Research Intern, IIT Gandhinagar
                  </motion.p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 flex-wrap">
                  {[
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/kathan-vyas-29b558253/', label: 'LinkedIn', color: 'hover:text-blue-400' },
                    { Icon: Github, href: 'https://github.com/KATHAN-VYAS', label: 'GitHub', color: 'hover:text-purple-400' },
                    { Icon: Mail, href: 'mailto:kathan61004@gmail.com', label: 'Email', color: 'hover:text-green-400' },
                    { Icon: Instagram, href: 'https://www.instagram.com/kathan_vyas_06/', label: 'Instagram', color: 'hover:text-pink-400' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={`glass-effect p-3 rounded-xl border border-white/20 transition-all ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Right Column: Opportunity CTA */}
              <div className="flex flex-col justify-center space-y-4 md:border-l md:border-purple-500/20 md:pl-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    Open to Research Positions in Leading Firms & Laboratories
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    Drop your email below to connect.
                  </p>
                </motion.div>

                {/* Email Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* TODO: Replace 'mlgwboya' with your actual Formspree form ID */}
                  <form 
                    action="https://formspree.io/f/mlgwboya" 
                    method="POST"
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-gray-200 placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all relative overflow-hidden"
                    >
                      {/* Pulse Animation */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 bg-cyan-400 rounded-lg"
                      />
                      <span className="relative z-10">Connect</span>
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-white/10 py-4 px-8">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center text-sm text-gray-500"
              >
                © 2026 Kathan Vyas. All rights reserved.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 glass-effect p-3 rounded-full border border-white/20 hover:border-purple-500 transition-all group z-50"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg"
        >
          ↑
        </motion.div>
      </motion.button>
    </motion.div>
    </>
  );
}
