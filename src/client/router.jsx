import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Landing from './containers/Landing';
import Episodes from './components/Episodes';
import Layout from './components/Layout';

const AppRouter = () => (
  <Router history={createBrowserHistory()}>
    <Layout>
      <Route exact path="/" component={Landing} />
      <Route exact path="/episodes?day=(\d+)&month=(\d+)" component={Episodes} />
      <Route path="/episodes" component={Landing} />
    </Layout>
  </Router>
);

export default AppRouter;
