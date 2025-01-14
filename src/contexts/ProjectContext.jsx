import React, { useState, createContext, useEffect } from "react";
import {
  fetchProjectsAsync,
  postProjectAsync,
  updateProjectAsync,
  deleteProjectAsync,
} from "../slice/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
export const ProjectsContext = createContext();

const ProjectContext = ({ children }) => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.projects);
  // console.log("allProject",allProjects)
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
    dispatch(postProjectAsync({...newProject,user_id:10001}));
    setNewProject({
      name: "",
      color: "charcoal",
      is_favorite: false,
    });
  };

  const editedProject = async (id, newProject) => {
    const project = {
      user_id: 10001,
      name: newProject.name,
      color: newProject.color,
      is_favorite: newProject.is_favorite,
    };
  
    try {
      // Await the asynchronous dispatch
      await dispatch(updateProjectAsync({ id: id, newProject: project }));
      
      // Reset the newProject state after the async operation is complete
      setNewProject({
        name: "",
        color: "charcoal",
        is_favorite: false,
      });
  
      // Log the updated projects list
      console.log("allproject", allProjects);
    } catch (error) {
      // Handle any errors that occur during the async dispatch
      console.error("Error updating project:", error);
    }
  };
  

  const removeProject = (projectId) => {
    dispatch(deleteProjectAsync(projectId));
    console.log("allproject", allProjects);
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
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectContext;
