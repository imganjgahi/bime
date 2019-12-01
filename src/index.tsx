import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./store/configStore";

const initialState = {}
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
