import React from "react";

const LandingPage = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Hello, I'm Subash Singh Dhami</h1>
        <p className="text-lg mt-4">A Software Engineering Student.</p>
        <a
          href="#about"
          className="mt-8 inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default LandingPage;
