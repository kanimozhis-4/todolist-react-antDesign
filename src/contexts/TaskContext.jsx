import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  createTaskAsync,
  editTaskAsync,
  deleteTaskAsync,
  closeTaskAsync,
} from "../slice/TaskSlice";
export const TasksContext = createContext();
const TaskContext = ({ children }) => {
  const dispatch = useDispatch();
  const allTask = useSelector((state) => state.tasks.tasks);
  const [newTask, setNewTask] = useState({
    content: "",
    description: "",
    due_date: "",
    project_id: null,
  });
  useEffect(() => {
    fetchInitialTaskData();
  }, []);
  const fetchInitialTaskData = () => {
    dispatch(fetchTasksAsync());
  };
  const addNewTask = async (newTask) => {
    dispatch(createTaskAsync(newTask));
    setNewTask({
      content: "",
      description: "",
      due_date: "",
      project_id: "",
    });
  };
  const editedTask = (id, updatedTask) => {
    dispatch(editTaskAsync({ id, updatedTask }));
    setNewTask({
      content: "",
      description: "",
      due_date: "",
      project_id: "",
    });
  };
  const removeTask = (taskId) => {
    dispatch(deleteTaskAsync(taskId));
  };
  const closedTask = (taskId) => {
    dispatch(closeTaskAsync(taskId));
  };

  return (
    <TasksContext.Provider
      value={{
        allTask,
        addNewTask,
        editedTask,
        removeTask,
        closedTask,
        newTask,
        setNewTask,
        fetchInitialTaskData,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TaskContext;
