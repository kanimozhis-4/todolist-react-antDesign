import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { logInUserAsync,sigInUserAsync } from "../slice/UserSlice";
export const UsersContext = createContext();
const UserContext = ({ children }) => {
  const dispatch = useDispatch();
  const logInUser = async (loginData) => {
    return dispatch(logInUserAsync(loginData));
  };
  const signInUser = async (siginData)=>{
    return dispatch(sigInUserAsync(siginData));
  }
  return (
    <UsersContext.Provider
      value={{
        logInUser,
        signInUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UserContext;
