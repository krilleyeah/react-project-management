import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage(props) {
  //const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProject = () => {
    axios
      .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        // setProject(response.data);
      })
      .catch((e) => {
        console.log("error ", e);
      });
  };

  const deleteProject = () => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/projects/${projectId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectObj = {
      title: title,
      description: description,
    };

    axios
      .put(`${API_URL}/projects/${projectId}`, projectObj)
      .then((response) => {
        navigate(`/projects/${projectId}`);
      })
      .catch((e) => console.log("error updating project", e));
  };

  if (title === null || description === null) {
    return <div className="loader"></div>;
  }

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
