'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'project-1',
    indexLabel: 'Quantum Machine Learning, Adversarial ML, Deep Learning, Malware classification',
    title: 'Project Alpha: Adversarially Robust Quantum-Classical Neural Network for Malware Detection',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    image: '/Images/img1 QML.png',
    lab: '5G usecase lab, IIT Gandhinagar',
    supervisor: 'Dr. Sameer G. Kulkarni',
    Publication: 'Submitted at ACM ASIACCS',
    abstract:
      'I developed QSLP, a hybrid quantum–classical framework for image-based malware detection designed to improve robustness against evolving and adversarial threats. The model integrates a novel latent-space defense mechanism, QNI-CCP, with a quantum neural layer and adversarial training. By combining latent-space perturbation and pixel-level defense, QSLP enhances generalization and resilience under FGSM and PGD attacks. This work explores practical quantum advantage for secure AI systems in the NISQ era.',
    keyContributions:[
        'Designed QSLP, a unified hybrid quantum–classical architecture for robust image-based malware detection.',
        'Proposed QNI-CCP, a novel class-aware latent-space perturbation defense before quantum processing.',
        'Integrated dual-level robustness using latent-space defense and adversarial training (FGSM, PGD).',
        'Performed systematic benchmarking of CNN, QNN, and hybrid models under adversarial settings.',
        'Analyzed trade-offs between quantum expressivity, robustness, and computational overhead in NISQ devices.',

    ],
      
    detailedInfo: [
      {
        question: 'What is Quantum Machine Learning?',
        answer:
          'Quantum Machine Learning (QML) is an interdisciplinary field that combines quantum computing with machine learning. It leverages quantum phenomena such as superposition and entanglement to potentially speed up learning algorithms. In the NISQ era, QML explores whether small quantum circuits can provide meaningful advantages over classical counterparts for tasks like classification, anomaly detection, and feature extraction.',
      },
      {
        question: 'Why Quantum Machine Learning?',
        answer:
          'Classical ML models face scalability and robustness challenges as adversarial threats grow in complexity. QML offers a richer, higher-dimensional hypothesis space through quantum feature maps, which may improve model expressivity and resistance to adversarial perturbations. Our research investigates whether this quantum advantage translates to practical security benefits in malware detection.',
      },
      {
        question: 'What is an adversarial attack?',
        answer:
          'An adversarial attack is a deliberate manipulation of input data — often imperceptible to humans — designed to cause a machine learning model to make a wrong prediction. Common attacks include FGSM (Fast Gradient Sign Method), which adds a small perturbation in the gradient direction, and PGD (Projected Gradient Descent), a stronger iterative variant. In malware detection, adversarial attacks can disguise malicious files as benign ones.',
      },
      {
        question: 'Has anyone previously used Quantum Machine Learning for security?',
        answer:
          'Prior work has explored QML for tasks like anomaly detection and intrusion detection at a theoretical or simulation level. However, most existing studies do not directly address adversarial robustness in the context of malware classification. Our work is among the first to explicitly benchmark hybrid quantum–classical models under both FGSM and PGD adversarial settings on a real malware image dataset.',
      },
      {
        question: 'How can classical data be converted to quantum data?',
        answer:
          'Classical data is encoded into a quantum state using a process called amplitude encoding or angle encoding. In angle encoding, each classical feature value is mapped to the rotation angle of a qubit gate (e.g., RX, RY, RZ rotations). Our framework extracts a compact latent vector from a classical CNN and feeds it into a parameterized quantum circuit (PQC) via angle encoding, effectively translating CNN features into qubit rotations.',
      },
      {
        question: 'How did we use the quantum device?',
        answer:
          'Due to current hardware noise and qubit limitations, we used PennyLane with a statevector simulator for training and validation. The quantum layer was implemented as a parameterized quantum circuit (PQC) composed of rotation gates and entangling CNOT gates. This simulated quantum environment allowed us to benchmark performance reliably before any planned migration to real NISQ hardware.',
      },
      {
        question: 'How many qubits did we use?',
        answer:
          'We used 6 qubits and 10 qubits based on the datasets. Increasing qubit count exponentially raises simulation cost and introduces more decoherence and gate error on real hardware. We constrained our design to stay within practical NISQ-era limits while still capturing meaningful quantum correlations.',
      },
      {
        question: 'Which datasets were used in this study?',
        answer:
          'I am currently evaluating QSLP on various datasets. For now results on the Malimg and the Malevis datasets are available. Both datasets are available on the GitHub.',
      },
    ],

    results: {
      barChart: {
        malimg: [
          { condition: 'Normal', 'Baseline H-QNN': 95, 'QNI-CCP': 97, QSLP: 93 },
          { condition: 'FGSM',   'Baseline H-QNN': 59, 'QNI-CCP': 58, QSLP: 89 },
          { condition: 'PGD',    'Baseline H-QNN':  9, 'QNI-CCP': 11, QSLP: 81 },
        ],
        malevis: [
          { condition: 'Normal', 'Baseline H-QNN': 81, 'QNI-CCP': 81, QSLP: 82 },
          { condition: 'FGSM',   'Baseline H-QNN': 38, 'QNI-CCP': 11, QSLP: 75 },
          { condition: 'PGD',    'Baseline H-QNN':  5, 'QNI-CCP':  4, QSLP: 69 },
        ],
      },
      patternTable: [
        { metric: 'Entropy',              malimgCNN: '2.5300', malimgQNI: '2.5215', malimgHQNN: '2.5452', malevisCNN: '3.0966', malevisQNI: '3.1137', malevisHQNN: '3.0901', highlight: '' },
        { metric: 'Feature Variance',     malimgCNN: '7.7084', malimgQNI: '0.0996', malimgHQNN: '0.1274', malevisCNN: '0.3746', malevisQNI: '0.0269', malevisHQNN: '0.0404', highlight: 'qni' },
        
        { metric: 'High-conf. patterns',  malimgCNN: '78.1%',  malimgQNI: '99.4%',  malimgHQNN: '73.7%',  malevisCNN: '74.8%',  malevisQNI: '61.3%',  malevisHQNN: '54.8%',  highlight: '' },
        
      ],
    },

    additionalInfo: [
      'Technologies used: Python, PyTorch, Qiskit.',
      'Published in XYZ Conference Proceedings, 2025.',
      'Open-source repository available on GitHub.',
    ],
  },
  {
    id: 'project-2',
    indexLabel: 'Project Beta',
    title: 'Project Beta: Adversarial Robustness in LLMs',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    keyContributions: [
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Extensive literature review on adversarial robustness in large language models.',
    ],
    detailedInfo: [
      {
        question: 'Extensive literature review on advanced persistence threats.',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We surveyed over 200 papers spanning 2018–2024, cataloguing attack vectors, evasion techniques, and existing detection methodologies. Key themes included fileless malware, living-off-the-land binaries, and supply-chain compromise patterns.',
      },
      {
        question: 'Data collection and preprocessing of 10,000+ malware samples.',
        answer:
          'Samples were sourced from VirusTotal and MalwareBazaar, covering 15 malware families. Preprocessing steps included static feature extraction (imports, entropy, section metadata), dynamic sandbox traces, and normalization pipelines to ensure consistent input dimensionality across all model architectures.',
      },
      {
        question: 'Architectural design of the detection framework.',
        answer:
          'The framework adopts a multi-stage pipeline: (1) a feature extractor based on a fine-tuned ResNet backbone, (2) an attention module to highlight discriminative regions, and (3) a lightweight classifier head. The design prioritizes inference speed suitable for real-time endpoint deployment.',
      },
    ],
    additionalInfo: [
      'Technologies used: Python, PyTorch, Qiskit.',
      'Published in XYZ Conference Proceedings, 2025.',
      'Open-source repository available on GitHub.',
    ],
  },
  {
    id: 'project-3',
    indexLabel: 'Project Gamma',
    title: 'Project Gamma: Federated Security Protocols',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    keyContributions: [
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Federated protocol design for distributed security enforcement across heterogeneous nodes.',
    ],
    detailedInfo: [
      {
        question: 'Extensive literature review on advanced persistence threats.',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We surveyed over 200 papers spanning 2018–2024, cataloguing attack vectors, evasion techniques, and existing detection methodologies. Key themes included fileless malware, living-off-the-land binaries, and supply-chain compromise patterns.',
      },
      {
        question: 'Data collection and preprocessing of 10,000+ malware samples.',
        answer:
          'Samples were sourced from VirusTotal and MalwareBazaar, covering 15 malware families. Preprocessing steps included static feature extraction (imports, entropy, section metadata), dynamic sandbox traces, and normalization pipelines to ensure consistent input dimensionality across all model architectures.',
      },
      {
        question: 'Architectural design of the detection framework.',
        answer:
          'The framework adopts a multi-stage pipeline: (1) a feature extractor based on a fine-tuned ResNet backbone, (2) an attention module to highlight discriminative regions, and (3) a lightweight classifier head. The design prioritizes inference speed suitable for real-time endpoint deployment.',
      },
    ],
    additionalInfo: [
      'Technologies used: Python, PyTorch, Qiskit.',
      'Published in XYZ Conference Proceedings, 2025.',
      'Open-source repository available on GitHub.',
    ],
  },
];

// ─── Results Section ─────────────────────────────────────────────────────────

type ResultsData = NonNullable<(typeof projects)[number]['results']>;

const BAR_COLORS = {
  'Baseline H-QNN': '#2252ee',
  'QNI-CCP':        '#e68bfa',
  QSLP:             '#fa608e',
} as const;

function ResultsSection({ results }: { results: ResultsData }) {
  const [dataset, setDataset] = useState<'malimg' | 'malevis'>('malimg');
  const chartData = results.barChart[dataset];

  const tableDataset = dataset; // shared toggle for both chart & table

  const tableColumns =
    tableDataset === 'malimg'
      ? [
          { header: 'CNN',   key: 'malimgCNN'  as const },
          { header: 'QNI',   key: 'malimgQNI'  as const },
          { header: 'H-QNN', key: 'malimgHQNN' as const },
        ]
      : [
          { header: 'CNN',   key: 'malevisCNN'  as const },
          { header: 'QNI',   key: 'malevisQNI'  as const },
          { header: 'H-QNN', key: 'malevisHQNN' as const },
        ];

  // Shared dataset toggle pill
  const DatasetToggle = () => (
    <div className="flex rounded-xl overflow-hidden border border-white/10 text-xs font-mono shrink-0">
      {(['malimg', 'malevis'] as const).map((ds) => (
        <button
          key={ds}
          onClick={() => setDataset(ds)}
          className={`px-3 py-1.5 transition-colors ${
            dataset === ds ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
          }`}
        >
          {ds.charAt(0).toUpperCase() + ds.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full">

      {/* ── Bar Chart ── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-white font-semibold text-sm">Accuracy Under Adversarial Conditions</h3>
          <DatasetToggle />
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barCategoryGap="28%" barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="condition"
              tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
              width={38}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{
                background: 'rgba(10,10,30,0.9)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: 11,
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${value ?? ''}%`]}
            />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', paddingTop: 10 }}
            />
            {(Object.keys(BAR_COLORS) as (keyof typeof BAR_COLORS)[]).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={BAR_COLORS[key]}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Pattern Learning Table ── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 overflow-x-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-white font-semibold text-sm">Pattern Learning Analysis</h3>
          <DatasetToggle />
        </div>

        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr>
              <th className="text-left text-gray-500 uppercase tracking-widest pb-2 pr-3">Metric</th>
              {tableColumns.map(({ header }, i) => (
                <th
                  key={i}
                  className={`text-center pb-2 px-2 ${
                    tableDataset === 'malimg' ? 'text-cyan-400' : 'text-purple-400'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.patternTable.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
              >
                <td className="py-2 pr-3 text-gray-300 whitespace-nowrap">{row.metric}</td>
                {tableColumns.map(({ key }, j) => {
                  const isQni = key.toLowerCase().includes('qni') && row.highlight === 'qni';
                  return (
                    <td
                      key={j}
                      className={`text-center py-2 px-2 ${
                        isQni ? 'text-cyan-300 font-bold' : 'text-gray-400'
                      }`}
                    >
                      {row[key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-gray-600 text-[10px]">
          <span className="text-gray-400">Note: </span>
          H-QNN: basic hybrid quantum-classical model &nbsp;·&nbsp;
          QNI: QNI-CCP trained &nbsp;·&nbsp; CNN: Classical model
        </p>
      </div>

    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-200 font-semibold hover:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5">{children}</div>
      </motion.div>
    </div>
  );
}

function ResearchSection({
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
      {/* Title */}
      <span className={`font-mono text-sm block mb-2 ${project.accentColor}`}>
        {'// ' + project.indexLabel.toUpperCase()}
      </span>
      <h2 className="text-3xl font-bold text-white">
        {project.title.includes(': ') ? project.title.split(': ')[1] : project.title}
      </h2>

      {/* Image */}
      <div className="w-full aspect-[21/9] relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden mt-8">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-mono">
            [ Image Placeholder ]
          </div>
        )}
      </div>

      {/* Fixed topic: Abstract */}
      <div className={`mt-8 border-l-2 ${project.borderColor} pl-5`}>
        <h3 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
          Abstract
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">{project.abstract}</p>
      </div>

      {/* Fixed topic: Key Contributions */}
      <div className={`mt-6 border-l-2 ${project.borderColor} pl-5`}>
        <h3 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
          Key Contributions
        </h3>
        <ul className="mt-2 flex flex-col gap-2">
          {(project.keyContributions as string[]).map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Collapsibles */}
      <div className="mt-6 flex flex-col gap-3">
        <Collapsible title="Detailed Explaination">
          <div className="flex flex-col gap-2 mt-1">
            {project.detailedInfo.map((item, i) => (
              <Collapsible key={i} title={item.question}>
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </Collapsible>
            ))}
          </div>
        </Collapsible>

        <Collapsible title="Additional Info">
          <ul className="list-disc pl-5 text-gray-400 space-y-2 text-sm mt-1">
            {project.additionalInfo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Collapsible>
      </div>

      {/* Results */}
      {'results' in project && project.results && (
        <div className="mt-6">
          <h3 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">Results</h3>
          <ResultsSection results={project.results} />
        </div>
      )}
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-16">
            Research
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl">
          
          </p>
        </motion.div>

        {/* Grid: research content + minimalist sticky index */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] xl:grid-cols-[1fr_200px] gap-16 md:gap-24">

          {/* Research sections */}
          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <ResearchSection key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Minimalist sticky index — timeline style */}
          <aside className="sticky top-32 h-fit border-l border-white/10 pl-6 py-2 hidden lg:block">
            <p className="text-xs tracking-[0.2em] text-gray-600 font-mono mb-6">INDEX</p>
            <nav className="flex flex-col">
              {projects.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="block text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-300 mt-4 truncate"
                >
                  {p.indexLabel}
                </a>
              ))}
            </nav>
          </aside>

        </div>
      </div>
    </main>
  );
}
