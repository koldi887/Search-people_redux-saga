import {call, fork, put, select, StrictEffect, take, takeEvery} from 'redux-saga/effects'
import {loadUsers, loadUsersFailure, loadUsersSuccess, peopleSelector} from "../../reducers/people/peopleSlice";
import {LOCATION_CHANGE} from "redux-first-history";
import {matchPath} from "react-router-dom";
import {getRouteConfig, PEOPLE_DETAILS_ROUTE, ROUTE} from "../../../routes";
import {
    loadUserDetails,
    loadUserDetailsFailure,
    loadUserDetailsSuccess
} from "../../reducers/peopleDetails/userDetailsSlice";
import {peopleAPI} from "../../../api/peopleApi";
import {PeopleDetailsType, PeopleListResponseType} from "../../../types/apiResponseTypes";
import {AnyAction as ReduxAction} from "redux";

export type LoadUsersPayloadType = {
    payload: {
        page: number,
        search: string,
    }
}

export type LoadPeopleDetailsPayloadType = {
    payload: {
        id: number,
    }
}

function* loadPeopleDetails({payload}: LoadPeopleDetailsPayloadType):
    Generator<StrictEffect, any, PeopleDetailsType> {
    const {id} = payload
    try {
        const data = yield call(peopleAPI.peopleDetails, id)
        yield put(loadUserDetailsSuccess(data))
    } catch (e) {
        yield put(loadUserDetailsFailure('Something went wrong'))
    }
}

function* loadPeopleList({payload}: LoadUsersPayloadType):
    Generator<StrictEffect, any, PeopleListResponseType> {
    const {page, search} = payload

    try {
        const data = yield call(
            peopleAPI.peopleList,
            {page, search}
        )
        yield put(loadUsersSuccess(data))

    } catch (e) {
        yield put(loadUsersFailure('Something went wrong'))
    }
}

export function* loadUsersOnRouteEnter() {
    while (true) {
        const action: ReduxAction = yield take(LOCATION_CHANGE)
        const actionPath: string = action.payload.location.pathname

        if (actionPath === ROUTE.MAIN) {
            const {page, search}: ReturnType<typeof peopleSelector> = yield select(peopleSelector)
            yield put(loadUsers({page, search}))
        }

        const detailsPage: ReturnType<typeof matchPath> = matchPath(
            getRouteConfig(PEOPLE_DETAILS_ROUTE),
            actionPath
        )

        if (detailsPage) {
            const {id} = detailsPage.params
            yield put(loadUserDetails({id}))
        }
    }
}

export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter)
    yield takeEvery(loadUsers, loadPeopleList)
    yield takeEvery(loadUserDetails, loadPeopleDetails)
}