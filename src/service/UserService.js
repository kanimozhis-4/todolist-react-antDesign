import clientCall from "../client/clientCall";
export const logInUser = async (payload) => {
  const url = "http://127.0.0.1:8080/todoList/user/login";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const signInUser = async (payload) => {
  const url = "http://127.0.0.1:8080/todoList/user/register";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
