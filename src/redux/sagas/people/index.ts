import {apply, call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import {loadUsers, loadUsersFailure, loadUsersSuccess, peopleSelector} from "../../reducers/people/peopleSlice";
import {LOCATION_CHANGE} from "redux-first-history";
import {matchPath} from "react-router-dom";
import {getRouteConfig, PEOPLE_DETAILS_ROUTE, ROUTE} from "../../../routes";
import {
    loadUserDetails,
    loadUserDetailsFailure,
    loadUserDetailsSuccess
} from "../../reducers/peopleDetails/userDetailsSlice";

// @ts-ignore
function* loadPeopleDetails({payload}) {
    const {id} = payload
    try {
        // @ts-ignore
        const request = yield call(fetch, `https://swapi.dev/api/people/${id}`)
        // @ts-ignore
        const data = yield apply(request, request.json)
        yield put(loadUserDetailsSuccess(data))
    } catch (e) {
        yield put(loadUserDetailsFailure('Something went wrong'))
    }

}

// @ts-ignore
function* loadPeopleList({payload}) {
    const {page, search} = payload
    try {
        // @ts-ignore
        const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`)
        // @ts-ignore
        const data = yield apply(request, request.json)
        yield put(loadUsersSuccess(data))
    } catch (e) {
        yield put(loadUsersFailure(e))
    }
}

export function* loadUsersOnRouteEnter() {
    while (true) {
        // @ts-ignore
        const action = yield take(LOCATION_CHANGE)
        // @ts-ignore
        if (action.payload.location.pathname === ROUTE.MAIN) {
            const {page, search} = yield select(peopleSelector)
            yield put(loadUsers({page, search}))
        }

        // @ts-ignore
        const detailsPage = matchPath(getRouteConfig(PEOPLE_DETAILS_ROUTE), action.payload.location.pathname)

        if (detailsPage) {
            const {id} = detailsPage.params
            // @ts-ignore
            yield put(loadUserDetails({id}))
        }
    }
}

export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter)
    yield takeEvery(loadUsers, loadPeopleList)
    yield takeEvery(loadUserDetails, loadPeopleDetails)
}