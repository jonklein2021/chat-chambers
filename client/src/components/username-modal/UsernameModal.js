// react
import React, { useRef, useState } from 'react';

// components
import Loading from '../loading/Loading';
import Error from '../error/Error';

// styles
import './UsernameModal.css';

function UsernameModal({ isOpen, onClose, socket, room, setUsername }) {
  const [status, setStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputRef = useRef(null);

  async function handleCreateName() {
    setStatus('loading');

    const res = await fetch('https://random-word-api.herokuapp.com/word?number=2&length=4');
    const data = await res.json();

    inputRef.current.value = data.join('_'); // update input field
    
    setButtonDisabled(false);
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const username = inputRef.current.value;
    
    if (username.length > 12) {
      setStatus('Username must be of 12 characters or fewer');
      return;
    }

    if (username !== encodeURI(username)) {
      setStatus('Special characters and spaces not allowed')
      return;
    }

    // check if username is already in this room
    socket.emit('set-username', username, room, response => {
      if (response) {
        setUsername(username)
        setStatus(null);
        onClose(); // close modal
      } else {
        setStatus('Username already exists')
      }
    });
  }

  return (
    <>
      {isOpen && (
        <div className='username-modal-overlay'>
          {status === 'loading' && <Loading />}
          {status !== 'loading' && status && <Error message={status} onClose={() => setStatus(null)} />}
          <div className='username-modal-content'>
            <h1>What's your name?</h1>
            <form className='username-modal-form' onSubmit={handleSubmit}>
              <input placeholder='Username...' ref={inputRef} onChange={e => setButtonDisabled(!e.target.value)} />
              <button type='submit' disabled={buttonDisabled}>Confirm</button>
            </form>
            <p>Need some inspiration? Click <b className='gen-name' onClick={handleCreateName}>me!</b></p>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernameModal;