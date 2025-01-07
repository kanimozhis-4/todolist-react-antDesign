import React, { useState, useContext } from "react";
import { ProjectsContext } from "../../../contexts/ProjectContext";
import { Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";

const ShowProjects = ({ show }) => {
  const navigate = useNavigate();
  const {
    allProjects,
    newProject,
    setNewProject,
    selectedProject,
    setSelectedProject,
    colorMapping,
    isProject,
    setIsProject,
    removeProject,
    editedProject,
  } = useContext(ProjectsContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const handleEdit = (project) => {
    setNewProject({
      ...newProject,
      id: project.id,
      name: project.name,
      color: project.color,
      is_favorite: project.isFavorite,
    });
    setActiveTooltip(null);
    setIsProject(true);
  };
  const handleFavorites = async (project) => {
    try {
      const updatedProject = {
        ...project,
        isFavorite: !project.isFavorite,
      };

      const id = updatedProject.id;
      const payload = {
        name: updatedProject.name,
        color: updatedProject.color,
        is_favorite: updatedProject.isFavorite,
      };
      await editedProject(id, payload);

      setActiveTooltip(null);
    } catch (error) {
      console.error("Failed to update favorite state:", error);
    }
  };
  const handleItemClick = (project) => {
    setSelectedProject(project);
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {allProjects.map((project, index) => {
        if (index == 0) {
          return;
        }
        const hexColor = colorMapping[project?.color] || "#000000";
        if (show === "all" || project.isFavorite)
          return (
            <div
              key={project.id}
              className={`text-black 
                  ${
                    selectedProject?.name === project?.name
                      ? "bg-[#F4A460] rounded  text-red-700 "
                      : " hover:bg-gray-300 hover:rounded"
                  }
                  `}
              onClick={() => {
                handleItemClick(project);
              }}
            >
              <span className={`text-xl mr-4`} style={{ color: hexColor }}>
                #
              </span>
              <span>{project.name}</span>
              <EllipsisOutlined
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer float-right "
                onClick={() => {
                  setActiveTooltip(
                    activeTooltip?.id === project.id
                      ? null
                      : { name: show, id: project.id }
                  );
                  setShowOption(!showOption);
                }}
              />
              {activeTooltip?.id === project.id &&
                activeTooltip?.name === show && (
                  <Tooltip
                    title={
                      <div>
                        <div
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                          onClick={() => {
                            handleEdit(project);
                          }}
                        >
                          ✏️ <span className="ml-2">Edit</span>
                        </div>
                        <div
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                          onClick={() => {
                            handleFavorites(project);
                          }}
                        >
                          ⭐{" "}
                          <span className="ml-2">
                            {project.isFavorite
                              ? "Remove from Favorite"
                              : "Add from Favorite"}
                          </span>
                        </div>
                        <div
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                          onClick={() => {
                            removeProject(project.id);
                          }}
                        >
                          🗑️ <span className="ml-2">Delete</span>
                        </div>
                      </div>
                    }
                    placement="right"
                    overlayInnerStyle={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "15px",
                      borderRadius: "8px",
                    }}
                    open={true}
                  >
                    <div />
                  </Tooltip>
                )}
            </div>
          );
      })}
      <ProjectForm isVisible={isProject} />
    </div>
  );
};

export default ShowProjects;
