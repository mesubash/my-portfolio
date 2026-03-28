import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, Github, Linkedin, Check, X as XIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import { contact, socials } from "../../data/social";

/* ─── Disposable email domains ─── */
const disposableDomains = new Set([
  "10minutemail.com","guerrillamail.com","mailinator.com","temp-mail.org",
  "throwaway.email","yopmail.com","getnada.com","maildrop.cc",
  "tempmail.ninja","fakeinbox.com","sharklasers.com","guerrillamailblock.com",
  "sjhdj.com","example.com","test.com","fake.com","invalid.com",
  "sdbhs.sd","test.test","fake.fake","0-mail.com","10mail.org",
  "20minutemail.com","30minutemail.com","anonbox.net","anonymbox.com",
  "antispam.de","bccto.me","bigstring.com","casualdx.com",
  "deadaddress.com","devnullmail.com","discardmail.com","disposableinbox.com",
  "dispose.it","dispostable.com","dodgeit.com","dontreg.com",
  "dump-email.info","dumpmail.de","e4ward.com","emailmiser.com",
  "ephemail.net","explodemail.com","fakemailz.com","filzmail.com",
  "flyspam.com","forgetmail.com","getairmail.com","getonemail.com",
  "guerillamail.com","guerillamail.de","guerrillamail.biz",
  "guerrillamail.de","guerrillamail.net","guerrillamail.org",
  "haltospam.com","hidemail.de","hotpop.com","incognitomail.com",
  "instant-mail.de","jetable.com","jetable.org","junk1e.com",
  "killmail.com","killmail.net","kurzepost.de","lackmail.net",
  "letthemeatspam.com","mailcatch.com","mailexpire.com","mailnesia.com",
  "mailnull.com","mailzilla.com","nomail.xl.cx","nospam.ze.tc",
  "objectmail.com","ownmail.net","proxymail.eu","putthisinyouremail.com",
  "quickinbox.com","rcpt.at","reallymymail.com","recode.me",
  "regbypass.com","safetymail.info","sandelf.de","saynotospams.com",
  "selfdestructingmail.com","sharklasers.com","sneakemail.com",
  "sogetthis.com","soodonims.com","spam4.me","spamavert.com",
  "spambox.us","spamcero.com","spamcorptastic.com","spamfree24.org",
  "spamgourmet.com","spamherelots.com","spamhole.com","spaml.de",
  "spammotel.com","spamobox.com","spamspot.com","spamthis.co.uk",
  "speed.1s.fr","superrito.com","suremail.info","tempalias.com",
  "tempe4mail.com","tempemail.co.za","tempemail.net","tempinbox.com",
  "tempmail.eu","tempmail2.com","tempmaildemo.com","tempmailer.com",
  "tempomail.fr","temporarily.de","temporarioemail.com.br",
  "temporaryemail.net","temporaryforwarding.com","temporaryinbox.com",
  "thankyou2010.com","thisisnotmyrealemail.com","throwawayemailaddress.com",
  "tittbit.in","tradermail.info","trash-mail.at","trash-mail.com",
  "trashmail.at","trashmail.com","trashmail.me","trashmail.net",
  "trashymail.com","trashymail.net","uggsrock.com","veryreallymymail.com",
  "wasteland.rfc822.org","webemail.me","weg-werf-email.de",
  "wegwerfmail.de","wegwerfmail.net","wh4f.org","whyspam.me",
  "wilemail.com","willselfdestruct.com","winemaven.info",
  "wronghead.com","wuzup.net","wuzupmail.net","wwwnew.eu",
  "xagloo.com","xemaps.com","xents.com","xmaily.com",
  "yep.it","yogamaven.com","yopmail.fr","ypmail.webarnak.fr.eu.org",
  "zehnminutenmail.de","zippymail.info",
]);

/* ─── Name validation ─── */
const validateName = (name) => {
  const t = name.trim();
  if (t.length < 2) return "Name must be at least 2 characters";
  if (t.length > 50) return "Name must be less than 50 characters";
  if (!/^[a-zA-Z\s'.-]+$/.test(t)) return "Name can only contain letters, spaces, hyphens, apostrophes";
  if (!/[a-zA-Z]/.test(t)) return "Name must contain at least one letter";
  if ((t.match(/['-.\s]{3,}/g)) ) return "Too many consecutive special characters";
  if (/^[\s'.-]|[\s'.-]$/.test(t)) return "Name cannot start or end with special characters";

  const fakes = [/^test$/i, /^fake$/i, /^name$/i, /^(abc|xyz|123)$/i, /^(.)\1{4,}/, /^(qwerty|asdf|zxcv)/i, /^john\s+doe$/i, /^jane\s+doe$/i];
  for (const p of fakes) { if (p.test(t)) return "Please enter your real name"; }

  const words = t.split(/\s+/).filter((w) => w.length > 0);
  if (words.length < 2) return "Please enter your full name";
  if (words.length > 4) return "Please use a shorter name (max 4 words)";

  return null;
};

/* ─── Email validation ─── */
const validateEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isDisposable = (email) => disposableDomains.has(email.split("@")[1]?.toLowerCase());

const validateEmailAPI = async (email, lastCallRef) => {
  const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
  if (!apiKey) {
    // Basic fallback when no API key
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain || domain.length < 4 || !domain.includes(".")) return { valid: false, reason: "Invalid domain" };
    return { valid: true, reason: "Basic check passed" };
  }

  // Rate limit
  const now = Date.now();
  if (now - lastCallRef.current < 1100) {
    await new Promise((r) => setTimeout(r, 1100 - (now - lastCallRef.current)));
  }
  lastCallRef.current = Date.now();

  try {
    const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`);
    if (!res.ok) return { valid: true, reason: "API unavailable" };
    const data = await res.json();
    const valid = data.deliverability === "DELIVERABLE" && data.is_valid_format?.value !== false && data.is_mx_found?.value !== false;
    return { valid, disposable: data.is_disposable_email?.value || false, reason: data.deliverability };
  } catch {
    return { valid: true, reason: "API unavailable" };
  }
};

/* ─── Validation indicator icon ─── */
const StatusIcon = ({ status, loading }) => {
  if (loading) return <Loader2 className="w-3.5 h-3.5 text-indigo animate-spin" />;
  if (status === "valid") return <Check className="w-3.5 h-3.5 text-emerald-400" />;
  if (status === "invalid") return <XIcon className="w-3.5 h-3.5 text-red-400" />;
  return null;
};

/* ─── Contact Component ─── */
const Contact = () => {
  const [state, handleSubmit] = useForm("xvggerej");
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameStatus, setNameStatus] = useState(null); // null | "valid" | "invalid"

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailValidating, setEmailValidating] = useState(false);

  const [lastApiCall] = useState({ current: 0 });

  useEffect(() => {
    if (state.succeeded) {
      setSubmitted(true);
      document.getElementById("contact-form")?.reset();
      setName(""); setEmail(""); setNameStatus(null); setEmailStatus(null); setNameError(""); setEmailError("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  }, [state.succeeded]);

  const handleNameChange = (e) => {
    const v = e.target.value;
    setName(v);
    setNameError("");
    setNameStatus(null);
    if (!v.trim()) return;
    const err = validateName(v);
    if (err) { setNameError(err); setNameStatus("invalid"); }
    else { setNameStatus("valid"); }
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setEmailError("");
    setEmailStatus(null);
    if (!v) return;

    if (!validateEmailFormat(v)) { setEmailError("Please enter a valid email format"); setEmailStatus("invalid"); return; }
    if (isDisposable(v)) { setEmailError("Please use a permanent email address"); setEmailStatus("invalid"); return; }

    // Debounced API validation
    const timer = setTimeout(async () => {
      if (v !== document.querySelector('input[name="email"]')?.value) return;
      setEmailValidating(true);
      const result = await validateEmailAPI(v, lastApiCall);
      if (v !== document.querySelector('input[name="email"]')?.value) { setEmailValidating(false); return; }

      if (!result.valid) { setEmailError("Email does not appear to exist"); setEmailStatus("invalid"); }
      else if (result.disposable) { setEmailError("Please use a permanent email address"); setEmailStatus("invalid"); }
      else { setEmailStatus("valid"); }
      setEmailValidating(false);
    }, 1500);

    return () => clearTimeout(timer);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    const nameErr = validateName(name);
    if (nameErr) { setNameError(nameErr); setNameStatus("invalid"); return; }

    // Email validation
    if (!validateEmailFormat(email)) { setEmailError("Please enter a valid email"); setEmailStatus("invalid"); return; }
    if (isDisposable(email)) { setEmailError("Please use a permanent email"); setEmailStatus("invalid"); return; }
    if (emailValidating) return;
    if (emailStatus === "invalid") return;

    await handleSubmit(e);
  };

  const inputBase = "w-full px-4 py-3 bg-white/[0.02] border rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none transition-all duration-300";
  const inputBorder = (error, status) =>
    error ? "border-red-400/40 focus:border-red-400/60" :
    status === "valid" ? "border-emerald-400/30 focus:border-emerald-400/50" :
    "border-white/[0.06] focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20";

  const iconMap = { GitHub: Github, LinkedIn: Linkedin };
  const isDisabled = state.submitting || emailValidating || nameStatus === "invalid" || emailStatus === "invalid" || (name && !nameStatus) || (email && !emailStatus);

  return (
    <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
      <NodeBackground />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionHeading label="04 / Contact" description="Have a question or want to work together? Feel free to reach out.">
            Get in Touch
          </SectionHeading>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Info sidebar */}
          <FadeIn delay={0.1} direction="left" className="lg:col-span-2">
            <div className="card spotlight-card p-7 sm:p-8 h-full rounded-xl" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
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

          {/* Form */}
          <FadeIn delay={0.2} direction="right" className="lg:col-span-3">
            <div className="card p-7 sm:p-8 rounded-xl">
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 px-4 py-3 rounded-lg bg-indigo/10 border border-indigo/20 text-sm text-indigo-light">
                  Message sent successfully. Thank you!
                </motion.div>
              )}

              <form id="contact-form" onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Name</label>
                    <div className="relative">
                      <input type="text" name="name" required placeholder="Your full name" value={name} onChange={handleNameChange} className={`${inputBase} ${inputBorder(nameError, nameStatus)} pr-9`} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <StatusIcon status={nameStatus} />
                      </div>
                    </div>
                    {nameError && <p className="text-red-400/80 text-[11px] mt-1.5">{nameError}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
                    <div className="relative">
                      <input type="email" name="email" required placeholder="your@email.com" value={email} onChange={handleEmailChange} className={`${inputBase} ${inputBorder(emailError, emailStatus)} pr-9`} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <StatusIcon status={emailStatus} loading={emailValidating} />
                      </div>
                    </div>
                    {emailError && <p className="text-red-400/80 text-[11px] mt-1.5">{emailError}</p>}
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400/80 text-[11px] mt-1.5" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Subject</label>
                  <input type="text" name="subject" placeholder="Hiring, Collaboration, Freelance..." className={`${inputBase} border-white/[0.06] focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20`} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea name="message" required rows="5" placeholder="Tell me about your project..." className={`${inputBase} border-white/[0.06] focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20 resize-none`} />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-400/80 text-[11px] mt-1.5" />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full px-6 py-3.5 text-sm font-semibold text-white bg-indigo rounded-lg hover:bg-indigo-dark shadow-lg shadow-indigo/20 hover:shadow-indigo/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-[1px]"
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                >
                  {state.submitting ? "Sending..." : emailValidating ? "Validating..." : "Send Message"}
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
