import React, { useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, setUsername }) {
  const [newUsername, setNewUsername] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newUsername) return;

    setUsername(newUsername);
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h1>What's your name?</h1>
            <form className='modal-form' onSubmit={handleSubmit}>
              <input placeholder='Username...' onChange={e => setNewUsername(e.target.value)} />
              <button type='submit' disabled={!newUsername}>Confirm</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;