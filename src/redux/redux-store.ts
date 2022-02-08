import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {createReduxHistoryContext} from "redux-first-history";
import {createBrowserHistory} from "history";
import peopleSlice from "./reducers/people/peopleSlice";
import rootSaga from "./sagas";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext(
    {history: createBrowserHistory()});

export const rootReducer = combineReducers({
    people: peopleSlice,
    router: routerReducer
});

export let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(sagaMiddleware, routerMiddleware),
})

sagaMiddleware.run(rootSaga)

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch'];

export default store