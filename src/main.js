import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

import App from './components/app';
import reducers from './reducers/';
import './styles/main.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(
  <Provider store = {createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container-fluid')
);
