import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import theme from '../../theme';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Header = () => (
  <Link to="/" style={theme.anchor}>
    <AppBar
      title="On This Day"
      titleStyle={styles.title}
      showMenuIconButton={false}
    />
  </Link>
);

export default Header;
