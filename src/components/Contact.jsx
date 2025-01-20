// src/components/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-700">Contact Me</h2>
      <form action="#" method="post" className="max-w-lg mx-auto mt-8">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          placeholder="Your Message"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
