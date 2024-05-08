// src/pages/ProjectDetailsPage.jsx
// ... previous imports stay unchanged
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import AddTask from "../components/AddTask"; //  <== IMPORT
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProject = () => {
    axios
      .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
        // console.log(oneProject);
      })
      .catch((error) => console.log(error));
  };

  const deleteProject = () => {
    axios
      .delete(`${API_URL}/projects/${projectId}`)
      .then(() => {
        navigate("/projects");
      })
      .catch((e) => console.log("error deleting project", e));
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddTask refreshProject={getProject} projectId={projectId} />

      {project &&
        project.tasks.map((task) => (
          <li className="TaskCard card" key={task.id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <div className="controls">
        <Link to={`/projects/edit/${projectId}`}>
          <button>Edit</button>
        </Link>

        <button onClick={deleteProject}>Delete</button>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
