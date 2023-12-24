import React from 'react';
import './Message.css';

function Message({ sender, content }) {
  if (sender === 'self') return (
    <div className='message' style={{ backgroundColor: "#5a7ebf" }}>
      {content}
    </div>
  )

  return (
    <div className='message'>
      {sender}: {content}
    </div>
  );
}

export default Message;