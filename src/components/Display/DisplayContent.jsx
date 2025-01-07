import React, { useContext, useEffect, useState } from "react";
import { Layout, Button, Input } from "antd";
import {
  MenuOutlined,
  EllipsisOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { ProjectsContext } from "../../contexts/ProjectContext";
import { PlusOutlined, LayoutOutlined } from "@ant-design/icons";
import { updateProject } from "../../service/ProjectService";
import TaskForm from "./TaskForm";
import ShowTasks from "./ShowTasks";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import { TasksContext } from "../../contexts/TaskContext";

const { Content, Header } = Layout;

const DisplayContent = () => {
  const { id } = useParams();
  const {
    allProjects,
    dispatch,
    collapsed,
    toggleSidebar,
    setAllProjects,
    setSelectedProject,
    selectedProject,
    fetchInitialProjectData,
  } = useContext(ProjectsContext);
  const { setNewTask, setEditingTaskId, editingTaskId, fetchInitialTaskData } =
    useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState("Inbox");
 const fetchInitialData=async()=>{
  await fetchInitialProjectData();
  await fetchInitialTaskData();
  const project = allProjects.find((project) => project.id === id);
      if (project) {
        setProjectName(project?.name || "Inbox");
        setSelectedProject(project);
        console.log(project,"project")
      }
 }
  useEffect(() => {
    if (id) { 
      fetchInitialData()
      
      
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const payload = {
        name: projectName,
        color: selectedProject.color,
        is_favorite: selectedProject.isFavorite,
      };
      const editedData = await updateProject(id, payload);
      dispatch();
      const project = allProjects.map((project) => {
        if (project.id === id) {
          return editedData;
        }
        return project;
      });
      setSelectedProject({ ...selectedProject, name: projectName });
      setAllProjects([...project]);
      setIsEditing(false);
    }
  };
  return (
    <Layout className="min-h-screen ">
      {id &&
        (collapsed ? (
          <div>
            <Button
              type="text"
              className="text-gray-600 m-2 ml-6"
              onClick={toggleSidebar}
              icon={<LayoutOutlined />}
            />
          </div>
        ) : (
          <SideBar />
        ))}
      <Layout>
        <Header className=" p-3 h-auto bg-gray-100">
          <div className="flex justify-end gap-2 items-center ">
            <div className="flex gap-2">
              <MenuOutlined />
              <span>View</span>
            </div>

            {<MessageOutlined className="ml-6" />}
            {<EllipsisOutlined className="text-xl" />}
          </div>
        </Header>

        <Content>
          <div className="flex flex-col  ml-[25%] mr-[25%] space-y-4">
            {isEditing ? (
              <Input
                className="text-2xl font-bold"
                value={selectedProject.name || projectName}
                onChange={handleInputChange}
                onBlur={() => setIsEditing(false)}
                onPressEnter={handleKeyPress}
                autoFocus
              />
            ) : (
              <span
                className="text-2xl font-bold"
                onClick={handleEditClick}
                style={{ cursor: "pointer" }}
              >
                {selectedProject.name || projectName}
              </span>
            )}
            <ShowTasks projectId={id} />
            <div className="flex flex-row space-x-2">
              <PlusOutlined
                className="text-red-500"
                onClick={() => {
                  setNewTask({
                    content: "",
                    description: "",
                    due_date: "",
                    project_id: "",
                  });
                  setEditingTaskId("1");
                }}
              />
              <h5 className={`text-gray-500`}>Add Task</h5>
            </div>

            {editingTaskId === "1" && <TaskForm taskId={""} projectId={id} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DisplayContent;
