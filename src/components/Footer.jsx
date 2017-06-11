import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const Footer = () => (
  <footer className="flex justify-space-around">
    <p>Sebastián Salata R-T</p>

    <p>2017</p>

    <p>
      <a href="https://github.com/sasalatart/on-this-day" target="_blank" rel="noopener noreferrer">
        <span className="icon">
          <FontIcon className="fa fa-github" />
        </span>
        <span>Project Repository</span>
      </a>
    </p>
  </footer>
);

export default Footer;
