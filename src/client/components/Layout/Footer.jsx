import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import theme from '../../theme';

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    color: '#ffffff',
    height: '48px',
    padding: '5px 0',
  },
  repositoryWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  repositoryText: {
    marginLeft: '5px',
  },
};

const Footer = () => (
  <footer style={styles.footer}>
    <p>Sebastián Salata R-T</p>

    <p>2017</p>

    <p>
      <a
        href="https://github.com/sasalatart/on-this-day"
        style={{ ...theme.anchor, ...styles.repositoryWrapper }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon">
          <FontIcon className="fa fa-github" />
        </span>
        <span style={styles.repositoryText}>Project Repository</span>
      </a>
    </p>
  </footer>
);

export default Footer;
