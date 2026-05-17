import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../../services/githubAPI";


export const fetchUserDetails = createAsyncThunk(
    "getUserDetails/getSingleRepoDetails",
    async ({ owner, repo, username }, { rejectWithValue }) => {
        try {
            const response = await getUserDetails(owner, repo, username);
            return response; // Adjust based on your API response
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch user details");
        }
    }
);

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        data: null,
        loading: false,
        error: null,
        currentUser: null // this will load current user
    },
    reducers: {
        clearUserDetails: (state) => {
            state.data = null;
            state.error = null;
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.currentUser = action.meta.arg.username;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;