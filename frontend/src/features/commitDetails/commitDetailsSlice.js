import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommitDetails } from "../../services/githubAPI";

export const fetchCommitDetails = createAsyncThunk(
    "commitDetails/fetchCommitDetails",
    async ({ owner, repo, sha },
        { rejectWithValue }) => {

        try {
            const response =
                await getCommitDetails(
                    owner, repo, sha
                );
            return response;

        } catch (err) {
            return rejectWithValue(
                err.message
            );
        }
    }
);

const commitDetailsSlice = createSlice({
    name: "commitDetails",
    initialState: {
        selectedCommit: null,
        loading: false,
        error: null
    },
    reducers: {
        clearCommitDetails: (state) => {
            state.selectedCommit = null;
        }
    }, extraReducers: (builder) => {

        builder
            .addCase(
                fetchCommitDetails.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                fetchCommitDetails.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.selectedCommit = action.payload;
                }
            )

            .addCase(
                fetchCommitDetails.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
})

export const { clearCommitDetails } = commitDetailsSlice.actions;
export default commitDetailsSlice.reducer;