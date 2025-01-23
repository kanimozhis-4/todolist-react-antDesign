import clientCall from "../client/clientCall";
export const postProject = async (payload) => {
  const url = "http://127.0.0.1:8080/todoList/project";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const fetchProjects = async () => {
  const url = "http://127.0.0.1:8080/todoList/project";
  const response = await clientCall(url);
  return response.data;
};
export const updateProject = async (id, payload) => {
  const url = `http://127.0.0.1:8080/todoList/project/${id}`;
  const method = "PUT";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const deleteProject = async (id) => {
  const url = `http://127.0.0.1:8080/todoList/project/delete/${id}`;
  const method = "DELETE";
  const response = await clientCall(url, method, {});
  return response;
};
