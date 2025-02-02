import React from "react";
import ReactDOM from "react-dom";
import {createStore,combineReducers} from 'redux';
import all_reducers from './reducers/index.js';
import {Provider} from 'react-redux'

import "./index.css";
import App from "./App";

const store = createStore(all_reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA