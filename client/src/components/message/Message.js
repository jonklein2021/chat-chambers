// react
import React from 'react';

// styles
import './Message.css';

function Message({ sender, content, fontStyles, fontSizeStyles }) {
  return (sender === 'self') ?
    <div className='message-content' style={{
      backgroundColor: '#218aff',
      color: '#f2f2f2',
      alignSelf: 'flex-end',
      ...fontStyles,
      ...fontSizeStyles
    }}>
      {content}
    </div>
    :
    <div className='message'>
      <div className='message-content' style={{ ...fontStyles, ...fontSizeStyles }}>
        {content}
      </div>
      <div className='message-sender'>{sender}</div>
    </div>
}

export default Message;