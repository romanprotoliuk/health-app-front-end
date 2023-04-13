import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="message-header">
        <span className="message-author">{message.author}</span>
        <span className="message-timestamp">{message.created_at}</span>
      </div>
      <p className="message-text">{message.text}</p>
    </div>
  );
};

export default Message;
