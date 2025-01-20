// src/components/Projects.jsx
import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="projects-list">
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
      </div>
    </section>
  );
};

export default Projects;
