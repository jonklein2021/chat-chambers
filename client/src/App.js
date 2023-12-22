import React, { useState, useEffect } from 'react';
import { socket } from './utils/socket';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => { setIsConnected(true) });
    socket.on('disconnect', () => { setIsConnected(false) });

    return () => {
      socket.off('connect', () => { setIsConnected(true) });
      socket.off('disconnect', () => { setIsConnected(false) });
    };
  }, []);

  return (
    <div className="App">
      <p>State: {isConnected}</p>
      <div>
        <button onClick={ () => socket.connect() }>Connect</button>
        <button onClick={ () => socket.disconnect() }>Disconnect</button>
      </div>
    </div>
  );
}