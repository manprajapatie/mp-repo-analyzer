import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPullRequests } from "../../services/githubAPI";

export const fetchPulls = createAsyncThunk(
  "pulls/fetchPulls",
  async ({ owner, repo }, { rejectWithValue }) => {
    try {
      return await getPullRequests(owner, repo);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const pullSlice = createSlice({
  name: "pulls",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPulls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPulls.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPulls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pullSlice.reducer;