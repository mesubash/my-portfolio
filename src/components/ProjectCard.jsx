import React from "react";

const ProjectCard = ({ title, description, image, github }) => {
  return (
    <div 
      className="card w-80 h-80 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center rounded-lg"
      style={{ backgroundImage: `url(${image})` }} // Set image as background
    >
      <div className="card-body flex flex-col justify-between h-full bg-black bg-opacity-60 rounded-lg p-4">
        <div>
          <h2 className="card-title text-white">{title}</h2>
          <p className="text-gray-200">{description}</p>
        </div>
        <div className="card-actions flex justify-end">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <button className="btn bg-gray-500 hover:bg-purple-600 text-white">See Code</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
