import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {peopleSelector} from "../redux/reducers/people/peopleSlice";

export const Blog = () => {

    const {data} = useAppSelector(peopleSelector)

    const dispatch = useAppDispatch()

    return (
        <div>
            <Link to={'/'}>Home</Link>
            {data?.results.map((item, index) => <div key={index}>{item.name}</div>)}
        </div>
    );
};

