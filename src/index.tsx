import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {sagaMiddleware, setupStore} from "./redux/redux-store";
import rootSaga from "./redux/sagas";

const store = setupStore()
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


