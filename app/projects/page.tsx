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
    supervisor: 'Dr. Jane Mitchell',
    techStack: 'Python · Scrapy · Redis · PostgreSQL · Docker',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    glowColor: 'rgba(34,211,238,0.15)',
    image: null as string | null,
    overview:
      'CredCrawler is a modular, scalable web-crawling framework engineered to discover and audit publicly exposed credential endpoints across large organizational domains. It employs multi-threaded Scrapy spiders with Redis-based distributed queuing to process thousands of URLs concurrently. The system incorporates automated heuristic-based detection for sensitive data patterns — including API keys, JWT tokens, and OAuth secrets — and persists results in a structured PostgreSQL schema enabling downstream audit reporting and trend analysis.',
    demo: '#',
    learnMore: '#',
  },
  {
    id: 'neuralvault',
    sidebarLabel: 'NeuralVault',
    title: '2. Project: NeuralVault',
    supervisor: 'Dr. Arun Patel',
    techStack: 'PyTorch · FastAPI · AES-256 · React · TypeScript',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    glowColor: 'rgba(168,85,247,0.15)',
    image: null as string | null,
    overview:
      'NeuralVault is an encrypted model storage and versioning system designed to protect proprietary machine learning artifacts throughout their lifecycle. It wraps PyTorch model checkpoints with AES-256-GCM encryption before persisting them to a content-addressable store. A FastAPI backend exposes a RESTful interface for model upload, retrieval, and provenance tracking, while a React dashboard provides visual diff tooling to compare checkpoint performance metrics across versions. Access control is enforced via scoped JWT tokens and role-based permissions.',
    demo: '#',
    learnMore: '#',
  },
  {
    id: 'sentinelbot',
    sidebarLabel: 'SentinelBot',
    title: '3. Project: SentinelBot',
    supervisor: 'Dr. Priya Sharma',
    techStack: 'Node.js · Discord.js · Elasticsearch · Grafana · Terraform',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    glowColor: 'rgba(96,165,250,0.15)',
    image: null as string | null,
    overview:
      'SentinelBot is an autonomous security monitoring agent deployed across multi-tenant cloud infrastructure. It ingests log streams from Elasticsearch, applies rule-based and ML-driven anomaly detection, and dispatches real-time alerts to Slack and Discord channels with contextual incident summaries. Terraform modules enable reproducible deployment across AWS and GCP environments. The Grafana integration surfaces live threat dashboards, MTTR trends, and compliance reporting for SOC analysts.',
    demo: '#',
    learnMore: '#',
  },
  {
    id: 'dataforge',
    sidebarLabel: 'DataForge',
    title: '4. Project: DataForge',
    supervisor: 'Dr. Vikram Mehta',
    techStack: 'Apache Spark · Airflow · dbt · Snowflake · Kubernetes',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/40',
    glowColor: 'rgba(139,92,246,0.15)',
    image: null as string | null,
    overview:
      'DataForge is a cloud-native ELT pipeline orchestration framework built to handle petabyte-scale data ingestion workflows. It uses Apache Airflow for scheduling, Apache Spark for distributed transformation, and dbt for modular SQL-based data modeling against a Snowflake warehouse. Kubernetes manages worker autoscaling, ensuring cost efficiency during off-peak hours while maintaining sub-minute SLAs for critical pipelines. Schema evolution, lineage tracking, and data quality assertions are first-class citizens of the framework design.',
    demo: '#',
    learnMore: '#',
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
            className="w-full h-auto object-contain block"
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
