import React, { useState } from "react";

const ProjectCard = ({ title, description, image, github }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div 
      className="card w-80 h-80 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-600 hover:shadow-lg relative bg-cover bg-center rounded-lg"
      style={{ backgroundImage: `url(${image})` }} // Set image as background
    >
      <div className="card-body flex flex-col justify-between h-full bg-black bg-opacity-60 rounded-lg p-4">
        <div>
          <h2 className="card-title text-purple-500 font-bold">{title}</h2>
          <p className="text-white">
            {showFullDescription
              ? description
              : `${description.slice(0, 100)}${description.length > 100 ? "..." : ""}`}
          </p>
          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-purple-500 hover:underline mt-2 text-sm"
            >
              {showFullDescription ? "See Less" : "See More"}
            </button>
          )}
        </div>
        <div className="card-actions absolute bottom-4 right-4">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <button className="btn bg-gray-500 hover:bg-purple-600 text-white text-xs px-3 py-1">
                See Code
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;