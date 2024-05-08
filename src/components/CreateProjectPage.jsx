import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectObj = {
      description: projectDescription,
      title: projectTitle,
    };

    axios
      .post(API_URL + "/projects", projectObj)
      .then((response) => {
        navigate("/projects");
      })
      .catch((e) => {
        console.log("error ", e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="CreateProjectPage">
        <label>
          Title
          <input
            name="projectTitle"
            type="text"
            value={projectTitle}
            onChange={(e) => {
              setProjectTitle(e.target.value);
            }}
          />
        </label>

        <label>
          Description
          <input
            name="projectDescription"
            type="text"
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
            }}
          />
        </label>

        <button>Create</button>
      </div>
    </form>
  );
}

export default CreateProjectPage;
