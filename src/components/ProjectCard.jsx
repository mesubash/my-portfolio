import React from "react";

const ProjectCard = ({ title, description, image, github }) => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl transition-transform duration-300 hover:scale-105">
      <figure>
        <img
          src={image}  // Fixed image source syntax
          alt={title} 
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{title}</h2>
        <p className="text-gray-200">{description}</p>
        <div className="card-actions justify-end">
          {github && (  // Conditional rendering for github link
            <a href={github} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">See Code</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;