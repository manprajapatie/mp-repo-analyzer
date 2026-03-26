import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrganization } from "../../services/githubAPI";


export const fetchOrg = createAsyncThunk(
    "org/fetchOrg",
    async (org, { rejectWithValue }) => {
        try {
            return await getOrganization(org);
        } catch (err) {
            return rejectWithValue
        }
    }
);

const orgSlice = createSlice({
    name: "org",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase((fetchOrg.pending, (state) => {
            state.loading = true;
        }))
        .addCase((fetchOrg.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }))
        .addCase((fetchOrg.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }));
    }
})

export default orgSlice.reducer