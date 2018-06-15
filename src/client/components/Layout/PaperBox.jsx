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

function PaperBox({ children }) {
  return (
    <Paper style={style} zDepth={5} >
      {children}
    </Paper>
  );
}

PaperBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default PaperBox;
