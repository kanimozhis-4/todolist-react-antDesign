import clientCall from "../client/clientCall";
export const logInUser = async (payload) => {
  const url = "https://be-todolist-production.up.railway.app/todoList/user/login";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;
};
export const signInUser = async (payload)=>{
  const url="https://be-todolist-production.up.railway.app/todoList/user/register";
  const method = "POST";
  const response = await clientCall(url, method, payload);
  return response.data;

};
