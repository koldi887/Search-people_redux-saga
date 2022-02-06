import {take, takeEvery, takeLatest, takeLeading, put, call, fork, spawn} from 'redux-saga/effects'
import {addPeople, addPlanets, initializedSuccess} from "../slices/appSlice";
import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

async function swapiGet(pattern:any) {
    const request = await fetch(`https://swapi.dev/api/${pattern}`)
    const data = await request.json()
    return data.results
}

export function* loadPeople() {
throw new Error()
    // @ts-ignore
    const people = yield call(swapiGet, 'people')
    yield put(addPeople(people))
    console.log('people')

}

export function* loadPlanets() {
    // @ts-ignore
    let planets = yield call(swapiGet, 'planets')
    yield put(addPlanets(planets))
    console.log('planets')
}

export function* workerSaga() {
    console.log('start')
    yield spawn(loadPeople)
    yield spawn(loadPlanets)
    console.log('finish')
}

export function* watchClickSaga() {
    yield takeEvery(initializedSuccess,workerSaga)
}

export default function* rootSaga() {
    yield watchClickSaga()
}