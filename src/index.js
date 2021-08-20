import store from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
