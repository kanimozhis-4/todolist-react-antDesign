import { TodoistApi } from "@doist/todoist-api-typescript";
const api = new TodoistApi(import.meta.env.VITE_API_KEY); 
import clientCall from "../client/clientCall"; 
export const postProject = async (payload) => {
  const url='http://127.0.0.1:8080/todoList/project';
  const method='POST'
  const response = await clientCall(url, method, payload);
  return response.data
  // const projects = await api.addProject(payload);
  // return projects;
};
export const fetchProjects = async () => {
  const url='http://127.0.0.1:8080/todoList/project';
  const method='GET'
  // console.log("in")
  const response = await clientCall(url);
  // console.log("out")
  return response.data
  // const projects = await api.getProjects();
  // return projects;
};
export const updateProject = async (id, payload) => {
  // console.log("updateproject",id,payload); 
   const url=`http://127.0.0.1:8080/todoList/project/${id}`;
  const method='PUT'
  const response = await clientCall(url, method, payload);
  return response.data
  // const projects = await api.updateProject(id, payload);
  // return projects;
};
export const deleteProject = async (id) => {
  console.log("idddddd",id);
  const url=`http://127.0.0.1:8080/todoList/project/delete/${id}`
  const method='DELETE';
  const response = await clientCall(url, method,{});
  console.log("responseee",response)
  return response

  // await api.deleteProject(id);
};
