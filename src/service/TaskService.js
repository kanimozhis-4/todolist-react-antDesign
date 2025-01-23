import { TodoistApi } from "@doist/todoist-api-typescript";
import clientCall from "../client/clientCall";
const api = new TodoistApi(import.meta.env.VITE_API_KEY);
export const createTask = async (payload) => {
  const url = "http://127.0.0.1:8080/todoList/task";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const fetchTask = async () => {
  const url = "http://127.0.0.1:8080/todoList/task";
  const method = "GET";
  const response = await clientCall(url, method, {});

  return response.data;
};
export const editTask = async (id, payload) => {
  const url = `http://127.0.0.1:8080/todoList/task/${id}`;
  const method = "PUT";
  payload = { ...payload, is_completed: false };
  const response = await clientCall(url, method, payload);
  return response;
};
export const deleteTask = async (id) => {
  const url = `http://127.0.0.1:8080/todoList/task/delete/${id}`;
  const method = "DELETE";
  const response = await clientCall(url, method, {});
  return true;
};
export const closeTask = async (id) => {
  const url = `http://127.0.0.1:8080/todoList/task/delete/${id}`;
  const method = "DELETE";
  const response = await clientCall(url, method, {});
  return true;
};
