import React, { useState, createContext, useEffect } from "react";
import {
  fetchProjectsAsync,
  postProjectAsync,
  updateProjectAsync,
  deleteProjectAsync,
} from "../slice/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
export const ProjectsContext = createContext();

const ProjectContext = ({ children }) => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.projects);
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

  useEffect(() => {
    fetchInitialProjectData();
  }, []);
  const fetchInitialProjectData = async () => {
    dispatch(fetchProjectsAsync());
  };
  const saveProject = () => {
    dispatch(postProjectAsync({ ...newProject }));
    setNewProject({
      name: "",
      color: "charcoal",
      is_favorite: false,
    });
  };

  const editedProject = async (id, newProject) => {
    const project = {
      name: newProject.name,
      color: newProject.color,
      is_favorite: newProject.is_favorite,
    };

    try {
      await dispatch(updateProjectAsync({ id: id, newProject: project }));

      setNewProject({
        name: "",
        color: "charcoal",
        is_favorite: false,
      });
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  const removeProject = (projectId) => {
    dispatch(deleteProjectAsync(projectId));
  };
  return (
    <ProjectsContext.Provider
      value={{
        allProjects,
        fetchInitialProjectData,
        colorMapping,
        newProject,
        setNewProject,
        removeProject,
        editedProject,
        saveProject,
        setShowProjects,
        showProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectContext;
