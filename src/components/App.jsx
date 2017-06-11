import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Footer from './Footer';
import Landing from '../containers/Landing';

const App = () => (
  <MuiThemeProvider>
    <div className="app-container">
      <Header />
      <div className="main-body">
        <Landing />
        <Footer />
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
