import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {sagaMiddleware, setupStore} from "./redux/redux-store";
import rootSaga from "./redux/sagas";
import {BrowserRouter} from "react-router-dom";

const store = setupStore()
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


