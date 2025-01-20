import {configureStore} from '@reduxjs/toolkit'
import projectReducer from './slice/ProjectSlice'
import taskReducer from './slice/TaskSlice' 
import userReducer from './slice/UserSlice'
const store = configureStore({
    reducer: {
      projects: projectReducer,
      tasks: taskReducer,
      user:userReducer,
    },
  });
  
  export default store;