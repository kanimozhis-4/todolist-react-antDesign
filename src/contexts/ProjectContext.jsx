import React, { useState, createContext, useEffect } from "react";
import {
  fetchProjects,
  postProject,
  updateProject,
  deleteProject,
} from "../service/ProjectService";
import { useReducer } from "react";
export const ProjectsContext = createContext();
const ProjectContext = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState({});
  const [isProject, setIsProject] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    color: "charcoal",
    is_favorite: false,
  });
  const colorMapping = {
    berry_red: "#b8256f",
    red: "#db4035",
    orange: "#ff9933",
    yellow: "#fad000",
    olive_green: "#afb83b",
    lime_green: "#7ecc49",
    green: "#299438",
    mint_green: "#6accbc",
    teal: "#158fad",
    sky_blue: "#14aaf5",
    light_blue: "#96c3eb",
    blue: "#4073ff",
    grape: "#884dff",
    violet: "#af38eb",
    lavender: "#eb96eb",
    magenta: "#e05194",
    salmon: "#ff8d85",
    charcoal: "#808080",
    grey: "#b8b8b8",
    taupe: "#ccac93",
  };
  const [collapsed, setCollapsed] = useState(false);
  const [projectName, setProjectName] = useState("");
  const projectInitialState = { projects: [] };
  const projectReducer = (state, action) => {
    switch (action.type) {
      case "fetchProject":
        return { ...state, projects: action.payload };
      case "postProject":
        return { ...state, projects: [...state.projects, action.payload] };
      case "updateProject":
        return {
          ...state,
          projects: state.projects.map((project) =>
            project.id === action.payload.id ? action.payload : project
          ),
        };
      case "deleteProject":
        return {
          ...state,
          projects: state.projects.filter(
            (project) => project.id !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const fetchInitialProjectData = async () => {
    try {
      const ProjectData = await fetchProjects();
      dispatch({ type: "fetchProject", payload: ProjectData });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const saveProject = async () => {
    try {
      const createdProject = await postProject(newProject);
      dispatch({ type: "postProject", payload: createdProject });
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  const editedProject = async (id, newProject) => {
    try {
      const updatedProject = await updateProject(id, newProject);
      dispatch({ type: "updateProject", payload: updatedProject });
      setNewProject({
        name: "",
        color: "charcoal",
        is_favorite: false,
      });
      setIsProject(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  const removeProject = async (projectId) => {
    try {
      console.log("Deleting project with ID:", projectId);
      await deleteProject(projectId);
      dispatch({ type: "deleteProject", payload: projectId });
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleColorChange = (value) => {
    setNewProject({ ...newProject, color: value });
  };
  useEffect(() => {
    fetchInitialProjectData();
  }, []);
  return (
    <ProjectsContext.Provider
      value={{
        allProjects: state.projects,
        dispatch: projectInitialState,
        fetchInitialProjectData,
        selectedProject,
        setSelectedProject,
        colorMapping,
        handleColorChange,
        isProject,
        setIsProject,
        newProject,
        setNewProject,
        collapsed,
        toggleSidebar,
        showProjects,
        setShowProjects,
        projectName,
        setProjectName,
        removeProject,
        editedProject,
        saveProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectContext;
