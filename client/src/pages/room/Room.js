import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';

function Room({ match }) {
    const [room, setRoom] = useState(null);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!match) {
            navigate('/404');
            return;
        }
        
        socket.connect();

        setRoom(match.params.room);

    }, [match, navigate]);

    function handleSend() {
        if (message) socket.emit('send-message', message);
    }

    return (
        <div className='room'>
            <input type='text' placeholder='Test box' onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSend}>Submit</button>
        </div>
    );
}

export default Room;