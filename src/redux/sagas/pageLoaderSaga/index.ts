import {call, apply, take, fork} from 'redux-saga/effects'
import {LOCATION_CHANGE} from "redux-first-history";

function* loadBlogData() {
    console.log('dima')
    // @ts-ignore
    const request = yield call(fetch, `https://swapi.dev/api/vehicles`)
    // @ts-ignore
    const data = yield apply(request, request.json)
    console.log('blog data', data)
}

export default function* pageLoaderSaga() {
    while (true) {
        // @ts-ignore
        const action = yield take(LOCATION_CHANGE)
        const path = action.payload.location.pathname

        if (path.endsWith('blog')) {
            yield fork(loadBlogData)
        }
    }
}