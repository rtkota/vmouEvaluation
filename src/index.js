import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import authReducer from './store/reducers/Auth';
import batchReducer from './store/reducers/batch';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:authReducer,
    batch:batchReducer
});

const store = createStore(rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk)
    ));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();