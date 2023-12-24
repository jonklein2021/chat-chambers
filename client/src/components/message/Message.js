import React from 'react';
import './Message.css';

function Message({ sender, content }) {
  if (sender === 'self') return (
    <div className='message-content' style={{
      backgroundColor: '#5a7ebf',
      color: '#f2f2f2',
      alignSelf: 'flex-end'
    }}>
      {content}
    </div>
  );

  return (
    <div className='message'>
      <div className='message-content'>
        {content}
      </div>
      <div className='message-sender'>{sender}</div>
    </div>
  );
}

export default Message;