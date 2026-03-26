import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeams } from "../../services/githubAPI";

export const fetchTeams = createAsyncThunk(
    "teams/fetchTeams",
    async (org, { rejectWithValue }) => {
        try {
            return await getTeams(org);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const teamSlice = createSlice({
    name: "teams",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default teamSlice.reducer;