import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  async function handleCreateRoom() {
    setLoading(true);

    const res = await fetch('https://random-word-api.herokuapp.com/word?number=5&length=4');
    const data = await res.json();

    document.querySelector('.app-join-container').firstChild.value = data.join('-');
    setRoomCode(data.join('-'));
    
    setLoading(false);
  }

  function handleJoinRoom() {
    if (roomCode) {
      navigate('/room?id=' + roomCode);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className='app'>
        <div className='app-middle-container'>
          <div className='app-welcome-title'>Welcome!</div>
          <button onClick={handleCreateRoom}>Create a new room</button>
          <div className='app-join-container'>
            <input placeholder='Enter room code' onChange={e => setRoomCode(e.target.value)} />
            <button className='app-join-button' onClick={handleJoinRoom}>Join</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;