// react
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

// styles
import './App.css';
import Footer from '../../components/footer/Footer';

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [status, setStatus] = useState(null);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  function handleJoinRoom(e) {
    e.preventDefault();

    if (!roomCode) {
      setStatus('No room code provided');
      return;
    }

    if (roomCode.length > 25) {
      setStatus('Room code must be of 25 characters or fewer');
      return;
    }

    if (encodeURI(roomCode) !== roomCode) {
      setStatus('Special characters and spaces not allowed');
      return;
    }

    navigate('/rooms/' + roomCode);
  }

  return (
    <div className='app'>
      {status === 'loading' && <Loading />}
      {status !== 'loading' && status && <Error message={status} onClose={() => setStatus(null)} />}
      <div className='app-middle-container'>
        <div className='app-welcome-title'>Welcome!</div>
        <form className='app-join-container' onSubmit={handleJoinRoom}>
          <input placeholder='Enter room code' ref={inputRef} onChange={e => setRoomCode(e.target.value)} />
          <button type='submit' disabled={!roomCode} className='app-join-button'>Join</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default App;