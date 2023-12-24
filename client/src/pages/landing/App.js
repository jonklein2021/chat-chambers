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

  function handleJoinRoom() {
    if (!roomCode) {
      setStatus('No room code provided');
      return;
    }

    if (encodeURI(roomCode) !== roomCode) {
      setStatus('Special symbols not allowed');
      return;
    }

    navigate('/room?id=' + roomCode);
  }

  return (
    <>
      {status === 'loading' && <Loading />}
      {status !== 'loading' && status && <Error message={status} onClose={() => setStatus(null)} />}
      <div className='app'>
        <div className='app-middle-container'>
          <div className='app-welcome-title'>Welcome!</div>
          <div className='app-join-container'>
            <input placeholder='Enter room code' onChange={e => setRoomCode(e.target.value)} />
            <button className='app-join-button' onClick={handleJoinRoom}>Join</button>
          </div>
          <p>Need some inspiration? Click <b className='app-gen-name' onClick={handleCreateRoom}>me!</b></p>
        </div>
      </div>
    </>
  );
}

export default App;