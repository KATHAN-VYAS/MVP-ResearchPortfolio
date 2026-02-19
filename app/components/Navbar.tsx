'use client';

import { motion } from 'framer-motion';
import { Menu, X, Shield, Skull } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useThreatMode } from '../contexts/ThreatContext';

const navItems = [
  { label: 'About me', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Other Projects', href: '/projects' },
  { label: 'Connect', href: '/connect' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isThreatMode } = useThreatMode();

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`glass-effect rounded-full px-6 py-4 flex items-center justify-between border transition-all duration-500 ${
            isThreatMode 
              ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
              : 'border-white/10 hover:border-white/20'
          }`}>
            {/* Logo */}
            <Link href="/" className="cursor-pointer">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                {/* Icon - changes based on threat mode */}
                <motion.div
                  animate={isThreatMode ? { 
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={isThreatMode ? {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {}}
                >
                  {isThreatMode ? (
                    <Skull className="w-6 h-6 text-red-500" />
                  ) : (
                    <Shield className="w-6 h-6 text-cyan-500" />
                  )}
                </motion.div>

                <span className={`font-bold text-lg bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
                  isThreatMode
                    ? 'from-red-400 to-orange-400'
                    : 'from-purple-400 to-blue-400'
                }`}>
                  Kathan Vyas
                </span>
              </motion.div>
            </Link>
              
              {/* Threat Badge */}
              {isThreatMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="px-2 py-1 rounded-full bg-red-500/20 border border-red-500/50 ml-2"
                >
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wide">
                    THREAT DETECTED!
                  </span>
                </motion.div>
              )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r group-hover:w-full transition-all duration-300 ${
                    isThreatMode
                      ? 'from-red-500 to-orange-500'
                      : 'from-purple-500 to-blue-500'
                  }`}></span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: -20 },
            }}
            className={`md:hidden mt-4 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
          >
            <div className="glass-effect rounded-2xl p-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24" />
    </>
  );
}
