import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './bootstrap_current_theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import  store  from './store/index'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
           <App />
        </BrowserRouter>
    </Provider>,
  rootElement);

registerServiceWorker();
