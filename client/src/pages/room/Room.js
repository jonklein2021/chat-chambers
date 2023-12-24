import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import useQuery from '../../hooks/useQuery';
import './Room.css';
import Message from '../../components/message/Message';

function Room() {
  const [room, setRoom] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const room = query.get('id');
    if (!room) {
      navigate('/404');
      return;
    }

    socket.connect();
    socket.emit('join-room', room);
    setRoom(room);

    socket.on('load-message', (sender, msg) => {
      setMessages(prev => [...prev, {sender, msg}]);
    });

  }, [navigate, query]);

  function handleSend() {
    if (newMessage) {
      socket.emit('send-message', room, newMessage);
      document.querySelector('.room-send-container > button').value = '';

      // add to this DOM
      setMessages(prev => [...prev, {sender: 'self', msg: newMessage}]);
    }
  }

  return (
    <div className='room'>
      <p className='room-label'>Room: {room}</p>
      <div className='room-middle-container'>
        <div className='room-messages-container'>
          {messages.map(m => 
            <Message key={messages.indexOf(m)} sender={m.sender} content={m.msg} />
          )}
        </div>
        <div className='room-send-container'>
          <input placeholder='New Message...' onChange={e => setNewMessage(e.target.value)} />
          <button onClick={handleSend}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Room;