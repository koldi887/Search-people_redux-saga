import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux-store";
import {PeopleDetailsType} from "../../../types/apiResponseTypes";

type initialStateType = {
    data: null | PeopleDetailsType
    error: null | string
    loading: boolean
};

let initialState: initialStateType = {
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

        loadUserDetailsSuccess: (state, action: PayloadAction<PeopleDetailsType>) => {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        },

        loadUserDetailsFailure: (state, action: PayloadAction<string>) => {
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
export const detailsDataSelector = (state: RootState) => state.user.data;
export default userDetailsSlice.reducer;
