import {configureStore} from '@reduxjs/toolkit'
import projectReducer from './slice/ProjectSlice'
import taskReducer from './slice/TaskSlice'
const store = configureStore({
    reducer: {
      projects: projectReducer,
      tasks: taskReducer,
    },
  });
  
  export default store;