import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLanguages, getContributors } from "../../services/githubAPI";


export const getSingleRepoDetails = createAsyncThunk(
    "github/getSingleRepoDetails",
    async ({ owner, repo }) => {
        const [languages, contributors] = await Promise.all([
            getLanguages(owner, repo),
            getContributors(owner, repo),
        ]);

        return { languages, contributors };
    }
);
const singleRepoDetailsSlice = createSlice({
    name: "repoDetails",
    initialState: {
        repoDetails: null,
        contributors: [],
        commits: [],
        languages: {},
        repoContributors: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSingleRepoDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleRepoDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload.languages;
                state.repoContributors = action.payload.contributors;
            })
            .addCase(getSingleRepoDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default singleRepoDetailsSlice.reducer