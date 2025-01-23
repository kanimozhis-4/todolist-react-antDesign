import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProjectsContext } from "../../../contexts/ProjectContext";
import { Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";
import { setSelectedProject } from "../../../slice/ProjectSlice";

const ShowProjects = ({ show, isProject, setIsProject }) => {
  const navigate = useNavigate();
  const {
    allProjects,
    setNewProject,
    colorMapping,
    removeProject,
    editedProject,
  } = useContext(ProjectsContext);
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const handleEdit = (project) => {
    setNewProject({
      id: project.project_id,
      name: project.name,
      color: project.color,
      is_favorite: project.isFavorite || false,
    });
    setActiveTooltip(null);
    setIsProject(true);
  };

  const handleFavorites = async (project) => {
    try {
      const id = project.project_id;
      const payload = {
        name: project.name,
        color: project.color,
        is_favorite: project.is_favorite === 0 ? true : false,
      };
      await editedProject(id, payload);

      setActiveTooltip(null);
    } catch (error) {
      console.error("Failed to update favorite state:", error);
    }
  };
  const handleItemClick = (project) => {
    dispatch(setSelectedProject({ ...project }));
    navigate(`/project/${project.project_id}`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {allProjects.map((project, index) => {
        const hexColor = colorMapping[project?.color] || "#000000";
        if (
          show === "all" ||
          project.is_favorite === 1 ||
          project.is_favorite == true
        )
          return (
            <div
              key={project.project_id}
              className={`text-black 
                  ${
                    selectedProject?.project_id == project?.project_id
                      ? "bg-[#F4A460] rounded  text-red-700 "
                      : " hover:bg-gray-300 hover:rounded"
                  }
                  `}
              onClick={(e) => {
                console.log("clicked");
                handleItemClick(project);
              }}
            >
              <span className={`text-xl mr-4`} style={{ color: hexColor }}>
                #
              </span>
              <span>{project.name}</span>
              <EllipsisOutlined
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer float-right "
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(
                    activeTooltip?.id === project.project_id
                      ? null
                      : { name: show, id: project.project_id }
                  );
                  handleItemClick(project);
                  setShowOption(!showOption);
                }}
              />
              {activeTooltip?.id === project.project_id &&
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
                            {project.is_favorite == 1 ||
                            project.is_favorite == true
                              ? "Remove from Favorite"
                              : "Add from Favorite"}
                          </span>
                        </div>
                        <div
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                          onClick={() => {
                            removeProject(project.project_id);
                            setActiveTooltip(null);
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
      <ProjectForm isVisible={isProject} setIsProject={setIsProject} />
    </div>
  );
};

export default ShowProjects;
