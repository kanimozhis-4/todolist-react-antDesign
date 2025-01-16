import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTask,
  editTask,
  deleteTask,
  closeTask,
} from "../service/TaskService";
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await fetchTask();
    return response;
  }
);
export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (newTask) => {
    const response = await createTask(newTask);
    return response.data;
  }
);
export const editTaskAsync = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }) => {
    const response = await editTask(id, updatedTask);
    return response.data;
  }
);
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await deleteTask(taskId);
    return taskId;
  }
);
export const closeTaskAsync = createAsyncThunk(
  "tasks/closeTask",
  async (taskId) => {
    await closeTask(taskId);
    return taskId;
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        const modifiedPayload = {
          ...action.payload,
          task_id: action.payload.id,  
        };
        
        delete modifiedPayload.id;
      
        state.tasks.push(modifiedPayload);
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => {
          if (task.task_id ==action.payload.data.task_id) {
            return { ...action.payload.data}
          }
          return task;
        });
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => { 
            if(task.task_id != action.payload){
            return task
          }  
        }
        );
      })
      .addCase(closeTaskAsync.fulfilled, (state, action) => {
       
        state.tasks = state.tasks.filter(
          (task) => { 
            if(task.task_id != action.payload){
            return task
          }  
        }
        );
      });
  },
}); 
export default taskSlice.reducer;
