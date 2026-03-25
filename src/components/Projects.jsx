import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Yugo: Smart Mobility Platform",
      description: "A production-ready QR-based fare collection system for public transport, developed using Flutter, Spring Boot, and PostgreSQL. Features include digital wallet integration (Khalti), token-based tap-in/out, admin dashboard, and microservices architecture.",
      image: "./assets/project/yugo_logo.png",
      tags: ["Flutter", "Spring Boot", "PostgreSQL", "Microservices"],
      github: "",
      liveUrl: "https://yugo.subashsdhami.com.np/",
      featured: true,
    },
    {
      title: "QuizMaster",
      description: "A quiz application developed with Spring Boot for the backend and Next.js for the frontend. Includes authentication and an enhanced user interface.",
      image: "./assets/project/brain.png",
      tags: ["Spring Boot", "Next.js", "Authentication"],
      github: "https://github.com/mesubash/Quiz-App",
      liveUrl: "https://quizapp.subashsdhami.com.np/",
      featured: true,
    },
    {
      title: "Khojdu",
      description: "Nepal's premier rental property platform designed to solve housing search challenges in Kathmandu Valley and beyond with Spring Boot and Next.js.",
      image: "./assets/project/khojdu.png",
      tags: ["Spring Boot", "Next.js", "PostgreSQL", "Redis"],
      github: "https://github.com/mesubash/Khojdu",
      liveUrl: "https://khojdu.subashsdhami.com.np/",
      featured: true,
    },
    {
      title: "SMS Spam Detection",
      description: "SMS spam detection using ML in Python with Docker, FastAPI and Streamlit for real-time classification.",
      image: "./assets/project/spam-detection.png",
      tags: ["Python", "Machine Learning", "Docker", "FastAPI"],
      github: "https://github.com/mesubash/sms-spam-detection",
      liveUrl: "",
      featured: true,
    },
    {
      title: "Library Management System",
      description: "A Library Management System developed using Spring Boot and React with features for managing books, users, and transactions.",
      image: "./assets/project/private.png",
      tags: ["Spring Boot", "React", "CRUD"],
      github: "https://github.com/mesubash/library-management-system",
      liveUrl: "https://lms.subashsdhami.com.np/",
    },
    {
      title: "NepEducation",
      description: "A simple learning platform developed using PHP, HTML/CSS, and JavaScript.",
      image: "./assets/project/private.png",
      tags: ["PHP", "HTML/CSS", "JavaScript"],
      github: "https://github.com/mesubash/NepEducation",
      liveUrl: "",
    },
    {
      title: "TODO Desktop App",
      description: "A desktop todo app built with Java (JavaFX) featuring full CRUD operations.",
      image: "./assets/project/private.png",
      tags: ["Java", "JavaFX", "Desktop App"],
      github: "https://github.com/mesubash/ToDo_Desktop_App",
      liveUrl: "",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section ref={sectionRef} className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-600/[0.03] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A collection of projects showcasing my expertise in full-stack development,
            machine learning, and modern web technologies.
          </p>
        </motion.div>

        {/* Projects - Horizontal scroll on mobile, grid on desktop */}
        <motion.div
          className="flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants} className="min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-center">
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
        {/* Mobile scroll hint */}
        <div className="flex md:hidden justify-center mt-4 gap-1">
          <span className="text-[10px] text-gray-600 font-mono">Swipe to explore</span>
          <svg className="w-3 h-3 text-gray-600 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5" /></svg>
        </div>

        {/* More Projects CTA */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="glass-card-hover p-8 sm:p-10 max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Explore More Projects
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">
              I have worked on many small and private projects, including Android development,
              web applications, and more. Check out my GitHub for the complete collection.
            </p>
            <motion.a
              href="https://github.com/mesubash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-full shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
