import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {createReduxHistoryContext} from "redux-first-history";
import {createBrowserHistory} from "history";
import peopleSlice from "./reducers/people/peopleSlice";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({history: createBrowserHistory()});

export const rootReducer = combineReducers({
    people: peopleSlice,
    router: routerReducer
});

export let sagaMiddleware = createSagaMiddleware();

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(sagaMiddleware, routerMiddleware),
    });
};

export const history = createReduxHistory(setupStore());

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];