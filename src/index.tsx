import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HistoryRouter as Router} from "redux-first-history/rr6";
import {Provider} from "react-redux";
import {history, sagaMiddleware, setupStore} from "./redux/redux-store";
import rootSaga from "./redux/sagas";

const store = setupStore()
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);


