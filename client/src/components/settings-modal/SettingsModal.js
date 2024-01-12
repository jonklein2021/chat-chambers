// react
import React, { useState } from 'react';

// components
import Error from '../error/Error';

// styles
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose, font, setFont, fontStyles, fontSize, setFontSize, fontSizeStyles }) {
  const [error, setError] = useState(null);

  return (
    <>
      {isOpen && (
        <div className='settings-modal-overlay' onClick={e => {
          if (e.target.className === 'settings-modal-overlay') onClose();
        }}>
          {error && <Error message={error} onClose={() => setError(null)} />}
          <div className='settings-modal-content'>
            <div>
              <label htmlFor='fontPicker'>Message Font: </label>
              <select
                id='fontPicker'
                style={fontStyles}
                className='settings-modal-font-picker'
                value={font}
                onChange={e => setFont(e.target.value)}
              >
                <option style={{ fontFamily: 'Nunito' }} value='Nunito'>Nunito</option>
                <option style={{ fontFamily: 'Courier New' }} value='Courier New'>Courier New</option>
                <option style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} value='Comic Sans'>Comic Sans</option>
                <option style={{ fontFamily: 'Papyrus' }} value='Papyrus'>Papyrus</option>
              </select>
            </div>
            <div>
              <label htmlFor='fontSizePicker'>Font Size: </label>
              <select
                id='fontSizePicker'
                className='settings-modal-font-size-picker'
                value={fontSize}
                onChange={e => setFontSize(e.target.value)}
              >
                <option style={{ fontSize: '12pt' }} value='12pt'>12pt</option>
                <option style={{ fontSize: '18pt' }} value='18pt'>18pt</option>
                <option style={{ fontSize: '24pt' }} value='24pt'>24pt</option>
                <option style={{ fontSize: '28pt' }} value='28pt'>28pt</option>
                <option style={{ fontSize: '36pt' }} value='36pt'>36pt</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;