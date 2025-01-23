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
    return response.data;
  }
);
export const postProjectAsync = createAsyncThunk(
  "projects/postProject",
  async (newProject) => {
    const response = await postProject(newProject);
    return response.data;
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
    selectedProject: null,
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload || null;
    },
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
        state.projects = state.projects.map((project) => {
          if (project.project_id == action.payload.id) {
            return {
              ...project,
              name: action.payload.data.name || project.name,
              color: action.payload.data.color || project.color,
              is_favorite: action.payload.data.is_favorite === true ? 1 : 0,
            };
          }
          return project;
        });
      })

      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => {
          if (project.project_id != action.payload) {
            return project;
          }
        });
      });
  },
});
export const { setSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
