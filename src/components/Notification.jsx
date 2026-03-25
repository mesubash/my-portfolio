import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type, isVisible }) => {
  const colors = {
    success: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
    error: 'border-red-500 bg-red-500/10 text-red-300',
    info: 'border-violet-500 bg-violet-500/10 text-violet-300',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-20 right-4 sm:right-6 z-50 max-w-sm px-5 py-3.5 rounded-xl backdrop-blur-xl border-l-[3px] shadow-2xl shadow-black/30 ${colors[type] || colors.info} bg-dark-950/90`}
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
