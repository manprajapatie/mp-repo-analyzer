import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
    name: "analytics",
    initialState: {
        prVelocity: 0,
        topDevelopers: [],
    },
    reducers: {
        calculateAnalytics: (state, action) => {
            const { pulls } = action.payload;
            const merged = pulls.filter((pr) => pr.merged_at);

            state.prVelocity = merged.length / 30; //Calculating for a Month, Will Change it after all logic work

            const devMap = {};

            pulls.forEach((pr) => {
                const user = pr.user.login;
                devMap[user] = (devMap[user] || 0) + 1;
            });

            state.topDevelopers = Object.entries(devMap)
                .map(([user, count]) => ({ user, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
        }
    }
})


export const { calculateAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;