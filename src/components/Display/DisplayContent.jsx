import React, { useContext, useEffect, useState } from "react";
import { Layout, Button, Input, Spin } from "antd";
import {
  MenuOutlined,
  EllipsisOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { ProjectsContext } from "../../contexts/ProjectContext";
import { PlusOutlined, LayoutOutlined } from "@ant-design/icons";
import TaskForm from "./TaskForm";
import ShowTasks from "./ShowTasks";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import { TasksContext } from "../../contexts/TaskContext";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "../../slice/ProjectSlice";

const { Content, Header } = Layout;

const DisplayContent = ({ collapsed, setCollapsed }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProjects, editedProject, fetchInitialProjectData } =
    useContext(ProjectsContext);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const { setNewTask, fetchInitialTaskData } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  let projectName = selectedProject?.name || "Inbox";

  if (allProjects) {
    const project = allProjects?.find((project) => project.project_id == id);
    projectName = project?.name || "Inbox";
  }
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await fetchInitialProjectData();
      const project = allProjects?.find((project) => project.project_id == id);
      if (project) {
        dispatch(setSelectedProject({ ...project }));
      }
      await fetchInitialTaskData();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchInitialData();
    } else {
      if (allProjects) {
        setLoading(false);
      }
    }
  }, [id]);
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const payload = {
        name: projectName,
        color: selectedProject.color,
        is_favorite: selectedProject.isFavorite,
      };
      await editedProject(id, payload);
      dispatch(setSelectedProject({ ...selectedProject, name: projectName }));
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
              onClick={setCollapsed(!collapsed)}
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
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex flex-col  ml-[25%] mr-[25%] space-y-4">
              {isEditing ? (
                <Input
                  className="text-2xl font-bold"
                  value={projectName}
                  onChange={(e) => {
                    dispatch(
                      setSelectedProject({
                        ...selectedProject,
                        name: e.target.value,
                      })
                    );
                    projectName = e.target.value;
                  }}
                  onBlur={() => setIsEditing(false)}
                  onPressEnter={handleKeyPress}
                  autoFocus
                />
              ) : (
                <span
                  className="text-2xl font-bold"
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: "pointer" }}
                >
                  {projectName || selectedProject?.name}
                </span>
              )}
              <ShowTasks
                projectId={id}
                selectedProject={selectedProject}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
              />
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

              {editingTaskId == 1 && (
                <TaskForm
                  taskId={""}
                  projectId={id}
                  selectedProject={selectedProject}
                  setEditingTaskId={setEditingTaskId}
                />
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DisplayContent;
