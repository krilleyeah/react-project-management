import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ProjectListPage from "./components/ProjectListPage";
import CreateProjectPage from "./components/CreateProjectPage";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import EditProjectPage from "./components/EditProjectPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/edit/:projectId" element={<EditProjectPage />} />
        <Route path="*" element={<p>404 Error</p>} />
      </Routes>
    </>
  );
}

export default App;
