import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "aos/dist/aos.css";
import AOS from "aos";

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100
    });

    // Parallax effect for header
    const handleScroll = () => {
      const header = document.querySelector('#projects-header');
      if (header) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        header.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Parallax */}
        <div id="projects-header" className="text-center mb-16 transition-transform duration-100" data-aos="fade-down">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6 shadow-lg shadow-purple-500/50"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects showcasing my expertise in full-stack development, 
            machine learning, and modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100">
            <ProjectCard
              title="Yugo: Smart Mobility Platform"
              description="A production-ready QR-based fare collection system for public transport, developed using Flutter, Spring Boot, and PostgreSQL. Features include digital wallet integration (Khalti), token-based tap-in/out, admin dashboard, and microservices architecture. Built in collaboration with a 4-member team."
              image="./assets/project/yugo_logo.png"
              tags={["Flutter", "Spring Boot", "PostgreSQL", "Microservices"]}
              github="" 
              liveUrl="https://yugo.subashsdhami.com.np/"
              featured={true}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="QuizMaster"
              description="A quiz application developed with Spring Boot for the backend and Next.js for the frontend. The backend is complete, and I am currently working on the frontend, which includes implementing authentication and enhancing the user interface."
              image="./assets/project/brain.png"
              tags={["Spring Boot", "Next.js", "Authentication"]}
              github="https://github.com/mesubash/Quiz-App"
              liveUrl="https://quizapp.subashsdhami.com.np/"
              featured={true}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="Khojdu"
              description="Nepal's premier rental property platform designed to solve the housing search challenges in Kathmandu Valley and beyond with Spring Boot for the backend and Next.js for the frontend. The backend is complete, and I am currently working on the frontend, which includes implementing authentication and enhancing the user interface."
              image="./assets/project/khojdu.png"
              tags={["Spring Boot", "Next.js", "PostgreSQL", "Redis"]}
              github="https://github.com/mesubash/Khojdu"
              liveUrl="https://khojdu.subashsdhami.com.np/"
              featured={true}
            />
          </div>


          <div data-aos="fade-up" data-aos-delay="300">
            <ProjectCard
              title="SMS Spam Detection"
              description="SMS spam detection using ML in python with Docker, FastAPI and Streamlit."
              image="./assets/project/spam-detection.png"
              tags={["Python", "Machine Learning", "Docker", "FastAPI"]}
              github="https://github.com/mesubash/sms-spam-detection"
              liveUrl=""
              featured={true}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <ProjectCard
              title="Library Management System"
              description="A Library Management System developed using Spring Boot and React. It includes features for managing books, users, and transactions. It is currently in progress."
              image="./assets/project/private.png"
              tags={["Spring Boot", "React", "CRUD"]}
              github="https://github.com/mesubash/library-management-system"
              liveUrl="https://lms.subashsdhami.com.np/"
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="500">
            <ProjectCard
              title="NepEducation"
              description="A simple learning platform developed using PHP, HTML/CSS, JS."
              image="./assets/project/private.png"
              tags={["PHP", "HTML/CSS", "JavaScript"]}
              github="https://github.com/mesubash/NepEducation"
              liveUrl=""
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="600">
            <ProjectCard
              title="TODO Desktop App"
              description="A desktop todo app in JAVA(JavaFX) with CRUD operations."
              image="./assets/project/private.png"
              tags={["Java", "JavaFX", "Desktop App"]}
              github="https://github.com/mesubash/ToDo_Desktop_App"
              liveUrl=""
            />
          </div>
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="700">
          <div className="group bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8 max-w-2xl mx-auto hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 transform">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              Explore More Projects
            </h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
              I have worked on many small and private projects, including Android development, 
              web applications, and more. Check out my GitHub for the complete collection.
            </p>
            <a
              href="https://github.com/mesubash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform relative overflow-hidden group/btn"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <span className="text-2xl animate-bounce">🚀</span>
                View All Projects
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;