'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Instagram, MapPin, Send, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';

// ─── Data ─────────────────────────────────────────────────────────────────────

const socials = [
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    handle: 'kathan-vyas-29b558253',
    description: 'Research updates, publications & professional milestones.',
    href: 'https://www.linkedin.com/in/kathan-vyas-29b558253/',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-[0_0_28px_rgba(96,165,250,0.18)]',
    hoverBorder: 'hover:border-blue-400/60',
  },
  {
    Icon: Github,
    label: 'GitHub',
    handle: 'KATHAN-VYAS',
    description: 'Open-source projects, research code & experiments.',
    href: 'https://github.com/KATHAN-VYAS',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-[0_0_28px_rgba(168,85,247,0.18)]',
    hoverBorder: 'hover:border-purple-400/60',
  },
  {
    Icon: Mail,
    label: 'Email',
    handle: 'kathan61004@gmail.com',
    description: 'Best for research collaborations, internships & proposals.',
    href: 'mailto:kathan61004@gmail.com',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]',
    hoverBorder: 'hover:border-cyan-400/60',
  },
  {
    Icon: Instagram,
    label: 'Instagram',
    handle: 'kathan_vyas_06',
    description: 'Behind-the-scenes, life beyond the lab.',
    href: 'https://www.instagram.com/kathan_vyas_06/',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'hover:shadow-[0_0_28px_rgba(244,114,182,0.18)]',
    hoverBorder: 'hover:border-pink-400/60',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReveal, setShowReveal] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
      setTimeout(() => setShowReveal(true), 400);
    }, 3000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mlgwboya', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormState('sent');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

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
              Opening Channels...
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

      <main className="w-full min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Ambient orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px]"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px]"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20">

          {/* ── Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl leading-[1.12] font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent pb-2">
              Connect{' '}
              <span className={`reveal-text${showReveal ? ' visible' : ''}`}>
                and save the world together!
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-xl">
              <span className="block">Incoming M.Eng Cybersecurity @ University of Maryland (Fall 2026)</span>
              <span className="block">Research Intern @ IIT Gandhinagar</span>
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              <span className="font-mono text-xs text-green-400 tracking-widest">OPEN TO RESEARCH POSITIONS &amp; COLLABORATIONS</span>
            </div>
          </motion.div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── LEFT: Social Cards ── */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase mb-6">Find me on</p>
                <div className="flex flex-col gap-4">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className={`group flex items-center gap-5 bg-white/5 backdrop-blur-sm border ${s.border} ${s.hoverBorder} ${s.glow} rounded-2xl px-5 py-4 transition-all duration-300`}
                    >
                      <div className={`shrink-0 p-3 rounded-xl bg-white/5 border ${s.border} group-hover:bg-white/10 transition-colors`}>
                        <s.Icon size={22} className={s.accent} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{s.label}</span>
                          <ExternalLink size={11} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                        </div>
                        <p className={`font-mono text-xs mt-0.5 ${s.accent}`}>{s.handle}</p>
                        <p className="text-gray-500 text-xs mt-1 leading-snug">{s.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-3 text-gray-500 font-mono text-sm"
              >
                <MapPin size={14} className="text-cyan-400 shrink-0" />
                <span>India &nbsp;·&nbsp; IST (UTC+5:30)</span>
              </motion.div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col gap-6 self-start"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">Send a message</p>
                <h2 className="text-2xl font-bold text-white">Drop me a line</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Research proposals, collaborations, internship leads — all welcome.
                </p>
              </div>

              {formState === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <Send size={20} className="text-green-400" />
                  </div>
                  <p className="text-green-400 font-semibold">Message sent!</p>
                  <p className="text-gray-500 text-sm text-center">I&apos;ll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-2 text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-gray-500 tracking-widest uppercase">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="bg-black/40 border border-white/10 focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 font-mono text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-gray-500 tracking-widest uppercase">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="bg-black/40 border border-white/10 focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 font-mono text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-gray-500 tracking-widest uppercase">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Research collaboration / Internship / General"
                      className="bg-black/40 border border-white/10 focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 font-mono text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-gray-500 tracking-widest uppercase">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, idea or opportunity..."
                      className="bg-black/40 border border-white/10 focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 font-mono text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="text-red-400 font-mono text-xs">Something went wrong — please try emailing directly.</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={formState === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 disabled:opacity-60"
                  >
                    {formState === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>

          {/* ── Footer note ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center text-gray-600 font-mono text-xs mt-20"
          >
            © 2026 Kathan Vyas · All rights reserved
          </motion.p>

        </div>
      </main>
    </>
  );
}
