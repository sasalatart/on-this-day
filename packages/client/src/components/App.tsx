import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config';
import apolloClient from '../graphql/client';
import { paths } from '../routes';
import DateSelect from './DateSelect';
import Episodes from './Episodes';
import Layout from './Layout';

export default function App(): JSX.Element {
  return (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Router>
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Switch>
                <Route path={paths.episodes} component={Episodes} />
                <Route component={DateSelect} />
              </Switch>
            </Layout>
          </ApolloProvider>
        </Router>
      </ThemeProvider>
    </MUIThemeProvider>
  );
}
