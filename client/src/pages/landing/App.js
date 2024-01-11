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
  const [showHelp, setShowHelp] = useState(false);
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
        <svg
          className='app-help-icon'
          onClick={() => setShowHelp(!showHelp)}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            {
              showHelp ?
                <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12z" />
                :
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm10-5a2 2 0 0 0-2 2a1 1 0 0 1-2 0a4 4 0 1 1 5.31 3.78a.674.674 0 0 0-.273.169a.177.177 0 0 0-.037.054v.497a1 1 0 1 1-2 0V13c0-1.152.924-1.856 1.655-2.11A2.001 2.001 0 0 0 12 7zm1 6.007v-.004v.004zM13 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" fill="currentColor" />
            }
          </g>
        </svg>
        {!showHelp && <div className='app-welcome-title'>Welcome!</div>}
        {!showHelp &&
          <form className='app-join-container' onSubmit={handleJoinRoom}>
            <input placeholder='Enter room code' ref={inputRef} onChange={e => setRoomCode(e.target.value)} />
            <button type='submit' disabled={!roomCode} className='app-join-button'>Join</button>
          </form>}
        {showHelp && // help menu
          <p className='app-help-text'>
            Welcome! Get started by entering a room code. It could be anything!
            This will take your to a private room under that name. Next, give that
            room name to your friends so that they can join you in that room. If
            you were sent this website by someone else, ask for their room code
            so you can enter it below. Happy chatting!
          </p>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;