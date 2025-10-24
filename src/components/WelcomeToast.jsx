import React, { useEffect, useState, useRef } from 'react';
import greetings from '../data/greetings';

const AUTO_HIDE_MS = 7000; // auto-dismiss after 7s

const WelcomeToast = () => {
  const [visible, setVisible] = useState(false);
  // message can be either a string or an object { text, author }
  const [message, setMessage] = useState(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    // Always show on each visit/refresh (no sessionStorage persistence)
    if (typeof window === 'undefined') return;

    if (!greetings) return;

    // greetings can be either:
    // - an array of entries (legacy), or
    // - an object whose keys are categories and values are arrays of entries
    let chosen = null;
    if (Array.isArray(greetings)) {
      if (greetings.length === 0) return;
      const idx = Math.floor(Math.random() * greetings.length);
      chosen = greetings[idx];
    } else if (typeof greetings === 'object') {
      const categories = Object.keys(greetings).filter(k => Array.isArray(greetings[k]) && greetings[k].length > 0);
      if (categories.length === 0) return;
      // pick a random category then a random entry from it
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const list = greetings[cat];
      const idx = Math.floor(Math.random() * list.length);
      chosen = list[idx];
    }

    if (!chosen) return;
    setMessage(chosen);

    // Slight delay to make entrance feel smoother
    const enter = setTimeout(() => setVisible(true), 250);

    // auto-hide after a bit
    hideTimer.current = setTimeout(() => handleClose(true), AUTO_HIDE_MS + 250);

    return () => {
      clearTimeout(enter);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const handleClose = (fromAuto = false) => {
    setVisible(false);
    // do not persist dismissal — show again on next refresh/visit
    if (!fromAuto) {
      clearTimeout(hideTimer.current);
    }
  };

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 right-6 z-50 w-72 max-w-full transform transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <div className="relative bg-gray-900/80 text-white rounded-lg shadow-md border border-gray-800 overflow-hidden border-l-4 border-l-purple-500">
        <div className="p-3 px-4 flex items-start gap-3">
          <div className="flex-1">
            {typeof message === 'string' ? (
              <>
                <p className="text-sm font-semibold leading-tight text-white">{message}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold leading-tight text-white">{message.text}</p>
                {message.author ? (
                  <p className="text-xs text-white/75 mt-1">— {message.author}</p>
                ) : null}
              </>
            )}
          </div>

          <button
            onClick={() => handleClose(false)}
            aria-label="Dismiss welcome message"
            className="absolute top-2 right-2 w-7 h-7 rounded-md flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeToast;
