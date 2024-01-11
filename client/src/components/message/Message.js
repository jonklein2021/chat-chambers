// react
import React from 'react';

// styles
import './Message.css';

function Message({ fontStyles, sender, content }) {
  return (sender === 'self') ?
    <div className='message-content' style={{
      backgroundColor: '#218aff',
      color: '#f2f2f2',
      alignSelf: 'flex-end',
      ...fontStyles
    }}>
      {content}
    </div>
    :
    <div className='message'>
      <div className='message-content' style={fontStyles}>
        {content}
      </div>
      <div className='message-sender'>{sender}</div>
    </div>
}

export default Message;