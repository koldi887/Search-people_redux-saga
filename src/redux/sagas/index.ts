import {all, call,spawn} from "redux-saga/effects";
import loadBasicData from "./initialSagas";
import pageLoaderSaga from "./pageLoaderSaga";

export default function* rootSaga() {
const sagas = [loadBasicData, pageLoaderSaga]

    const retrySagas = sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break;
                } catch (e) {
                    console.log(e)
                }
            }
        })
    });

yield all(retrySagas)
}























// async function swapiGet(pattern:any) {
//     const request = await fetch(`https://swapi.dev/api/${pattern}`)
//     const data = await request.json()
//     return data.results
// }
//
// export function* loadPeople() {
// throw new Error()
//     // @ts-ignore
//     const people = yield call(swapiGet, 'people')
//     yield put(addPeople(people))
//     console.log('people')
//
// }
//
// export function* loadPlanets() {
//     // @ts-ignore
//     let planets = yield call(swapiGet, 'planets')
//     yield put(addPlanets(planets))
//     console.log('planets')
// }
//
// export function* workerSaga() {
//     console.log('start')
//     yield spawn(loadPeople)
//     yield spawn(loadPlanets)
//     console.log('finish')
// }
//
// export function* watchClickSaga() {
//     yield takeEvery(initializedSuccess,workerSaga)
// }
//
// export default function* rootSaga() {
//     yield watchClickSaga()
// }