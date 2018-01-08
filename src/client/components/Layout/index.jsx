import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';

const styles = {
  appContainer: {
    height: 'calc(100vh - 64px)',
  },
};

const Layout = ({ children }) => (
  <MuiThemeProvider>
    <div style={styles.appContainer}>
      <Header />
      {children}
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;
