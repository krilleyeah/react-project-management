import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
 
function ProjectListPage() {
  const [projects, setProjects] = useState([]);
 
  const getAllProjects = () => {
    axios
      .get(`${API_URL}/projects?_embed=tasks`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getAllProjects();
  }, [] );
 
  
  return (
    <div className="ProjectListPage">
      
      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>
      
      
      { projects.map((project) => (
        <ProjectCard key={project.id} {...project} />   
        
      ))}     
       
    </div>
  );
}
 
export default ProjectListPage;