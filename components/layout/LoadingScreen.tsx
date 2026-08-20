"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          <motion.div
            className="relative w-16 h-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 rounded-full border border-amber-gold/30" />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-amber-gold border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-amber-gold text-xs font-bold tracking-widest">E</span>
            </div>
          </motion.div>
          <motion.p
            className="mt-8 text-sm tracking-[0.3em] uppercase text-warm-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Eureka
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
