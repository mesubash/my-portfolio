import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-5 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="text-indigo text-7xl sm:text-8xl font-heading font-bold mb-4">404</p>
      <h1 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2">
        Page not found
      </h1>
      <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-white/[0.06] hover:border-indigo/30 px-5 py-2 rounded-full transition-all duration-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
