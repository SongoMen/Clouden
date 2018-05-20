import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from "./components/App";
import { store } from './helpers/store';
import { configureFakeBackend } from './helpers/backend';
configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById("root")
);