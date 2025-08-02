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

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    if (emailValue && !validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
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
      
      // Hide notification after delay
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);
    }
  }, [state.succeeded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email before submission
    const formData = new FormData(e.target);
    const emailValue = formData.get('email');
    
    if (!validateEmail(emailValue)) {
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
    <section id="contact" className="py-20 px-8 bg-gray-800 min-h-screen flex flex-col items-center justify-center relative">
      {notification.isVisible && (
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
        />
      )}
      
      <h2 className="text-5xl font-bold text-center text-white mb-16" data-aos="fade-down">
        Get In Touch
      </h2>
      
      <form 
        onSubmit={onSubmit} 
        className="space-y-8 bg-gray-700 p-16 rounded-lg shadow-xl mx-auto w-full max-w-6xl hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center rounded-lg hover:bg-gray-800 "
        data-aos="fade-up"
        data-aos-duration="1000"
        
      >
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-8 py-5 text-xl bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:text-gray-800 transition-all duration-300 hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center rounded-lg "
          />
        </div>
        
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
            required
            className={`w-full px-8 py-5 text-xl bg-gray-600 text-white placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center ${
              emailError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-500 focus:ring-purple-500 focus:border-transparent focus:text-gray-800'
            }`}
          />
          {emailError && (
            <p className="text-red-400 text-sm mt-2">{emailError}</p>
          )}
          <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-500 text-xl" />
        </div>

        <div className="space-y-4" data-aos="fade-up" data-aos-delay="600">
          <textarea
            placeholder="Your Message"
            name="message"
            required
            rows="6"
            className="w-full px-8 py-5 text-xl bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:text-gray-800 transition-all duration-300 hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center rounded-lg resize-none"
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xl" />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full py-5 text-xl bg-gray-600 text-white rounded-lg font-medium hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;