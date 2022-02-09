import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../redux-store";

let initialState = {
    data: null,
    error: null,
    loading: false,
};

const userDetailsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserDetails: (state, action) => {
            state.loading = true
        },

        loadUserDetailsSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        },

        loadUserDetailsFailure: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    },
});


export const {
    loadUserDetails,
    loadUserDetailsSuccess,
    loadUserDetailsFailure
} = userDetailsSlice.actions;
export const peopleDetailsSelector = (state: RootState) => state.user;
export default userDetailsSlice.reducer;
