import { configureStore } from '@reduxjs/toolkit'

import orgReducer from "../features/org/orgSlice"
import repoReducer from "../features/repos/repoSlice"
import singleRepoDetailsReducer from "../features/repos/singleRepoDetailsSlice"
//import teamReducer from "../features/teams/teamSlice"
import pullReducer from "../features/pulls/pullSlice"
import analyticsReducer from "../features/analytics/analyticsSlice"
import userDetailsReducer from '../features/userdetails/userdetailsSlice'
import commitDetailsReducer from '../features/commitDetails/commitDetailsSlice'

import searchReducer from "../features/search/searchSlice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storagePer from 'redux-persist/lib/storage'; // defaults to localStorage

const createSafeStorage = () => {
    try {
        // Try to import the default localStorage engine
        const storageModule = storagePer;
        const storage = storageModule.default || storageModule;

        // Verify it has the required methods
        if (storage && typeof storage.getItem === 'function') {
            return storage;
        }
    } catch (e) {
        console.warn('Could not load redux-persist storage, using fallback');
    }

    // Fallback: create a noop storage that uses localStorage directly
    return {
        getItem: (key) => {
            try {
                const item = window.localStorage.getItem(key);
                return Promise.resolve(item);
            } catch (err) {
                return Promise.resolve(null);
            }
        },
        setItem: (key, value) => {
            try {
                window.localStorage.setItem(key, value);
                return Promise.resolve(value);
            } catch (err) {
                return Promise.reject(err);
            }
        },
        removeItem: (key) => {
            try {
                window.localStorage.removeItem(key);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        },
    };
};
const storage = createSafeStorage();

// Persist config for search slice ONLY
const searchPersistConfig = {
    key: 'search',
    storage,
    // Only persist these fields (optional - remove to persist entire slice)
    whitelist: ['query', 'filters'],
};

// Wrap only the search reducer with persistReducer
const persistedSearchReducer = persistReducer(searchPersistConfig, searchReducer);



export const store = configureStore({
    reducer: {
        org: orgReducer,
        repos: repoReducer,
        //single repo detail
        repoDetails: singleRepoDetailsReducer,
        userDetails: userDetailsReducer,
        //Commit Details
        commitDetails: commitDetailsReducer,
        //teams: teamReducer,
        pulls: pullReducer,
        analytics: analyticsReducer,

        // Use persisted reducer for search
        search: persistedSearchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist action types to avoid warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);