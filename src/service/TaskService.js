import { TodoistApi } from "@doist/todoist-api-typescript";
const api = new TodoistApi(import.meta.env.VITE_API_KEY);
export const createTask = async (payload) => {
  const task = await api.addTask(payload);
  return task;
};
export const fetchTask = async () => {
  const task = await api.getTasks();
  return task;
};
export const editTask = async (id, payload) => {
  const editTask = await api.updateTask(id, payload);
  return editTask;
};
export const deleteTask = async (id) => {
  const response = await api.deleteTask(id);
  return true;
};
export const closeTask = async (id) => {
  const response = await api.closeTask(id);
  return true;
};
