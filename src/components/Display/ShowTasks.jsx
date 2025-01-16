import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TaskForm from "./TaskForm";
import { TasksContext } from "../../contexts/TaskContext";
const ShowTasks = ({ projectId,selectedProject , setEditingTaskId, editingTaskId}) => {
  const { allTask, removeTask, closedTask } =
    useContext(TasksContext);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const defaultProjectId = "2345640986";
  let task = allTask?.filter((task) =>
    projectId
      ? task.project_id == projectId
      : task.project_id == defaultProjectId
  );
  const handleMouseEnter = (id) => {
    setHoveredTaskId(id);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };
  const handleDelete = async (id) => {
    await removeTask(id);
  };
  const handleCheckbox = async (id) => {
    await closedTask(id);
  };

  return (
    <div className="flex flex-col space-y-4">
      {task.map((task) =>
        editingTaskId == task.task_id ? (
          <TaskForm  key={`form-${task.task_id}`} taskId={task.task_id} projectId={projectId} selectedProject={selectedProject} setEditingTaskId={setEditingTaskId}/>
        ) : (
          <div
          key={`task-${task.task_id}`}
            className="flex space-x-4 justify-between"
            onMouseEnter={() => handleMouseEnter(task.task_id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex space-x-4">
              <Checkbox
                className="circular-checkbox "
                onChange={() => handleCheckbox(task.task_id)}
              />
              <span>{task?.content}</span>
            </div>
            {hoveredTaskId === task.task_id && (
              <div className="ml-auto flex space-x-3">
                <EditOutlined
                  className="text-gray-500 cursor-pointer text-lg hover:scale-110"
                  title="Edit Task"
                  onClick={() =>{setEditingTaskId(task.task_id)}}
                />
                <DeleteOutlined
                  className="text-gray-500 cursor-pointer text-lg hover:scale-110"
                  title="Delete Task"
                  onClick={() => handleDelete(task.task_id)}
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
