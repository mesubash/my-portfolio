import React from "react";

const ProjectCard = ({ title, description, image }) => {
  return (
   
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src="#"
      alt="Project Profile"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{title}</h2>
    <p>I{description}</p>
    <div className="card-actions">
      <button className="btn btn-primary">See Code</button>
    </div>
  </div>
</div>
  );
};

export default ProjectCard;
