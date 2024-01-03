// react
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// socket.io
import { socket } from '../../utils/socket';

// components
import Message from '../../components/message/Message';
import UsernameModal from '../../components/username-modal/UsernameModal';
import SettingsButton from '../../components/settings-button/SettingsButton';

// styles
import './Room.css';
import SettingsModal from '../../components/settings-modal/SettingsModal';

function Room() {
  const { room } = useParams();

  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const [numMembers, setNumMembers] = useState(0);
  const [log, setLog] = useState([]);
  const [papyrusMode, setPapyrusMode] = useState(false);

  const inputRef = useRef(null);
  
  const navigate = useNavigate();

  // modal states
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // listen for username and room changes here
  useEffect(() => {
    if (!room) {
      navigate('/404');
      return;
    }
    
    // get current number of members
    socket.emit('request-members', room);
    
    if (username) socket.emit('join-room', room);
    
  }, [navigate, room, username]);
  
  // initialize listeners
  useEffect(() => {
    socket.connect();
    
    socket.on('load-message', (sender, msg) => {
      setMessages(prev => [...prev, { sender, msg }]);
    });
    
    socket.on('update-members', length => {
      setNumMembers(length);
    });    

    socket.on('member-join', username => {
      if (username) setLog(oldLog => [...oldLog, username + ' joined the room'])
    });
    
    socket.on('member-leave', username => {
      if (username) setLog(oldLog => [...oldLog, username + ' left the room'])
    });

  }, []);

  // listen for setting changes
  useEffect(() => {
    if (papyrusMode) {
      document.querySelector('body').classList.add('papyrus-mode');
    } else {
      document.querySelector('body').classList.remove('papyrus-mode');
    }
  }, [papyrusMode]);

  function handleSend(e) {
    e.preventDefault();
    if (!newMessage) return; 

    // send message to socket
    socket.emit('send-message', room, username, newMessage);

    // clear new message form
    inputRef.current.value = '';
    setNewMessage(null);

    // add sender's new message DOM
    setMessages(prev => [...prev, { sender: 'self', msg: newMessage }]);
  }

  return (
    <div className='room'>
      <UsernameModal isOpen={usernameModalOpen} onClose={setUsernameModalOpen} socket={socket} room={room} setUsername={setUsername} />
      <SettingsModal isOpen={settingsModalOpen} onClose={setSettingsModalOpen} state={papyrusMode} setState={setPapyrusMode} />
      <div className='room-left-container'>
        <div className='room-top-left-label'>
          <p>Room: {room}</p>
          {username && <p># of members: {numMembers}</p>} {/* TODO: Get this to show and update on page load */}
          {username && <p>Username: {username}</p>}
        </div>
        {username && <SettingsButton onClick={() => setSettingsModalOpen(true)} />}
      </div>
      <div className='room-middle-container'>
        <div className='room-messages-container'>
          {messages.map(m =>
            <Message key={messages.indexOf(m)} sender={m.sender} content={m.msg} />
          )}
        </div>
        {username &&
          <form className='room-send-container' onSubmit={handleSend}>
            <input placeholder='New Message...' ref={inputRef} onChange={e => setNewMessage(e.target.value)} />
            <button type='submit' disabled={!newMessage}>Send</button>
          </form>
        }
      </div>
      <div className='room-right-container' onClick={() => console.log(log)}>
        {log.map(msg => 
          <p key={log.indexOf(msg)}>{msg}</p>
        )}
      </div>
    </div>
  );
}

export default Room;