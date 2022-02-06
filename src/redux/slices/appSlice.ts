import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux-store";

let initialState = {
    initialized: false,
    blog: [],
    planets: []
};


const appSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        initializedSuccess: (state) => {
            state.initialized = !state.initialized;
        },
        setBlogData: (state,action) => {
            state.blog = action.payload
        },
        addPlanets: (state,action) => {
        }
    },
});

export const { initializedSuccess, setBlogData, addPlanets } = appSlice.actions;
export const initialSelector = (state: RootState) => state.app;
export default appSlice.reducer;
