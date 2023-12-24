import React from 'react';
import './Message.css';

function Message({ sender, content }) {
  if (sender === 'self') return (
    <div className='message' style={{
      backgroundColor: '#5a7ebf',
      color: '#f2f2f2',
      alignSelf: 'flex-end'
    }}>
      {content}
    </div>
  );

  return (
    <div className='message'>
      {sender}: {content}
    </div>
  );
}

export default Message;