import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {peopleDetailsSelector} from "../redux/reducers/peopleDetails/userDetailsSlice";
import PreLoader from "../components/common/Preloader/Preloader";

export const Details: React.FC = () => {
    const state = useAppSelector(peopleDetailsSelector)

    if (state.loading) return <PreLoader/>
    if (state.error) return <h1>{state.error}</h1>

    return (

        <div>
            <h1>{state.data?.name}</h1>
            <h4>{state.data?.birth_year}</h4>
            <p>{state.data?.gender}</p>
            <p>{state.data?.homeworld}</p>
        </div>
    );
};

