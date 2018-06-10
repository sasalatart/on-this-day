import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const style = {
  maxHeight: '100%',
  maxWidth: '100%',
  height: 'auto',
  width: 800,
  minWidth: '50%',
  padding: 25,
  marginTop: 25,
  marginBottom: 50,
  overflowY: 'auto',
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
