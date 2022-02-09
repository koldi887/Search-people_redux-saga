import axios from "axios";
import {PeopleDetailsType, PeopleListResponseType} from "../types/apiResponseTypes";

export const instance = axios.create({
    baseURL: 'https://swapi.dev/api/',
});

export type PeopleListArgsType = {
    page: number,
    search: string
}

export const peopleAPI = {
    peopleList({page, search}: PeopleListArgsType) {
        if (page > 1 && search.length) {
            page = 1
        }
        return instance
            .get<PeopleListResponseType>(`people?page=${page}&search=${search}`)
            .then((response) => response.data);
    },

    peopleDetails(id: number) {
        return instance
            .get<PeopleDetailsType>(`people/${id}`)
            .then((response) => response.data);
    },
};
