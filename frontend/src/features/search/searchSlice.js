import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "", //org Name
    selectedRepos: [], //IDs of repos the user wants to analyze
    dateRange: "30d",     // "7d", "30d", "90d"
    filters: {
        excludeBots: true, // Will remove unncessory data
        minContributions: 1,
    },
    isSearchActive: false, // Helps UI know if we are looking at search results or a landing page
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        // Updates the organization name
        setSearchQuery: (state, action) => {
            state.query = action.payload;
            state.isSearchActive = true;
        },

        // Handles multi-select for repositories
        toggleRepoSelection: (state, action) => {
            const repoName = action.payload;
            if (state.selectedRepos.includes(repoName)) {
                state.selectedRepos = state.selectedRepos.filter(r => r !== repoName)
            }
            else {
                state.selectedRepos.push(repoName)
            }
        },
        // Updates filters (exclude bots, date range)
        updateFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },

        // Reset everything when user want
        resetSearch: () => initialState, // it will remove everything and make object clear
    }
})

export const {setSearchQuery, toggleRepoSelection, updateFilters, resetSearch} = searchSlice.actions;
export default searchSlice.reducer