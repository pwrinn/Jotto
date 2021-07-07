import React from 'react';
import PropTypes from 'prop-types';

const Congrats = props => {
  if (props.success) {
    return (
      <div className="component-congrats alert alert-success">
        <span className="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return (
      <div className="component-congrats" />
    );
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;