import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config';
import { apolloClient } from '../graphql/client';
import { paths } from '../routes';
import { Layout } from './app-layout';
import { DateSelect } from './date-select';
import { YearDateEpisodes } from './year-date';

export function Root(): JSX.Element {
  return (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Router>
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Switch>
                <Route path={paths.yearDate} component={YearDateEpisodes} />
                <Route component={DateSelect} />
              </Switch>
            </Layout>
          </ApolloProvider>
        </Router>
      </ThemeProvider>
    </MUIThemeProvider>
  );
}
