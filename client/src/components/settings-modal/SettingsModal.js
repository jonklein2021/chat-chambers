// react
import React, { useState } from 'react';

// components
import Error from '../error/Error';
import Toggle from '../toggle/Toggle';

// styles
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose }) {
  const [error, setError] = useState(null);

  return (
    <>
      {isOpen && (
        <div className='settings-modal-overlay' onClick={e => {
          if (e.target.className === 'settings-modal-overlay') onClose();
        }}>
          {error && <Error message={error} onClose={() => setError(null)} />}
          <div className='settings-modal-content'>
            <div className='settings-modal-papyrus-container'>
              Papyrus mode
              <Toggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;