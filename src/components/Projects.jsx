import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "aos/dist/aos.css";
import AOS from "aos";

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section id="projects" className="min-h-screen py-12 bg-gray-800 px-4">
      <h2 
        className="text-3xl font-bold text-center text-base-content"
        data-aos="fade-down"
      >
        My Projects
      </h2>
      <div className="container mx-auto max-w-8xl">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          <div data-aos="fade-up" data-aos-delay="100">
            <ProjectCard
              title="Yugo: Smart Mobility Platform"
              description="A production-ready QR-based fare collection system for public transport, developed using Flutter, Spring Boot, and PostgreSQL. Features include digital wallet integration (Khalti), token-based tap-in/out, admin dashboard, and microservices architecture. Built in collaboration with a 4-member team."
              image="./assets/project/yugo_logo.png"
              github="" 
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
          <ProjectCard
              title="QuizMaster"
              description="A quiz application developed with Spring Boot for the backend and Next.js for the frontend. The backend is complete, and I am currently working on the frontend, which includes implementing authentication and enhancing the user interface."
              image="./assets/project/brain.png"
              github="https://github.com/mesubash/Quiz-App"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            
            <ProjectCard
              title="NepEducation"
              description="A simple learning platform developed using PHP, HTML/CSS, JS."
              image="./assets/project/private.png"
              github="https://github.com/mesubash/NepEducation"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="SMS Spam Detection"
              description="SMS spam detection using ML in python with Docker,FastAPI and Streamlit."
              image="./assets/project/spam-detection.png"
              github="https://github.com/mesubash/sms-spam-detection"
            />
          </div>
                    <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="Library Management System"
              description="A Library Management System developed using Spring Boot and React. It includes features for managing books, users, and transactions. It is currently in progress."
              image="./assets/project/private.png"
              github="https://github.com/mesubash/library-management-system"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="Simple TODO App"
              description="A simple todo app in JAVA(JavaFX) with CRUD operations."
              image="./assets/project/private.png"
              github="https://github.com/mesubash/ToDo_Desktop_App"
            />
          </div>


          <div data-aos="fade-up" data-aos-delay="200">
            <ProjectCard
              title="More Projects"
              description="I have worked on many small and private projects, including Android development, web applications, and more. Feel free to check out my GitHub for more details."
              image="./assets/project/private.png"
              github="https://github.com/mesubash"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;