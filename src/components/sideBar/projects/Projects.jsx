import React, { useContext, useState } from "react";
import { RightOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import ShowProjects from "./ShowProjects";
import ProjectForm from "./ProjectForm";
import { ProjectsContext } from "../../../contexts/ProjectContext";
const Projects = () => {
  const [isProject, setIsProject] = useState(false);
  const { showProjects, setShowProjects, setNewProject, newProject } =
    useContext(ProjectsContext);
  const handleNewProject = () => {
    console.log("newProject", newProject);
    setNewProject({
      name: "",
      color: "charcoal",
      is_favorite: false,
    });
    setIsProject(true);
  };
  return (
    <div>
      <div className="flex flex-row justify-between cursor-pointer">
        <h1 className="font-bold text-gray-500">Projects</h1>
        <div className="flex justify-end gap-4">
          <PlusOutlined
            className={`text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 cursor-default
      
            `}
            onClick={handleNewProject}
          />
          {!showProjects ? (
            <RightOutlined
              className="text-gray-500 opacity-0 
              transition-opacity group-hover:opacity-100 group-focus:opacity-100 cursor-pointer"
              onClick={(e) => {
                setShowProjects(!showProjects);
              }}
            />
          ) : (
            <DownOutlined
              className="text-gray-500"
              onClick={(e) => {
                setShowProjects(!showProjects);
              }}
            />
          )}
        </div>
      </div>
      {showProjects && (
        <ShowProjects
          show={"all"}
          isProject={isProject}
          setIsProject={setIsProject}
        />
      )}
      <ProjectForm isVisible={isProject} setIsProject={setIsProject} />
    </div>
  );
};

export default Projects;
