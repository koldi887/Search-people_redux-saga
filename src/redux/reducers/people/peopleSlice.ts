import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../redux-store";

let initialState = {
    page: 1,
    search: '',
    loading: false,
    error: null,
    data: null
};

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        loadUsers: (state, action) => {
            console.log(action)
            const {page, search} = action.payload
            return {
                ...state,
                loading: true,
                page,
                search,
            }
        },

        loadUsersSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        },

        loadUsersFailure: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    },
});


export const {loadUsers, loadUsersSuccess, loadUsersFailure} = peopleSlice.actions;
export const peopleSelector = (state: RootState) => state.people;
export default peopleSlice.reducer;
