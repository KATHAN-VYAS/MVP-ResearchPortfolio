'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ConnectPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full mx-auto"
        >
          <div className="glass-effect rounded-3xl p-12 md:p-16 border border-white/10 hover:border-white/20 transition-all duration-500 text-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
              className="inline-block mb-8"
            >
              <MessageCircle className="w-20 h-20 text-cyan-400" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Connect
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                Pages are under development
              </p>
              <p className="text-xl md:text-2xl text-gray-400">
                Content will update soon
              </p>
              <p className="text-lg text-gray-500 italic">
                Thank you for your patience.
              </p>
            </motion.div>

            <motion.div
              animate={{ 
                width: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-10 rounded-full"
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
