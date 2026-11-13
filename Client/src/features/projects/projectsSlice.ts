import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Project, CreateProjectData } from "../../types/project.types";
import type { RootState } from "../../store/store";
import {
  getProjects as getProjectsApi,
  createProject as createProjectApi,
} from "../../api/projects.api";

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { state: RootState; rejectValue: string }
>("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    return await getProjectsApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch projects",
    );
  }
});

export const addProject = createAsyncThunk<
  Project,
  CreateProjectData,
  { state: RootState; rejectValue: string }
>("projects/addProject", async (data, { rejectWithValue }) => {
  try {
    return await createProjectApi(data);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to create project",
    );
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch projects";
      })

      // Create project
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to create project";
      });
  },
});

export default projectsSlice.reducer;
