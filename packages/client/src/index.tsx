import React from 'react';
import ReactDOM from 'react-dom';
import 'react-vertical-timeline-component/style.min.css';
import App from './components/App';
import { initializeIcons } from './config';
import * as serviceWorker from './serviceWorker';
import './i18n';

initializeIcons();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
