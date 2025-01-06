import React, { useState, useContext } from "react";
import { ProjectsContext } from "../../../contexts/ProjectContext";
import { RightOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import ShowProjects from "./ShowProjects";
import ProjectForm from "./ProjectForm";
const Projects = () => {
  const { handleCreateProject, isProject,showProjects,setShowProjects } = useContext(ProjectsContext);

 

  return (
    <div>
      <div className="flex flex-row justify-between cursor-pointer">
        <h1 className="font-bold text-gray-500">Projects</h1>
        <div className="flex justify-end gap-4">
          <PlusOutlined
            className={`text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 cursor-default
      
            `}
            onClick={handleCreateProject}
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
                console.log("clicked");
                setShowProjects(!showProjects);
              }}
            />
          )}
        </div>
      </div>
      {showProjects && <ShowProjects show={"all"} />}
      <ProjectForm isVisible={isProject} />
    </div>
  );
};

export default Projects;
