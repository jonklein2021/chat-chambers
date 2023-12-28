import React, { useEffect, useState } from 'react';
import './Toggle.css';

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  function handleToggle() {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (isOn) {
      document.querySelector('body').classList.add('papyrus-mode');
    } else {
      document.querySelector('body').classList.remove('papyrus-mode');
    }
  }, [isOn]);

  return (
    <div className={`toggle-container ${isOn ? 'on' : ''}`} onClick={handleToggle}>
      <div className='toggle-slider' />
    </div>
  );
};

export default Toggle;
