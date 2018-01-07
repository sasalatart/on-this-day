import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';

const Layout = ({ children }) => (
  <MuiThemeProvider>
    <div className="app-container">
      <Header />
      { children }
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;
