import React from 'react';
import ReactDOM from 'react-dom';
import 'react-vertical-timeline-component/style.min.css';
import registerServiceWorker from './registerServiceWorker';
import Router from './client/router';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Router />,
  document.getElementById('root'),
);

registerServiceWorker();
