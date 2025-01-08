import { TodoistApi } from "@doist/todoist-api-typescript";
const api = new TodoistApi(import.meta.env.VITE_API_KEY);
export const postProject = async (payload) => {
  const projects = await api.addProject(payload);
  return projects;
};
export const fetchProjects = async () => {
  const projects = await api.getProjects();
  return projects;
};
export const updateProject = async (id, payload) => {
  const projects = await api.updateProject(id, payload);
  return projects;
};
export const deleteProject = async (id) => {
  await api.deleteProject(id);
};
