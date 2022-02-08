import {apply, call, put, select, take, takeEvery, fork} from 'redux-saga/effects'
import {loadUsers, loadUsersSuccess, peopleSelector} from "../../reducers/people/peopleSlice";
import {LOCATION_CHANGE} from "redux-first-history";

function* loadPeopleDetails() {
    // @ts-ignore
    const request = yield call(fetch, `https://swapi.dev/api/people`)
    // @ts-ignore
    const data = yield apply(request, request.json)
    yield put(loadUsers(data.results))
}

// @ts-ignore
function* loadPeopleList({payload}) {
    const {page, search} = payload
    // @ts-ignore
    const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`)
    // @ts-ignore
    const data = yield apply(request, request.json)
    yield put(loadUsersSuccess(data))
}

export function* loadUsersOnRouteEnter() {
    while (true) {
        // @ts-ignore
        const action = yield take(LOCATION_CHANGE)
                console.log(action)
        if (action.payload.location.pathname === '/') {
            const {page, search} = yield select(peopleSelector)
            yield put(loadUsers({page,search}))
        }
    }
}

export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter)
    yield takeEvery(loadUsers, loadPeopleList)
}