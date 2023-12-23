import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import useQuery from '../../hooks/useQuery';

function Room() {
    const [room, setRoom] = useState(null);
    const [message, setMessage] = useState(null);

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

    }, [navigate, query]);

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