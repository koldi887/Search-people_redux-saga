import React from 'react';
import classes from '../App.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {loadUsers, peopleSelector} from "../redux/reducers/people/peopleSlice";
import PreLoader from "../components/common/Preloader/Preloader";
import Paginator from "../components/common/Paginator/Paginator";
import {Link} from "react-router-dom";

export const PeopleTable = () => {
    const people = useAppSelector(peopleSelector)

    const dispatch = useAppDispatch()

    const onPageChanged = (page: number) => {
        dispatch(loadUsers({
            page,
            search: people.search
        }))
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loadUsers({
            page: people.page,
            search: e.target.value
        }))
    }

    return (
        <div className="App">
            <h1>
                Star Wars
            </h1>
            <input
                type="text"
                value={people.search}
                placeholder={'Search People'}
                onChange={search}
            />
            {people.loading ? (
                <PreLoader/>
            ) : (
                <>
                    <table
                        // @ts-ignore
                        border={1}
                        className={classes.tableWrapper}
                        cellPadding={2}
                        cellSpacing={0}>
                        <thead>
                        <tr className={classes.tableTitle}>
                            <th>Name</th>
                            <th>Birth_year</th>
                            <th>Eye_color</th>
                            <th>Gender</th>
                            <th>Hair_color</th>
                            <th>Height</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {// @ts-ignore
                            people.data.results.map((character) => {
                                const id = character.url.replaceAll(/\D/g, '')
                                return (
                                    <tr key={character.name}>
                                        <td>{character.name}</td>
                                        <td>{character.birth_year}</td>
                                        <td>{character.eye_color}</td>
                                        <td>{character.gender}</td>
                                        <td>{character.hair_color}</td>
                                        <td>{character.height}</td>
                                        <td>
                                            <Link
                                                to={`/people/${id}`}
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Paginator
                        onPageChanged={onPageChanged}
                        // @ts-ignore
                        totalItemsCount={people.data?.count}
                        currentPage={people.page}/>
                </>
            )}
        </div>
    );
};
