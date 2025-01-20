import clientCall from "../client/clientCall";
export const postProject = async (payload) => {
  const url = "https://be-todolist-production.up.railway.app/todoList/project";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const fetchProjects = async () => {
  const url = "https://be-todolist-production.up.railway.app/todoList/project";
  const method = "GET";
  const response = await clientCall(url);
  return response.data;
};
export const updateProject = async (id, payload) => {
  const url = `https://be-todolist-production.up.railway.app/todoList/project/${id}`;
  const method = "PUT";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const deleteProject = async (id) => {
  const url = `https://be-todolist-production.up.railway.app/todoList/project/delete/${id}`;
  const method = "DELETE";
  const response = await clientCall(url, method, {});
  console.log("responseee", response);
  return response;
};
