// src/components/ProjectCard.jsx

import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard({ title, description, id }) {
  return (
    <Link to={`/projects/${id}`}>
      <div className="ProjectCard card">
        <h3>{title}</h3>

        <p style={{ maxWidth: "400px" }}>{description} </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
