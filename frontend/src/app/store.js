import { configureStore } from '@reduxjs/toolkit'

import orgReducer from "../features/org/orgSlice"
import repoReducer from "../features/repos/repoSlice"
import teamReducer from "../features/teams/teamSlice"
import pullReducer from "../features/pulls/pullSlice"
import analyticsReducer from "../features/analytics/analyticsSlice"


export const store = configureStore({
    reducer: {
        org: orgReducer,
        repos: repoReducer,
        teams: teamReducer,
        pulls: pullReducer,
        analytics: analyticsReducer
    }
});