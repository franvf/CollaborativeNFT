import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-react';

import {createRoot} from 'react-dom/client'
const container = document.getElementById('root')

const root = createRoot(container)
root.render(<App tab='home' />)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();