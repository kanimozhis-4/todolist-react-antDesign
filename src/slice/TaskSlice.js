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
    return response;
  }
);
export const editTaskAsync = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }) => {
    const response = await editTask(id, updatedTask);
    return response;
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
        state.tasks = action.payload;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(closeTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
}); 
export default taskSlice.reducer;
