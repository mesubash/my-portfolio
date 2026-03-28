import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import { contact, socials } from "../../data/social";

const Contact = () => {
  const [state, handleSubmit] = useForm("xvggerej");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setSubmitted(true);
      document.getElementById("contact-form")?.reset();
      setTimeout(() => setSubmitted(false), 5000);
    }
  }, [state.succeeded]);

  const input = "w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20 transition-all duration-300";
  const iconMap = { GitHub: Github, LinkedIn: Linkedin };

  return (
    <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
      <NodeBackground />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionHeading label="04 / Contact" description="Looking for a backend engineer or have a project that needs Spring Boot, Flutter, or React? Let's talk.">
            Get in Touch
          </SectionHeading>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <FadeIn delay={0.1} direction="left" className="lg:col-span-2">
            <div className="card spotlight-card p-7 sm:p-8 h-full rounded-xl" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`); }}>
              <h3 className="font-heading text-lg font-semibold text-white mb-6">Connect</h3>

              <div className="space-y-5">
                {[
                  { Icon: Mail, label: "Email", value: contact.email },
                  { Icon: MapPin, label: "Location", value: contact.location },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-600 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-slate-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <p className="text-[11px] text-slate-600 uppercase tracking-wider mb-3">Elsewhere</p>
                <div className="flex gap-2">
                  {socials.slice(0, 3).map(({ label, href }) => {
                    const Icon = iconMap[label];
                    return (
                      <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-500 hover:text-white hover:border-indigo/30 hover:bg-indigo/5 transition-all duration-300" whileHover={{ y: -2 }} aria-label={label}>
                        {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-semibold">{label[0]}</span>}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="right" className="lg:col-span-3">
            <div className="card p-7 sm:p-8 rounded-xl">
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 px-4 py-3 rounded-lg bg-indigo/10 border border-indigo/20 text-sm text-indigo-light">
                  Message sent successfully. Thank you!
                </motion.div>
              )}

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Name</label>
                    <input type="text" name="name" required placeholder="Your name" className={input} />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
                    <input type="email" name="email" required placeholder="your@email.com" className={input} />
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Subject</label>
                  <input type="text" name="subject" placeholder="Project discussion" className={input} />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea name="message" required rows="5" placeholder="Tell me about your project..." className={`${input} resize-none`} />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <motion.button type="submit" disabled={state.submitting} className="w-full px-6 py-3.5 text-sm font-semibold text-white bg-indigo rounded-lg hover:bg-indigo-dark shadow-lg shadow-indigo/20 hover:shadow-indigo/30 transition-all duration-300 disabled:opacity-50 hover:-translate-y-[1px]" whileTap={{ scale: 0.98 }}>
                  {state.submitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
