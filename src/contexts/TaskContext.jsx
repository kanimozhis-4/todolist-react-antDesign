import React, { useState, createContext, useEffect } from "react";
import {
  fetchTask,
  editTask,
  closeTask,
  deleteTask,
  createTask,
} from "../service/TaskService";
import { useReducer } from "react";
export const TasksContext = createContext();
const TaskContext = ({ children }) => {
  const taskInitialState = { tasks: [] };
  const taskReducer = (state, action) => {
    switch (action.type) {
      case "fetchTasks":
        return { ...state, tasks: action.payload };
      case "addTask":
        return { ...state, tasks: [...state.tasks, action.payload] };
      case "updateTask":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ),
        };
      case "deleteTask":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      case "closeTask":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(taskReducer, taskInitialState);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    content: "",
    description: "",
    due_date: "",
    project_id: "",
  });
  const fetchInitialTaskData = async () => {
    try {
      const data = await fetchTask();
      dispatch({ type: "fetchTasks", payload: data });
      console.log("taskData",data);
    } catch (error) {
      console.error("Error in add new data:", err);
    }
  };

  const addNewTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      dispatch({ type: "addTask", payload: createdTask });
    } catch (error) {
      console.error("Error in add new data:", err);
    }
  };

  const editedTask = async (id, updatedTask) => {
    try {
      const task = await editTask(id, updatedTask);
      dispatch({ type: "updateTask", payload: task });
    } catch (error) {
      console.error("Error in edit data:", err);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      dispatch({ type: "deleteTask", payload: taskId });
    } catch (error) {
      console.error("Error removeTask data:", err);
    }
  };
  const closedTask = async (taskId) => {
    try {
      await closeTask(taskId);
      dispatch({ type: "closeTask", payload: taskId });
    } catch (error) {
      console.error("Error closeTask data:", err);
    }
  };

  useEffect(() => {
    fetchInitialTaskData();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        allTask: state.tasks,
        dispatch: taskInitialState,
        addNewTask,
        editedTask,
        removeTask,
        closedTask,
        newTask,
        setNewTask,
        editingTaskId,
        setEditingTaskId,
        fetchInitialTaskData,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TaskContext;
