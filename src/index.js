import React from 'react';
import { render } from 'react-dom';
import './assets/styles/index.css';
import { App } from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

/*
* Render app wrapped with redux store
*/
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

/*
* Register service worker to cache assets
*/
registerServiceWorker();
