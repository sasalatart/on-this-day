import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Header = () => (
  <Link to="/">
    <AppBar
      title="On This Day"
      titleStyle={styles.title}
      showMenuIconButton={false}
    />
  </Link>
);

export default Header;
