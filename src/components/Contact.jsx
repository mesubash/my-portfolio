import { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, useInView } from "framer-motion";
import Notification from "./Notification";
import TiltCard from "./TiltCard";

const Contact = () => {
  const [state, handleSubmit] = useForm("xvggerej");
  const [notification, setNotification] = useState({ isVisible: false, message: "", type: "" });
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [emailValidationStatus, setEmailValidationStatus] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [lastApiCall, setLastApiCall] = useState(0);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [nameValidationStatus, setNameValidationStatus] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Disposable email domains list
  const disposableEmailDomains = [
    "10minutemail.com", "guerrillamail.com", "mailinator.com", "temp-mail.org",
    "throwaway.email", "yopmail.com", "getnada.com", "maildrop.cc",
    "tempmail.ninja", "fakeinbox.com", "sharklasers.com", "guerrillamailblock.com",
    "sjhdj.com", "example.com", "test.com", "fake.com", "invalid.com",
    "sdbhs.sd", "test.test", "fake.fake",
    "0-mail.com", "10mail.org", "20minutemail.com", "2prong.com", "30minutemail.com",
    "3d-painting.com", "4warding.com", "7tags.com", "9ox.net", "anonbox.net",
    "anonymbox.com", "antispam.de", "bccto.me", "beefmilk.com", "bigstring.com",
    "binkmail.com", "bio-muesli.net", "bobmail.info", "bodhi.lawlita.com",
    "bofthew.com", "brogrammer.com", "casualdx.com", "chacuo.net", "correo.blogos.net",
    "cosmorph.com", "courriel.fr.nf", "courrieltemporaire.com", "curryworld.de",
    "cust.in", "dacoolest.com", "dandikmail.com", "deadaddress.com",
    "despam.it", "devnullmail.com", "dfgh.net", "digitalsanctuary.com",
    "discardmail.com", "discardmail.de", "disposableaddress.com", "disposableinbox.com",
    "dispose.it", "dispostable.com", "dm.w3internet.com", "dodgeit.com",
    "dodgemail.de", "dontreg.com", "dontsendmespam.de", "drdrb.net",
    "dump-email.info", "dumpmail.de", "dumpyemail.com", "e-mail.org",
    "e4ward.com", "emailias.com", "emailinfive.com", "emailmiser.com",
    "emailsensei.com", "emailtemporar.ro", "emailtemporario.com.br", "emailto.de",
    "emailwarden.com", "emailx.at.hm", "emailxfer.com", "emz.net",
    "enterto.com", "ephemail.net", "est.une.victime.ninja", "etranquil.com",
    "evopo.com", "explodemail.com", "fakemailz.com", "fastacura.com",
    "fastchevy.com", "fastchrysler.com", "fastkawasaki.com", "fastmazda.com",
    "fastmitsubishi.com", "fastnissan.com", "fastsubaru.com", "fastsuzuki.com",
    "fasttoyota.com", "fastyamaha.com", "filzmail.com", "fizmail.com",
    "floppy.rodeo", "flyspam.com", "footard.com", "forgetmail.com",
    "fr33mail.info", "frapmail.com", "fudgerub.com", "fux0ringduh.com",
    "garliclife.com", "get1mail.com", "getairmail.com", "getmails.eu",
    "getonemail.com", "getonemail.net", "ghosttexter.de", "giantmail.de",
    "girlsundertheinfluence.com", "gishpuppy.com", "gmial.com", "gowikibooks.com",
    "gowikicampus.com", "gowikifilms.com", "gowikigames.com", "gowikimusic.com",
    "gowikinetwork.com", "gowikitravel.com", "gowikitv.com", "great-host.in",
    "greensloth.com", "grr.la", "gsrv.co.uk", "guerillamail.biz",
    "guerillamail.com", "guerillamail.de", "guerillamail.net", "guerillamail.org",
    "guerrillamail.biz", "guerrillamail.de", "guerrillamail.net", "guerrillamail.org",
    "h.mintemail.com", "haltospam.com", "hatespam.org", "hidemail.de",
    "hidzz.com", "hmamail.com", "hotpop.com", "ieatspam.eu",
    "ieatspam.info", "ieh-mail.de", "imails.info", "inboxalias.com",
    "inboxclean.com", "inboxclean.org", "incognitomail.com", "incognitomail.net",
    "incognitomail.org", "insorg-mail.info", "instant-mail.de", "ip6.li",
    "irish2me.com", "iwi.net", "jetable.com", "jetable.fr.nf",
    "jetable.net", "jetable.org", "jnxjn.com", "jourrapide.com",
    "jsbin.com", "junk1e.com", "kaspop.com", "killmail.com",
    "killmail.net", "klassmaster.com", "klzlk.com", "kook.ml",
    "kurzepost.de", "l33r.eu", "labetteraverouge.at", "lackmail.net",
    "lags.us", "lawlita.com", "letthemeatspam.com", "lhsdv.com",
  ];

  const validateEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isDisposableEmail = (email) => disposableEmailDomains.includes(email.split("@")[1]?.toLowerCase());

  const validateName = (name) => {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) return { isValid: false, error: "Name must be at least 2 characters long" };
    if (trimmedName.length > 50) return { isValid: false, error: "Name must be less than 50 characters" };
    if (!/^[a-zA-Z\s'.'-]+$/.test(trimmedName)) return { isValid: false, error: "Name can only contain letters, spaces, hyphens, apostrophes, and periods" };
    if (!/[a-zA-Z]/.test(trimmedName)) return { isValid: false, error: "Name must contain at least one letter" };
    if ((trimmedName.match(/[\-'.]/g) || []).length > trimmedName.length * 0.3) return { isValid: false, error: "Name contains too many special characters" };
    if (/[\s\-'.]{3,}/.test(trimmedName)) return { isValid: false, error: "Name cannot have more than 2 consecutive spaces or special characters" };
    if (/^[\s\-'.]|[\s\-'.]$/.test(trimmedName)) return { isValid: false, error: "Name cannot start or end with spaces or special characters" };

    const profanityWords = ["fuck", "shit", "damn", "bitch", "ass", "hell"];
    const lowerName = trimmedName.toLowerCase();
    for (const word of profanityWords) {
      if (lowerName.includes(word)) return { isValid: false, error: "Please use appropriate language in your name" };
    }

    const fakePatterns = [/^test\s*$/i, /^fake\s*$/i, /^name\s*$/i, /^[a-z]\s*$/i, /^(abc|xyz|123)\s*$/i, /^[a-z]{1,2}\s+[a-z]{1,2}$/i, /^(.)\1{4,}/, /^(qwerty|asdf|zxcv)/i, /^john\s+doe$/i, /^jane\s+doe$/i];
    for (const pattern of fakePatterns) {
      if (pattern.test(trimmedName)) return { isValid: false, error: "Please enter your real name" };
    }

    const words = trimmedName.split(/\s+/).filter((w) => w.length > 0);
    if (words.length === 0) return { isValid: false, error: "Please enter your name" };
    if (words.length === 1) return { isValid: false, error: "Please enter your full name (first and last name)" };
    if (words.length > 4) return { isValid: false, error: "Please enter a shorter version of your name (maximum 4 words)" };
    for (const word of words) {
      if (word.length > 20) return { isValid: false, error: "Each part of your name must be less than 20 characters" };
    }
    return { isValid: true, error: null };
  };

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameError("");
    setNameValidationStatus(null);
    if (!nameValue.trim()) return;
    const validation = validateName(nameValue);
    if (!validation.isValid) { setNameError(validation.error); setNameValidationStatus("invalid"); }
    else { setNameValidationStatus("valid"); }
  };

  const validateEmailExistence = async (email) => {
    try {
      const now = Date.now();
      const timeSinceLastCall = now - lastApiCall;
      const minimumDelay = 1100;
      if (timeSinceLastCall < minimumDelay) {
        await new Promise((resolve) => setTimeout(resolve, minimumDelay - timeSinceLastCall));
      }
      const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
      if (!apiKey) {
        const domain = email.split("@")[1]?.toLowerCase();
        const suspiciousDomains = ["sdbhs.sd", "test.test", "fake.fake", "invalid.invalid", "example.org"];
        if (suspiciousDomains.includes(domain) || !domain || domain.length < 4 || !domain.includes(".")) {
          return { isValid: false, isDisposable: false, quality: 0, reason: "Suspicious domain detected" };
        }
        return { isValid: true, isDisposable: false, quality: 0.3, reason: "Basic validation passed" };
      }
      setLastApiCall(Date.now());
      const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        if (response.status === 429) throw new Error("Rate limit exceeded");
        throw new Error(`Service error: ${response.status}`);
      }
      const data = await response.json();
      const isValid = data.deliverability === "DELIVERABLE" && data.is_valid_format?.value !== false && data.is_mx_found?.value !== false && data.is_smtp_valid?.value !== false;
      return { isValid, isDisposable: data.is_disposable_email?.value || false, quality: data.quality_score || 0, reason: `API: ${data.deliverability || "unknown"}` };
    } catch (error) {
      if (error.message?.includes("Failed to fetch") || error.name === "TypeError") {
        const domain = email.split("@")[1]?.toLowerCase();
        const suspiciousDomains = ["sdbhs.sd", "test.test", "fake.fake", "invalid.invalid", "example.org"];
        if (suspiciousDomains.includes(domain) || !domain || domain.length < 4 || !domain.includes(".")) {
          return { isValid: false, isDisposable: false, quality: 0, reason: "Suspicious domain" };
        }
        return { isValid: true, isDisposable: false, quality: 0.4, reason: "Basic validation passed" };
      }
      return { isValid: false, isDisposable: false, quality: 0, reason: `Service error: ${error.message}` };
    }
  };

  const handleEmailChange = async (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError("");
    setEmailValidationStatus(null);
    setValidationMessage("");
    if (!emailValue) return;
    if (!validateEmailFormat(emailValue)) { setEmailError("Please enter a valid email format"); setEmailValidationStatus("invalid"); return; }
    if (isDisposableEmail(emailValue)) { setEmailError("Please use a permanent email address"); setEmailValidationStatus("disposable"); return; }

    setTimeout(async () => {
      if (emailValue === e.target.value) {
        setIsValidatingEmail(true);
        try {
          const validation = await validateEmailExistence(emailValue);
          if (emailValue === document.querySelector('input[name="email"]')?.value) {
            if (!validation.isValid) { setEmailError("Email validation failed"); setEmailValidationStatus("invalid"); }
            else if (validation.isDisposable) { setEmailError("Please use a permanent email address"); setEmailValidationStatus("disposable"); }
            else { setEmailValidationStatus("valid"); setValidationMessage(validation.quality >= 0.8 ? "Email verified!" : "Email accepted"); }
          }
        } catch {
          setEmailValidationStatus("valid");
        } finally {
          setIsValidatingEmail(false);
          setTimeout(() => setValidationMessage(""), 3000);
        }
      }
    }, 2000);
  };

  useEffect(() => {
    if (state.succeeded) {
      setNotification({ isVisible: true, message: "Message sent successfully! Thank you for reaching out.", type: "success" });
      const form = document.querySelector("form");
      if (form) form.reset();
      setEmail(""); setEmailError(""); setValidationMessage(""); setName(""); setNameError(""); setNameValidationStatus(null);
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 5000);
    }
  }, [state.succeeded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const emailValue = formData.get("email");
    const nameValue = formData.get("name");

    const nameValidation = validateName(nameValue);
    if (!nameValidation.isValid) {
      setNotification({ isVisible: true, message: nameValidation.error, type: "error" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
      return;
    }
    if (!validateEmailFormat(emailValue)) {
      setNotification({ isVisible: true, message: "Please enter a valid email address", type: "error" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
      return;
    }
    if (isDisposableEmail(emailValue)) {
      setNotification({ isVisible: true, message: "Please use a permanent email address", type: "error" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
      return;
    }
    if (isValidatingEmail || (!emailValidationStatus && emailValue)) {
      setNotification({ isVisible: true, message: "Please wait while we validate your email...", type: "info" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
      return;
    }
    if (emailValidationStatus === "invalid" || emailValidationStatus === "disposable") {
      setNotification({ isVisible: true, message: "Please fix email errors before sending", type: "error" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
      return;
    }
    try { await handleSubmit(e); } catch {
      setNotification({ isVisible: true, message: "Error sending message. Please try again.", type: "error" });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 3000);
    }
  };

  const inputClasses = (error, validStatus) =>
    `w-full px-4 py-3.5 bg-white/[0.03] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 transition-all duration-300 text-sm ${
      error
        ? "border-red-500/50 focus:ring-red-500/30"
        : validStatus === "valid"
        ? "border-emerald-500/30 focus:ring-emerald-500/30"
        : "border-white/[0.06] focus:ring-violet-500/30 focus:border-violet-500/30"
    }`;

  const ValidationIcon = ({ status, isValidating }) => {
    if (isValidating) return (
      <svg className="animate-spin h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );
    if (status === "valid") return (
      <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
    if (status === "invalid" || status === "disposable") return (
      <svg className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    return null;
  };

  return (
    <section ref={sectionRef} className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-pink-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(139,92,246,0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      {notification.isVisible && <Notification message={notification.message} type={notification.type} isVisible={notification.isVisible} />}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to work together? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <TiltCard tiltStrength={5}>
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Let&apos;s Connect</h3>

              <div className="space-y-5">
                {[
                  { icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "subashdhamee@gmail.com" },
                  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "Location", value: "Kathmandu, Nepal" },
                  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Response Time", value: "Within 24 hours" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-gray-300 text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <p className="text-gray-500 text-xs mb-3">Follow me on</p>
                <div className="flex gap-2">
                  {[
                    { href: "https://github.com/mesubash", path: "M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" },
                    { href: "https://linkedin.com/in/subashsdhami", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  ].map(({ href, path }) => (
                    <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            </TiltCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <TiltCard tiltStrength={3}>
            <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>

              {/* Name */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Your Name</label>
                <div className="relative">
                  <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Enter your full name" required className={inputClasses(nameError, nameValidationStatus)} />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIcon status={nameValidationStatus} />
                  </div>
                </div>
                {nameError && <p className="text-red-400 text-xs mt-2">{nameError}</p>}
                {nameValidationStatus === "valid" && !nameError && <p className="text-emerald-400 text-xs mt-2">Name looks good!</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required className={inputClasses(emailError, emailValidationStatus)} />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIcon status={emailValidationStatus} isValidating={isValidatingEmail} />
                  </div>
                </div>
                {emailError && <p className="text-red-400 text-xs mt-2">{emailError}</p>}
                {isValidatingEmail && validationMessage && <p className="text-violet-400 text-xs mt-2">{validationMessage}</p>}
                {emailValidationStatus === "valid" && !emailError && <p className="text-emerald-400 text-xs mt-2">{validationMessage || "Email verified"}</p>}
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs mt-2" />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Subject</label>
                <input type="text" name="subject" placeholder="What's this about?" className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all duration-300 text-sm" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Message</label>
                <textarea name="message" placeholder="Tell me about your project or idea..." required rows="5" className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all duration-300 resize-none text-sm" />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-2" />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={state.submitting || emailError || nameError || isValidatingEmail || (email && emailValidationStatus !== "valid") || (name && nameValidationStatus !== "valid")}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                whileHover={!state.submitting ? { scale: 1.02 } : {}}
                whileTap={!state.submitting ? { scale: 0.98 } : {}}
              >
                {state.submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Sending...
                  </>
                ) : isValidatingEmail ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Validating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
