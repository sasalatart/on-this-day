import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Header = () => (
  <AppBar
    title="On This Day"
    titleStyle={styles.title}
    showMenuIconButton={false}
    onTitleTouchTap={() => console.log('clicked')}
  />
);

export default Header;
