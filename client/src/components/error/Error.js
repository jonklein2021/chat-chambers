import React, { useState } from 'react';
import './Error.css';

function Error({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return isVisible ? (
    <div className="error-message">
      <strong>Error: {message}</strong>
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
    </div>
  ) : null;
};

export default Error;