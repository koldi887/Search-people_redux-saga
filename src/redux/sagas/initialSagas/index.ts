import {all, call, delay, fork} from "redux-saga/effects";

function* auth() {
    yield delay(2000);
    console.log('auth ok')
    return true
}

function* loadUsers() {
    // @ts-ignore
    const request = yield call(fetch,`https://swapi.dev/api/people`)

    // @ts-ignore
    const data = yield call([request, request.json])

    console.log('data', data)
}

export default function* loadBasicData() {
    yield all([
        fork(auth),
        fork(loadUsers)
    ]);
}