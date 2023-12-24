import React, { useState } from 'react';
import './Error.css';

function Error({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="error-message">
      <strong>Error: {message}</strong>
      <button className="close-button" onClick={handleClose}>&times;</button>
    </div>
  )
};

export default Error;