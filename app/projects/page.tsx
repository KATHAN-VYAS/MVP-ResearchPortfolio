'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Monitor, User, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'credcrawler',
    sidebarLabel: 'CredCrawler',
    title: '1. Project: CredCrawler',
    supervisor: 'Ms. Aashka Raval',
    techStack: 'Python · Scrapy · Tor · Selenium  · BeautifulSoup4 · SMTP',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    glowColor: 'rgba(34,211,238,0.15)',
    image: '/Images/project1.png' as string | null,
    overview:
      'a Python-based crawler that monitors Tor (.onion) sites to detect leaked credentials. It routes traffic through the Tor SOCKS5h proxy, then crawls pages (either via Selenium+Firefox for dynamic browsing or via requests for HTTP fetching) and spiders new links in a BFS-like manner. The crawler scans fetched HTML using regex to identify email:password-style patterns. When matches are found, it hashes the credentials with SHA-256 (avoids storing plaintext) and can send real-time alerts via Gmail SMTP.',
    demo: '#',
    learnMore: 'https://github.com/KATHAN-VYAS/CredScan',
  },
  {
    id: 'neuralvault',
    sidebarLabel: 'SensoGuard',
    title: '2. Project: SensoGuard',
    supervisor: 'Dr. Davinder Paul Singh',
    techStack: 'C++ · ESP8266 · Supabase · Next.js · MPU-6050 · HX711 · MAX30102',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    glowColor: 'rgba(168,85,247,0.15)',
    image: '/Images/project2.png' as string | null,
    overview:
      'SensoGuard is a wearable IoT health monitoring system that fuses multi-sensor data from motion (MPU-6050), load sensing (HX711), and pulse-oximetry (MAX30102) using an ESP8266-based edge device with non-blocking polling for continuous monitoring. The system streams physiological data to a cloud backend where event-driven Supabase Edge Functions perform real-time anomaly detection and automatically trigger alerts for critical conditions such as falls or abnormal vitals. A real-time Next.js dashboard provides remote monitoring and visualization for caregivers. The architecture and system design have been filed for a patent as a hybrid edge-cloud wearable health monitoring solution.',
    demo: '#',
    learnMore: 'https://docs.google.com/document/d/1V2e4RnXn9ieJBUHGZoDACiYffdwpBVnc/edit?usp=sharing&ouid=103978514576980005044&rtpof=true&sd=true',
  },
  {
    id: 'sentinelbot',
    sidebarLabel: 'Automated Reconnaissance',
    title: '3. Project: Automated Reconnaissance',
    supervisor: 'Unsupervised',
    techStack: 'Streamlit · Nmap · Selenium · DNSDumpster · stdlib',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    glowColor: 'rgba(96,165,250,0.15)',
    image: '/Images/project3.png' as string | null,
    overview:
      'This is a automated Domain Reconnaissance Tool that streamlines critical information-gathering steps used in cybersecurity assessments. The system integrates DNS enumeration, subdomain discovery, traceroute analysis, port scanning, SSL inspection, and geolocation into a single workflow. Using APIs, Nmap scripts, and automated web scraping, it collects intelligence and generates a structured PDF reconnaissance report. This tool reduces manual reconnaissance effort while providing security analysts with rapid, actionable insights about a target domain.',
    demo: '#',
    learnMore: '#',
  },
  {
    id: 'dataforge',
    sidebarLabel: 'Forensight',
    title: '4. Project: Forensight',
    supervisor: 'Dr. Rutvij Jhaveri',
    techStack: 'Python · Flask · JavaScript · Scikit-learn · TensorFlow · MongoDB ',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/40',
    glowColor: 'rgba(139,92,246,0.15)',
    image: '/Images/project4.png' as string | null,
    overview:
      'ForenSight is a cyber triage platform designed to accelerate digital forensic investigations by automating evidence collection, analysis, and threat prioritization. The system integrates disk imaging, hashing, log analysis, and network activity inspection to rapidly surface indicators of compromise. AI/ML-based anomaly detection assigns risk scores to suspicious artifacts, helping investigators focus on high-impact threats first. It also generates structured, exportable forensic reports, enabling faster incident response and collaborative investigations.',
    demo: '#',
    learnMore: 'https://github.com/KATHAN-VYAS/ForenSight',
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.section
      id={project.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-80px' }}
      className="scroll-mt-28"
    >
      {/* Project Title */}
      <h2 className="text-3xl font-bold text-white mb-5">{project.title}</h2>

      {/* Metadata */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 font-mono text-sm">
        <div className="flex items-center gap-2">
          <User size={14} className={project.accentColor} />
          <span className={project.accentColor}>Supervisor:</span>
          <span className="text-gray-300">{project.supervisor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers size={14} className={project.accentColor} />
          <span className={project.accentColor}>Tech Stack:</span>
          <span className="text-gray-300">{project.techStack}</span>
        </div>
      </div>

      {/* Overview */}
      <div className={`border-l-2 ${project.borderColor} pl-5 mb-8`}>
        <h3 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
          Overview
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">{project.overview}</p>
      </div>

      {/* Image Container */}
      {project.image ? (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            width={1920}
            height={1080}
            className="w-full h-auto block"
          />
        </div>
      ) : (
        <div className="w-full aspect-video flex items-center justify-center bg-white/5 border border-gray-800 rounded-2xl overflow-hidden">
          <span className={`font-mono text-sm ${project.accentColor} opacity-50`}>
            [ Screenshot Placeholder ]
          </span>
        </div>
      )}

      {/* Action Links */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
        <a
          href={project.demo}
          className={`inline-flex items-center gap-2 text-sm font-mono font-semibold ${project.accentColor} hover:opacity-70 transition-opacity duration-200`}
        >
          <Monitor size={15} />
          Demo
        </a>
        <a
          href={project.learnMore}
          className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors duration-200"
        >
          Learn more&hellip;
          <ExternalLink size={13} />
        </a>
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReveal, setShowReveal] = useState(false);

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
              Loading Projects...
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent pb-2">
            Projects{' '}
            <span className={`reveal-text${showReveal ? ' visible' : ''}`}>
              that solves problems.
            </span>
          </h1>
        </motion.div>

        {/* Grid: Left Sticky Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] xl:grid-cols-[200px_1fr] gap-8 lg:gap-16">

          {/* ── Left Sticky Sidebar ── */}
          <aside className="sticky top-32 z-50 hidden lg:block self-start">
            <div className="relative w-[180px] xl:w-[200px]">
              {/* Expanding glass card — anchored left, grows rightward on hover */}
              <div className="group absolute left-0 top-0 flex flex-col items-start bg-[#0a0f1c]/95 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden w-[180px] hover:w-[340px] shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <p className="text-xs tracking-[0.2em] text-gray-500 font-mono mb-4 whitespace-nowrap transition-colors group-hover:text-cyan-400">
                  INDEX
                </p>
                <nav className="flex flex-col gap-4 w-full">
                  {projects.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      className="block text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {p.sidebarLabel}
                    </a>
                  ))}
                </nav>
              </div>
              {/* Invisible spacer — keeps the aside column height */}
              <div className="invisible p-5">
                <p className="text-xs mb-4">INDEX</p>
                {projects.map((p) => (
                  <p key={p.id} className="text-sm mb-4">
                    {p.sidebarLabel}
                  </p>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Right Content ── */}
          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
