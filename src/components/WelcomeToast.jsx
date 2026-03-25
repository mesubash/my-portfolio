import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import greetings from '../data/greetings';

const AUTO_HIDE_MS = 7000;

const WelcomeToast = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !greetings) return;

    let chosen = null;
    if (Array.isArray(greetings)) {
      if (greetings.length === 0) return;
      chosen = greetings[Math.floor(Math.random() * greetings.length)];
    } else if (typeof greetings === 'object') {
      const categories = Object.keys(greetings).filter(k => Array.isArray(greetings[k]) && greetings[k].length > 0);
      if (categories.length === 0) return;
      const cat = categories[Math.floor(Math.random() * categories.length)];
      chosen = greetings[cat][Math.floor(Math.random() * greetings[cat].length)];
    }

    if (!chosen) return;
    setMessage(chosen);

    const enter = setTimeout(() => setVisible(true), 500);
    hideTimer.current = setTimeout(() => handleClose(true), AUTO_HIDE_MS + 500);

    return () => { clearTimeout(enter); clearTimeout(hideTimer.current); };
  }, []);

  const handleClose = (fromAuto = false) => {
    setVisible(false);
    if (!fromAuto) clearTimeout(hideTimer.current);
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-6 z-50 w-72 max-w-[calc(100vw-2rem)]"
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative bg-dark-950/90 backdrop-blur-xl text-white rounded-xl shadow-2xl shadow-black/30 border border-white/[0.06] overflow-hidden">
            {/* Accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 to-pink-500" />

            <div className="p-4 pl-5 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                {typeof message === 'string' ? (
                  <p className="text-sm font-medium leading-snug text-gray-200">{message}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium leading-snug text-gray-200">{message.text}</p>
                    {message.author && (
                      <p className="text-xs text-gray-500 mt-1">&mdash; {message.author}</p>
                    )}
                  </>
                )}
              </div>

              <button
                onClick={() => handleClose(false)}
                aria-label="Dismiss"
                className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-white/[0.06] hover:text-gray-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeToast;
