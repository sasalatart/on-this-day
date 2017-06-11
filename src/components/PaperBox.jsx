import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const style = {
  maxHeight: '100%',
  maxWidth: '100%',
  height: 480,
  width: 800,
  minHeight: '50%',
  minWidth: '50%',
  padding: 50,
  overflow: 'auto',
};

const PaperBox = props => (
  <Paper style={style} zDepth={5} >
    { props.children }
  </Paper>
);

PaperBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PaperBox;
