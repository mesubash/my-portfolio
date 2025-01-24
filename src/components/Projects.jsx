import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-12 bg-gray-800 px-4">
      <h2 className="text-3xl font-bold text-center text-base-content">My Projects</h2>
      <div className="container mx-auto max-w-8xl">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard
            title="NepEducation"
            description="A simple learning platform developed using PHP, HTML/CSS, JS."
            image="src/assets/project/dummy.png"
            github="https://github.com/mesubash/NepEducation"
          />
          <ProjectCard
            title="Simple TODO App"
            description="A simple todo app in JAVA(JavaFX) with CRUD operations."
            image="src/assets/project/dummy.png"
            github="https://github.com/mesubash/ToDo_Desktop_App"
          />
          <ProjectCard
            title="Private"
            description="Worked on many private projects of the multiple clients for android dev etc."
            image="src/assets/project/dummy.png"
            github=""
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;