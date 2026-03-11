'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function FallbackToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 border border-cyan-500/40 text-cyan-300 font-mono text-sm px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.15)] whitespace-nowrap pointer-events-none"
        >
          Additional info will be added soon
        </motion.div>
      )}
    </AnimatePresence>
  );
}
