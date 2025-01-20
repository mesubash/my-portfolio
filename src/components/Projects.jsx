// src/components/Projects.jsx
import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section id="projects" className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-700">My Projects</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="Project 1"
          description="A brief description of your project."
          image="/assets/project1.png"
        />
        <ProjectCard
          title="Project 2"
          description="A brief description of your project."
          image="/assets/project2.png"
        />
        {/* Add more ProjectCard components as needed */}
      </div>
    </section>
  );
};

export default Projects;
