import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
// serviceWorker.unregister();

// import { createStore } from 'react'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
