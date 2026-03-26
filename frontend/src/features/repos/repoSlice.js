import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRepositories } from "../../services/githubAPI";

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async (org, { rejectWithValue }) => {
    try {
      return await getRepositories(org);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const repoSlice = createSlice({
  name: "repos",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default repoSlice.reducer;