import React from 'react';
import PropTypes from 'prop-types';

const NewWordButton = (props) => {
  if (props.display) {
    return (
      <button
        className="component-new-word-button btn btn-primary spacer-bottom"
        onClick={props.resetAction}
      >
        New word
      </button>
    );
  } else {
    return (
      <div className="component-new-word-button" />
    );
  }
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func,
};

export default NewWordButton;
