import React from 'react';
import './MessageBubble.css';

const MessageBubble = () => {
  return (
    <div className="message-bubble">
      <p>
        Have a question about your order before placing it? 
        <br />
        <a href="tel:443-789-6803">Send us a text here</a> or 
        <a href="mailto:skhan139@icloud.com"> email us here</a>.
      </p>
    </div>
  );
};

export default MessageBubble;