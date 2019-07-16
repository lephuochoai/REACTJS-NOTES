import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux'
import { configStore } from './store/store'
// import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={configStore()}>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </Provider>,
  document.getElementById('root')
);
