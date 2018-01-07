import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import Router from './client/router';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './client/styles/index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Router />,
  document.getElementById('root'),
);

registerServiceWorker();
