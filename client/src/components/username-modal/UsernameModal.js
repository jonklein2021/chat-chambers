// react
import React, { useState } from 'react';

// error component
import Error from '../error/Error';

// styles
import './UsernameModal.css';

function UsernameModal({ isOpen, onClose, socket, room, setUsername }) {
  const [newUsername, setNewUsername] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (newUsername.length > 12) {
      setError('Username must be of 12 characters or fewer');
      return;
    }

    if (newUsername !== encodeURI(newUsername)) {
      setError('Special characters and spaces not allowed')
      return;
    }

    // check if username is already in this room
    socket.emit('set-username', newUsername, room, response => {
      if (response) {
        setUsername(newUsername)
        setError(null);
        onClose(); // close modal
      } else {
        setError('Username already exists')
      }
    });
  }

  return (
    <>
      {isOpen && (
        <div className='username-modal-overlay'>
          {error && <Error message={error} onClose={() => setError(null)} />}
          <div className='username-modal-content'>
            <h1>What's your name?</h1>
            <form className='username-modal-form' onSubmit={handleSubmit}>
              <input placeholder='Username...' onChange={e => setNewUsername(e.target.value)} />
              <button type='submit' disabled={!newUsername}>Confirm</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernameModal;