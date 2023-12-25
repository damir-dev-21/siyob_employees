import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import App from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import rootReducers from './redux/rootReducer'
import {thunk} from 'redux-thunk'
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
