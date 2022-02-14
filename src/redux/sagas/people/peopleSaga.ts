import {
    call,
    fork,
    put,
    SagaReturnType,
    select,
    take,
    takeEvery
} from 'redux-saga/effects'
import {
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    peopleSelector
} from "../../reducers/people/peopleSlice";
import {LOCATION_CHANGE} from "redux-first-history";
import {matchPath} from "react-router-dom";
import {getRouteConfig, PEOPLE_DETAILS_ROUTE, ROUTE} from "../../../routes";
import {
    loadUserDetails,
    loadUserDetailsFailure,
    loadUserDetailsSuccess
} from "../../reducers/peopleDetails/userDetailsSlice";
import {peopleAPI} from "../../../api/peopleApi";
import {AnyAction as ReduxAction} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";

type PeopleDetailsApiType = SagaReturnType<typeof peopleAPI.peopleDetails>
type PeopleListApiType = SagaReturnType<typeof peopleAPI.peopleList>
type PeopleSelectorType = SagaReturnType<typeof peopleSelector>
type MatchPathType = ReturnType<typeof matchPath>

export type LoadPeopleType = {
    page: number,
    search: string,
}

function* loadPeopleDetails({payload}: PayloadAction<{ id: number }>) {
    const {id} = payload
    try {
        const data: PeopleDetailsApiType = yield call(peopleAPI.peopleDetails, id)
        yield put(loadUserDetailsSuccess(data))
    } catch (e) {
        yield put(loadUserDetailsFailure('Something went wrong'))
    }
}

function* loadPeopleList({payload}: PayloadAction<LoadPeopleType>) {
    const {page, search} = payload
    try {
        const data: PeopleListApiType = yield call(
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
            const {
                page,
                search
            }: PeopleSelectorType = yield select(peopleSelector)
            yield put(loadUsers({page, search}))
        }

        const detailsPage: MatchPathType = matchPath(
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