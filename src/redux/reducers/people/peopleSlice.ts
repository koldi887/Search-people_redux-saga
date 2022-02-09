import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux-store";
import {PeopleListResponseType} from "../../../types/apiResponseTypes";

type InitialStateType = {
    page: number,
    search: string,
    loading: boolean,
    error: null | string,
    data: null | PeopleListResponseType
}

let initialState: InitialStateType = {
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

        loadUsers: (state, action: PayloadAction<{ page: number, search: string }>) => {
            const {page, search} = action.payload
            return {
                ...state,
                loading: true,
                page,
                search,
            }
        },

        loadUsersSuccess: (state, action: PayloadAction<PeopleListResponseType>) => {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        },

        loadUsersFailure: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    },
});

export const {
    loadUsers,
    loadUsersSuccess,
    loadUsersFailure
} = peopleSlice.actions;
export const peopleSelector = (state: RootState) => state.people;
export default peopleSlice.reducer;
