import React, { useEffect, useState } from 'react';
import './Toggle.css';

function Toggle({ state, setState }) {
  const [isOn, setIsOn] = useState(state);

  function handleToggle() {
    setState(!isOn);
    setIsOn(!isOn);
  };

  return (
    <div className={`toggle-container ${isOn ? 'on' : ''}`} onClick={handleToggle}>
      <div className='toggle-slider' />
    </div>
  );
};

export default Toggle;
