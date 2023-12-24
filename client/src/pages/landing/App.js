import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  async function handleCreateRoom() {
    setStatus('loading');

    const res = await fetch('https://random-word-api.herokuapp.com/word?number=5&length=4');
    const data = await res.json();

    document.querySelector('.app-join-container').firstChild.value = data.join('-');
    setRoomCode(data.join('-'));

    setStatus(null);
  }

  function handleJoinRoom(e) {
    e.preventDefault();

    if (!roomCode) {
      setStatus('No room code provided');
      return;
    }

    if (roomCode.length > 25) {
      setStatus('Code must be 25 characters long or fewer');
      return;
    }

    if (encodeURI(roomCode) !== roomCode) {
      setStatus('Special symbols not allowed');
      return;
    }

    navigate('/room?id=' + roomCode);
  }

  return (
    <div className='app'>
      {status === 'loading' && <Loading />}
      {status !== 'loading' && status && <Error message={status} onClose={() => setStatus(null)} />}
      <div className='app-middle-container'>
        <div className='app-welcome-title'>Welcome!</div>
        <form className='app-join-container' onSubmit={handleJoinRoom}>
          <input placeholder='Enter room code' onChange={e => setRoomCode(e.target.value)} />
          <button type='submit' disabled={!roomCode} className='app-join-button'>Join</button>
        </form>
        <p>Need some inspiration? Click <b className='app-gen-name' onClick={handleCreateRoom}>me!</b></p>
      </div>
    </div>
  );
}

export default App;