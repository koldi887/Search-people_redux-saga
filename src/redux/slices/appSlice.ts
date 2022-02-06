import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux-store";

let initialState = {
    initialized: false,
    people: [],
    planets: []
};


const appSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        initializedSuccess: (state) => {
            state.initialized = !state.initialized;
        },
        addPeople: (state,action) => {
            state.people = action.payload
        },
        addPlanets: (state,action) => {
            state.people = action.payload
        }
    },
});

export const { initializedSuccess, addPeople, addPlanets } = appSlice.actions;
export const initialSelector = (state: RootState) => state.app;
export default appSlice.reducer;
