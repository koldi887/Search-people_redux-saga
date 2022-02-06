import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {setBlogData} from "../redux/slices/appSlice";

export const Blog = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setBlogData([]))
    }, [])

    return (
        <div>
            BLOG
        </div>
    );
};

