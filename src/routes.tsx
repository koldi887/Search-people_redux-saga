import React from "react";
import App from "./App";
import {Routes, Route} from "react-router-dom";
import {Details} from "./pages/Details";

export const MAIN_ROUTE = 'MAIN_ROUTE'
export const PEOPLE_DETAILS_ROUTE = 'PEOPLE_DETAILS_ROUTE'

export const routes = [
    {
        id: MAIN_ROUTE,
        path: '/',
        element: <App/>
    },
    {
        id: PEOPLE_DETAILS_ROUTE,
        path: '/people/:id',
        element: <Details/>
    }
]

export default function Routing()  {
    return (
        <Routes>
            {routes.map(r =>{
                const {id, ...props} = r
                return (
                    <Route key={id} {...props}/>
                )
            })}
        </Routes>
    );
};

