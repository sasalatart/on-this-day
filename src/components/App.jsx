import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Footer from './Footer';

const App = () => (
  <MuiThemeProvider>
    <div className="app-container">
      <Header />
      <div className="main-body">
        <h1>Hello World!</h1>
        <Footer />
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
