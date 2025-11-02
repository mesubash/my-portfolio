import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import Notification from "./Notification";
import "aos/dist/aos.css";
import AOS from "aos";

const Contact = () => {
  const [state, handleSubmit] = useForm("xvggerej");
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: ''
  });
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [emailValidationStatus, setEmailValidationStatus] = useState(null); // 'valid', 'invalid', 'disposable'
  const [validationMessage, setValidationMessage] = useState(''); // User-friendly validation message
  const [lastApiCall, setLastApiCall] = useState(0); // Track last API call time for rate limiting
  
  // Name validation states
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');
  const [nameValidationStatus, setNameValidationStatus] = useState(null); // 'valid', 'invalid'

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  // Disposable email domains list (comprehensive)
  const disposableEmailDomains = [
    // Common disposable domains
    '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'temp-mail.org',
    'throwaway.email', 'yopmail.com', 'getnada.com', 'maildrop.cc',
    'tempmail.ninja', 'fakeinbox.com', 'sharklasers.com', 'guerrillamailblock.com',
    'sjhdj.com', 'example.com', 'test.com', 'fake.com', 'invalid.com',
    'sdbhs.sd', 'test.test', 'fake.fake', // Add suspicious test domains
    
    // Additional popular disposable domains
    '0-mail.com', '10mail.org', '20minutemail.com', '2prong.com', '30minutemail.com',
    '3d-painting.com', '4warding.com', '7tags.com', '9ox.net', 'anonbox.net',
    'anonymbox.com', 'antispam.de', 'bccto.me', 'beefmilk.com', 'bigstring.com',
    'binkmail.com', 'bio-muesli.net', 'bobmail.info', 'bodhi.lawlita.com',
    'bofthew.com', 'brogrammer.com', 'casualdx.com', 'chacuo.net', 'correo.blogos.net',
    'cosmorph.com', 'courriel.fr.nf', 'courrieltemporaire.com', 'curryworld.de',
    'cust.in', 'dacoolest.com', 'dandikmail.com', 'deadaddress.com',
    'despam.it', 'devnullmail.com', 'dfgh.net', 'digitalsanctuary.com',
    'discardmail.com', 'discardmail.de', 'disposableaddress.com', 'disposableinbox.com',
    'dispose.it', 'dispostable.com', 'dm.w3internet.com', 'dodgeit.com',
    'dodgemail.de', 'dontreg.com', 'dontsendmespam.de', 'drdrb.net',
    'dump-email.info', 'dumpmail.de', 'dumpyemail.com', 'e-mail.org',
    'e4ward.com', 'emailias.com', 'emailinfive.com', 'emailmiser.com',
    'emailsensei.com', 'emailtemporar.ro', 'emailtemporario.com.br', 'emailto.de',
    'emailwarden.com', 'emailx.at.hm', 'emailxfer.com', 'emz.net',
    'enterto.com', 'ephemail.net', 'est.une.victime.ninja', 'etranquil.com',
    'evopo.com', 'explodemail.com', 'fakemailz.com', 'fastacura.com',
    'fastchevy.com', 'fastchrysler.com', 'fastkawasaki.com', 'fastmazda.com',
    'fastmitsubishi.com', 'fastnissan.com', 'fastsubaru.com', 'fastsuzuki.com',
    'fasttoyota.com', 'fastyamaha.com', 'filzmail.com', 'fizmail.com',
    'floppy.rodeo', 'flyspam.com', 'footard.com', 'forgetmail.com',
    'fr33mail.info', 'frapmail.com', 'fudgerub.com', 'fux0ringduh.com',
    'garliclife.com', 'get1mail.com', 'getairmail.com', 'getmails.eu',
    'getonemail.com', 'getonemail.net', 'ghosttexter.de', 'giantmail.de',
    'girlsundertheinfluence.com', 'gishpuppy.com', 'gmial.com', 'gowikibooks.com',
    'gowikicampus.com', 'gowikifilms.com', 'gowikigames.com', 'gowikimusic.com',
    'gowikinetwork.com', 'gowikitravel.com', 'gowikitv.com', 'great-host.in',
    'greensloth.com', 'grr.la', 'gsrv.co.uk', 'guerillamail.biz',
    'guerillamail.com', 'guerillamail.de', 'guerillamail.net', 'guerillamail.org',
    'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org',
    'h.mintemail.com', 'haltospam.com', 'hatespam.org', 'hidemail.de',
    'hidzz.com', 'hmamail.com', 'hotpop.com', 'ieatspam.eu',
    'ieatspam.info', 'ieh-mail.de', 'imails.info', 'inboxalias.com',
    'inboxclean.com', 'inboxclean.org', 'incognitomail.com', 'incognitomail.net',
    'incognitomail.org', 'insorg-mail.info', 'instant-mail.de', 'ip6.li',
    'irish2me.com', 'iwi.net', 'jetable.com', 'jetable.fr.nf',
    'jetable.net', 'jetable.org', 'jnxjn.com', 'jourrapide.com',
    'jsbin.com', 'junk1e.com', 'kaspop.com', 'killmail.com',
    'killmail.net', 'klassmaster.com', 'klzlk.com', 'kook.ml',
    'kurzepost.de', 'l33r.eu', 'labetteraverouge.at', 'lackmail.net',
    'lags.us', 'lawlita.com', 'letthemeatspam.com', 'lhsdv.com'
  ];

  // Email format validation
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if email is disposable
  const isDisposableEmail = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    const isDisposable = disposableEmailDomains.includes(domain);
    return isDisposable;
  };

  // Name validation function
  const validateName = (name) => {
    const trimmedName = name.trim();
    
    // Check minimum length
    if (trimmedName.length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters long' };
    }
    
    // Check maximum length
    if (trimmedName.length > 50) {
      return { isValid: false, error: 'Name must be less than 50 characters' };
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes, periods)
    const nameRegex = /^[a-zA-Z\s\-'.]+$/;
    if (!nameRegex.test(trimmedName)) {
      return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods' };
    }
    
    // Check for at least one letter
    const hasLetter = /[a-zA-Z]/.test(trimmedName);
    if (!hasLetter) {
      return { isValid: false, error: 'Name must contain at least one letter' };
    }
    
    // Check for excessive special characters
    const specialCharCount = (trimmedName.match(/[\-'.]/g) || []).length;
    if (specialCharCount > trimmedName.length * 0.3) {
      return { isValid: false, error: 'Name contains too many special characters' };
    }
    
    // Check for consecutive spaces or special characters
    if (/[\s\-'.]{3,}/.test(trimmedName)) {
      return { isValid: false, error: 'Name cannot have more than 2 consecutive spaces or special characters' };
    }
    
    // Check for leading/trailing special characters
    if (/^[\s\-'.]|[\s\-'.]$/.test(trimmedName)) {
      return { isValid: false, error: 'Name cannot start or end with spaces or special characters' };
    }
    
    // Basic profanity check (you can expand this list)
    const profanityWords = ['fuck', 'shit', 'damn', 'bitch', 'ass', 'hell'];
    const lowerName = trimmedName.toLowerCase();
    for (const word of profanityWords) {
      if (lowerName.includes(word)) {
        return { isValid: false, error: 'Please use appropriate language in your name' };
      }
    }
    
    // Check for obvious fake names
    const fakePatterns = [
      /^test\s*$/i,
      /^fake\s*$/i,
      /^name\s*$/i,
      /^[a-z]\s*$/i,
      /^(abc|xyz|123)\s*$/i,
      /^[a-z]{1,2}\s+[a-z]{1,2}$/i, // single/double letters
      /^(.)\1{4,}/, // repeated characters (aaaaa, bbbbb)
      /^(qwerty|asdf|zxcv)/i,
      /^john\s+doe$/i,
      /^jane\s+doe$/i
    ];
    
    for (const pattern of fakePatterns) {
      if (pattern.test(trimmedName)) {
        return { isValid: false, error: 'Please enter your real name' };
      }
    }
    
    // Check for reasonable word count (2-4 names - require full name)
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) {
      return { isValid: false, error: 'Please enter your name' };
    }
    if (words.length === 1) {
      return { isValid: false, error: 'Please enter your full name (first and last name)' };
    }
    if (words.length > 4) {
      return { isValid: false, error: 'Please enter a shorter version of your name (maximum 4 words)' };
    }
    
    // Check each word length
    for (const word of words) {
      if (word.length < 1) {
        return { isValid: false, error: 'Each part of your name must be at least 1 character' };
      }
      if (word.length > 20) {
        return { isValid: false, error: 'Each part of your name must be less than 20 characters' };
      }
    }
    
    return { isValid: true, error: null };
  };

  // Handle name input change with real-time validation
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    
    setName(nameValue);
    setNameError('');
    setNameValidationStatus(null);
    
    if (!nameValue.trim()) {
      return;
    }

    // Validate name
    const validation = validateName(nameValue);
    
    if (!validation.isValid) {
      setNameError(validation.error);
      setNameValidationStatus('invalid');
    } else {
      setNameValidationStatus('valid');
    }
  };

  // Advanced email validation using AbstractAPI with rate limiting
  const validateEmailExistence = async (email) => {
    try {
      // Rate limiting: ensure at least 1 second between API calls
      const now = Date.now();
      const timeSinceLastCall = now - lastApiCall;
      const minimumDelay = 1100; // 1.1 seconds to be safe with API limits
      
      if (timeSinceLastCall < minimumDelay) {
        const waitTime = minimumDelay - timeSinceLastCall;
        setValidationMessage(`Waiting ${Math.ceil(waitTime / 1000)} seconds (API rate limit)...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      
      // Get API key from environment variables
      const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
      
      if (!apiKey) {
        console.error('AbstractAPI key not found in environment variables');
        setValidationMessage('Email validation service not configured - using basic validation');
        
        // Enhanced basic validation when API key is missing
        const domain = email.split('@')[1]?.toLowerCase();
        const suspiciousDomains = ['sdbhs.sd', 'test.test', 'fake.fake', 'invalid.invalid', 'example.org'];
        
        if (suspiciousDomains.includes(domain) || !domain || domain.length < 4 || !domain.includes('.')) {
          return {
            isValid: false,
            isDisposable: false,
            quality: 0,
            reason: 'Suspicious domain detected - basic validation failed'
          };
        }
        
        return {
          isValid: true,
          isDisposable: false,
          quality: 0.3,
          reason: 'Basic validation passed (API key missing)'
        };
      }
      
      // Update last API call time
      setLastApiCall(Date.now());
      setValidationMessage('Contacting email validation service...');
      
      console.log('Making API request to AbstractAPI for email:', email);
      
      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment.');
        }
        if (response.status === 401) {
          throw new Error('Invalid API key - please check your AbstractAPI key');
        }
        throw new Error(`Email validation service error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      setValidationMessage('Processing validation results...');
      
      // More detailed validation based on AbstractAPI response
      const isValid = data.deliverability === 'DELIVERABLE' && 
                     data.is_valid_format?.value !== false &&
                     data.is_mx_found?.value !== false &&
                     data.is_smtp_valid?.value !== false;
      
      return {
        isValid: isValid,
        isDisposable: data.is_disposable_email?.value || false,
        quality: data.quality_score || 0,
        reason: `API: ${data.deliverability || 'unknown'}`
      };
    } catch (error) {
      console.error('Email validation service error:', error);
      
      // Check if it's a blocked request (ad blocker)
      if (error.message?.includes('Failed to fetch') || 
          error.name === 'TypeError' || 
          error.message?.includes('NetworkError')) {
        setValidationMessage('Email validation blocked by browser - using enhanced basic validation');
        
        // Enhanced basic validation when API is blocked
        const domain = email.split('@')[1]?.toLowerCase();
        const suspiciousDomains = ['sdbhs.sd', 'test.test', 'fake.fake', 'invalid.invalid', 'example.org'];
        
        if (suspiciousDomains.includes(domain) || !domain || domain.length < 4 || !domain.includes('.')) {
          return {
            isValid: false,
            isDisposable: false,
            quality: 0,
            reason: 'Blocked: suspicious domain detected'
          };
        }
        
        return {
          isValid: true,
          isDisposable: false,
          quality: 0.4,
          reason: 'Blocked: basic validation passed'
        };
      } else {
        setValidationMessage('Validation service temporarily unavailable');
        return {
          isValid: false, // Be strict when service fails
          isDisposable: false,
          quality: 0,
          reason: `Service error: ${error.message}`
        };
      }
    }
  };

  // Handle email input change with real-time validation
  const handleEmailChange = async (e) => {
    const emailValue = e.target.value;
    
    setEmail(emailValue);
    setEmailError('');
    setEmailValidationStatus(null);
    setValidationMessage('');
    
    if (!emailValue) {
      return;
    }

    // Basic format validation
    if (!validateEmailFormat(emailValue)) {
      setEmailError('Please enter a valid email format');
      setEmailValidationStatus('invalid');
      return;
    }

    // Check for disposable email
    if (isDisposableEmail(emailValue)) {
      setEmailError('Please use a permanent email address (temporary emails not allowed)');
      setEmailValidationStatus('disposable');
      return;
    }

    setValidationMessage('Preparing to validate email...');
    
    // Increased debounce time to reduce API calls and respect rate limits
    setTimeout(async () => {
      // Only validate if this is still the current email value
      if (emailValue === e.target.value) {
        setIsValidatingEmail(true);
        setValidationMessage('Starting email validation...');
        
        try {
          const validation = await validateEmailExistence(emailValue);
          
          // Double-check the email hasn't changed during validation
          if (emailValue === document.querySelector('input[name="email"]').value) {
            console.log('Validation result:', validation);
            
            if (!validation.isValid) {
              setEmailError(`Email validation failed: ${validation.reason || 'This email address does not appear to exist'}`);
              setEmailValidationStatus('invalid');
              setValidationMessage('');
            } else if (validation.isDisposable) {
              setEmailError('Please use a permanent email address (temporary emails not allowed)');
              setEmailValidationStatus('disposable');
              setValidationMessage('');
            } else {
              setEmailValidationStatus('valid');
              // Show different messages based on validation quality
              if (validation.quality >= 0.8) {
                setValidationMessage('Email verified successfully!');
              } else if (validation.quality >= 0.5) {
                setValidationMessage('Email appears valid (basic validation)');
              } else if (validation.quality >= 0.3) {
                setValidationMessage('Email format accepted');
              } else {
                setValidationMessage(`Email validation: ${validation.reason || 'Accepted'}`);
              }
            }
          }
        } catch (error) {
          console.warn('Email validation failed:', error);
          // Don't show error to user if validation service fails
          if (emailValue === document.querySelector('input[name="email"]').value) {
            setEmailValidationStatus('valid');
            setValidationMessage('Using basic validation (service unavailable)');
          }
        } finally {
          setIsValidatingEmail(false);
          // Clear validation message after a short delay
          setTimeout(() => {
            setValidationMessage('');
          }, 3000);
        }
      } else {
      }
    }, 2000); // Increased to 2 seconds to reduce API calls
  };

  useEffect(() => {
    if (state.succeeded) {
      setNotification({
        isVisible: true,
        message: 'Message sent successfully! Thank you for reaching out.',
        type: 'success'
      });
      
      // Reset form fields
      const form = document.querySelector('form');
      if (form) form.reset();
      setEmail('');
      setEmailError('');
      setValidationMessage('');
      setName('');
      setNameError('');
      setNameValidationStatus(null);
      
      // Hide notification after delay
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 5000);
    }
  }, [state.succeeded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(e.target);
    const emailValue = formData.get('email');
    const nameValue = formData.get('name');
    
    // Name validation
    const nameValidation = validateName(nameValue);
    if (!nameValidation.isValid) {
      setNotification({
        isVisible: true,
        message: nameValidation.error,
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }
    
    // Basic format validation
    if (!validateEmailFormat(emailValue)) {
      setNotification({
        isVisible: true,
        message: 'Please enter a valid email address',
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }

    // Check for disposable email
    if (isDisposableEmail(emailValue)) {
      setNotification({
        isVisible: true,
        message: 'Please use a permanent email address (temporary emails not allowed)',
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }

    // If we're still validating or validation hasn't been done, do it now
    if (isValidatingEmail || (!emailValidationStatus && emailValue)) {
      setNotification({
        isVisible: true,
        message: 'Please wait while we validate your email address...',
        type: 'info'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }

    // Force re-validation if email has changed since last validation
    if (emailValue !== email) {
      setIsValidatingEmail(true);
      setValidationMessage('Re-validating email before submission...');
      
      try {
        const validation = await validateEmailExistence(emailValue);
        
        if (!validation.isValid) {
          setNotification({
            isVisible: true,
            message: 'This email address does not appear to exist. Please check and try again.',
            type: 'error'
          });
          
          setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
          }, 3000);
          setIsValidatingEmail(false);
          setValidationMessage('');
          return;
        }
        
        if (validation.isDisposable) {
          setNotification({
            isVisible: true,
            message: 'Please use a permanent email address (temporary emails not allowed)',
            type: 'error'
          });
          
          setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
          }, 3000);
          setIsValidatingEmail(false);
          setValidationMessage('');
          return;
        }
        
        setIsValidatingEmail(false);
        setValidationMessage('');
      } catch (error) {
        console.warn('Email validation failed during submission:', error);
        setIsValidatingEmail(false);
        setValidationMessage('');
        // Continue with submission if API fails
      }
    }

    // Check final validation status
    if (emailValidationStatus === 'invalid') {
      setNotification({
        isVisible: true,
        message: 'Please enter a valid, existing email address',
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }

    if (emailValidationStatus === 'disposable') {
      setNotification({
        isVisible: true,
        message: 'Please use a permanent email address (temporary emails not allowed)',
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return;
    }
    
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Form error:", error);
      setNotification({
        isVisible: true,
        message: 'Error sending message. Please try again.',
        type: 'error'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative flex items-center justify-center">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Notification */}
      {notification.isVisible && (
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
        />
      )}
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to work together? I'd love to hear from you. 
            Send me a message and I'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8 lg:col-span-2" data-aos="fade-right" data-aos-delay="200">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">subashdhamee@gmail.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">Kathmandu, Nepal</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Response Time</p>
                      <p className="text-white font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-700/50">
                  <p className="text-gray-400 text-sm mb-4">Follow me on</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/mesubash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-700/50 hover:bg-purple-600/20 border border-gray-600/50 hover:border-purple-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-gray-400 hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/subashsdhami"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-700/50 hover:bg-purple-600/20 border border-gray-600/50 hover:border-purple-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-gray-400 hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left" data-aos-delay="300" className="lg:col-span-3">
              <form 
                onSubmit={onSubmit} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Your Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your full name"
                        required
                        className={`w-full px-4 py-3 pr-12 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          nameError 
                            ? 'border-red-500 focus:ring-red-500' 
                            : nameValidationStatus === 'valid'
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-gray-600/50 focus:ring-purple-500 focus:border-transparent'
                        }`}
                      />
                      
                      {/* Name validation indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {nameValidationStatus === 'valid' ? (
                          <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : nameValidationStatus === 'invalid' ? (
                          <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : null}
                      </div>
                    </div>
                    
                    {nameError && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {nameError}
                      </p>
                    )}
                    
                    {nameValidationStatus === 'valid' && !nameError && (
                      <p className="text-green-400 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Name looks good!
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        required
                        className={`w-full px-4 py-3 pr-12 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          emailError 
                            ? 'border-red-500 focus:ring-red-500' 
                            : emailValidationStatus === 'valid'
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-gray-600/50 focus:ring-purple-500 focus:border-transparent'
                        }`}
                      />
                      
                      {/* Email validation indicator */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isValidatingEmail ? (
                          <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : emailValidationStatus === 'valid' ? (
                          <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : emailValidationStatus === 'invalid' || emailValidationStatus === 'disposable' ? (
                          <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : null}
                      </div>
                    </div>
                    
                    {emailError && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {emailError}
                      </p>
                    )}
                    
                    {/* Validation process message */}
                    {isValidatingEmail && validationMessage && (
                      <p className="text-blue-400 text-sm mt-2 flex items-center">
                        <svg className="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {validationMessage}
                      </p>
                    )}
                    
                    {emailValidationStatus === 'valid' && !emailError && (
                      <p className="text-green-400 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {validationMessage || 'Email verified successfully'}
                      </p>
                    )}
                    
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-sm mt-2" />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                    <textarea
                      placeholder="Tell me about your project or idea..."
                      name="message"
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={state.submitting || emailError || nameError || isValidatingEmail || (email && emailValidationStatus !== 'valid') || (name && nameValidationStatus !== 'valid')}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">
                    {state.submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : isValidatingEmail ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Validating Email...
                      </>
                    ) : emailError || nameError || (email && emailValidationStatus !== 'valid') || (name && nameValidationStatus !== 'valid') ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Please Fix Errors
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </span>
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;