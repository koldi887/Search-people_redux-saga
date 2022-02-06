import {call, apply,takeEvery} from 'redux-saga/effects'
import {setBlogData} from "../../slices/appSlice";

function* loadBlogData() {
    // @ts-ignore
    const request = yield call(fetch, `https://swapi.dev/api/vehicles`)
    // @ts-ignore
    const data = yield apply(request, request.json)
    console.log('blog data', data)
}
export default function* pageLoaderSaga() {
yield takeEvery(setBlogData, loadBlogData)
}