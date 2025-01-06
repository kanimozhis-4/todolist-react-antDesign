import React, { useState, createContext, useEffect } from "react";
import {
  fetchProjects,
  postProject,
  updateProject,
} from "../service/ProjectService";
import { fetchInboxTask } from "../service/TaskService";
export const ProjectsContext = createContext();
const ProjectContext = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [isProject, setIsProject] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [newTask, setNewTask] = useState({
    content: "",
    description: "",
    due_date: "",
    project_id: "",
  });
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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const fetchInitialData = async () => {
    try {
      console.log("out")
      await fetchProjects().then((data) => {
        setAllProjects(data);
      });
      const data = await fetchInboxTask();
      setAllTask(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const saveProject = async () => {
    try {
      const payload = newProject;
      const createdProject = await postProject(payload);
      setAllProjects((prevProjects) => [...prevProjects, createdProject]);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  const editedProject = async () => {
    try {
      const payload = {
        name: newProject.name,
        color: newProject.color,
        is_favorite: newProject.is_favorite,
      };
      const id = newProject.id;
      const updatedProject = await updateProject(id, payload);
      setAllProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? updatedProject : project
        )
      );
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  const handleOk = async () => {
    try {
      if (newProject?.id) {
        await editedProject();
      } else {
        await saveProject();
      }
      setNewProject({
        name: "",
        color: "charcoal",
        is_favorite: false,
      });
      setIsProject(false);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };
  const handleCancel = () => {
    
    setIsProject(false);
  };
  const handleCreateProject = () => {
    setIsProject(true);
  };
  const handleColorChange = (value) => {
    setNewProject({ ...newProject, color: value });
  };
  useEffect(() => {
    fetchInitialData();
  }, []);
  return (
    <ProjectsContext.Provider
      value={{
        allProjects,
        setAllProjects,
        selectedProject,
        setSelectedProject,
        colorMapping,
        handleOk,
        handleCancel,
        handleCreateProject,
        handleColorChange,
        isProject,
        setIsProject,
        newProject,
        setNewProject,
        newTask,
        setNewTask,
        allTask,
        setAllTask,
        collapsed,
        toggleSidebar,
        isBoxVisible,
        setIsBoxVisible,
        setEditingTaskId,
        editingTaskId,
        showProjects,
        setShowProjects,
        projectName,setProjectName
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectContext;
