import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProjectsContext } from "../../contexts/ProjectContext";
import { deleteTask, closeTask } from "../../service/TaskService";
import TaskForm from "./TaskForm";
const ShowTasks = ({ projectId }) => {
  const { allTask, setAllTask, setEditingTaskId, editingTaskId } =
    useContext(ProjectsContext);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const defaultProjectId = "2345640986";

  let task = allTask?.filter((task) =>
    projectId
      ? task.projectId === projectId
      : task.projectId === defaultProjectId
  );

  const handleMouseEnter = (id) => {
    setHoveredTaskId(id);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };
  const handleDelete = async (id) => {
    const removeData = await deleteTask(id);
    if (removeData) {
      const task = allTask?.filter((task) => task.id != id);
      setAllTask([...task]);
    }
  };
  const handleCheckbox = async (id) => {
    const response = await closeTask(id);
    const task = allTask.filter((task) => task.id != id);
    setAllTask(task);
  };

  return (
    <div className="flex flex-col space-y-4">
      {task.map((task) =>
        editingTaskId === task.id ? (
          <TaskForm key={task.id} taskId={task.id} projectId={projectId} />
        ) : (
          <div
            key={task.id}
            className="flex space-x-4 justify-between"
            onMouseEnter={() => handleMouseEnter(task.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex space-x-4">
              <Checkbox
                className="circular-checkbox "
                onChange={() => handleCheckbox(task.id)}
              />
              <span>{task?.content}</span>
            </div>
            {hoveredTaskId === task.id && (
              <div className="ml-auto flex space-x-3">
                <EditOutlined
                  className="text-gray-500 cursor-pointer text-lg hover:scale-110"
                  title="Edit Task"
                  onClick={() => setEditingTaskId(task.id)}
                />
                <DeleteOutlined
                  className="text-gray-500 cursor-pointer text-lg hover:scale-110"
                  title="Delete Task"
                  onClick={() => handleDelete(task.id)}
                />
              </div>
            )}
          </div>
        )
      )}
      <hr className="border-gray-300 w-full" />
    </div>
  );
};

export default ShowTasks;
