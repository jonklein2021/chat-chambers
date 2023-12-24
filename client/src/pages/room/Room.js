import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import useQuery from '../../hooks/useQuery';
import './Room.css';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';

function Room() {
  const [room, setRoom] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(true);

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
      setMessages(prev => [...prev, { sender, msg }]);
    });

  }, [navigate, query]);

  function handleSend(e) {
    e.preventDefault();
    if (!newMessage) return; 

    // send message to socket
    socket.emit('send-message', room, username, newMessage);

    // clear new message form
    document.querySelector('.room-send-container').firstChild.value = '';
    setNewMessage(null);

    // add sender's new message DOM
    setMessages(prev => [...prev, { sender: 'self', msg: newMessage }]);
  }

  return (
    <div className='room'>
      <Modal isOpen={modalOpen} onClose={setModalOpen} setUsername={setUsername} />
      <div className="room-label">
        <p>Room: {room}</p>
        {username && <p>Username: {username}</p>}
      </div>
      <div className='room-middle-container'>
        <div className='room-messages-container'>
          {messages.map(m =>
            <Message key={messages.indexOf(m)} sender={m.sender} content={m.msg} />
          )}
        </div>
        {username &&
          <form className='room-send-container' onSubmit={e => handleSend(e)}>
            <input placeholder='New Message...' onChange={e => setNewMessage(e.target.value)} />
            <button type='submit' disabled={!newMessage}>Submit</button>
          </form>
        }
      </div>
    </div>
  );
}

export default Room;