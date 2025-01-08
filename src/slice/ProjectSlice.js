import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProjects,
  postProject,
  updateProject,
  deleteProject,
} from "../service/ProjectService";

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetchProjects();
    return response;
  }
);
export const postProjectAsync = createAsyncThunk(
  "projects/postProject",
  async (newProject) => {
    const response = await postProject(newProject);
    return response;
  }
);
export const updateProjectAsync = createAsyncThunk(
  "projects/updateProject",
  async ({ id, newProject }) => {
    const response = await updateProject(id, newProject);

    return response;
  }
);
export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    await deleteProject(projectId);
    return projectId;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(postProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index >= 0) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      });
  },
});
export default projectSlice.reducer;
