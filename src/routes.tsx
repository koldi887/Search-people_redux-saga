import React from 'react';
import {Details} from "./pages/Details";
import {PeopleTable} from "./pages/PeopleTable";

export enum ROUTE {
    MAIN = '/',
    PEOPLE = 'people/:id',
}

export const MAIN_ROUTE = 'MAIN_ROUTE'
export const PEOPLE_DETAILS_ROUTE = 'PEOPLE_DETAILS_ROUTE'

export const routes = [
    {
        id: MAIN_ROUTE,
        path: ROUTE.MAIN,
        element: <PeopleTable/>,
    },
    {
        id: PEOPLE_DETAILS_ROUTE,
        path: ROUTE.PEOPLE,
        element: <Details/>,
    },
]

export const getRouteConfig = (id: string) => {
    const route = routes.find(r => r.id === id)
    if (route) {
        const {element, ...rest} = route;
        return rest
    }
    return null as unknown as string
}
