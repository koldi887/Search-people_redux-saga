import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {peopleDetailsSelector} from "../redux/reducers/peopleDetails/userDetailsSlice";
import PreLoader from "../components/common/Preloader/Preloader";

export const Details = () => {
    const details = useAppSelector(peopleDetailsSelector)

    if (details.loading) return <PreLoader/>
    if (details.error) return <h1>{details.error}</h1>
    // @ts-ignore
    const {name, birth_year, skin_color, mass} = details.data
    return (
        <div>
            <h1>{name}</h1>
            <h4>{birth_year}</h4>
            <p>{skin_color}</p>
            <p>{mass}</p>
        </div>
    );
};

