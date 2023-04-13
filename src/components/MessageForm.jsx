import React, { useState, useCallback } from "react";

const MessageForm = ({ onSubmit }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleChange = useCallback((e) => {
    setNewMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(newMessage);
      setNewMessage("");
    },
    [onSubmit, newMessage]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newMessage} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
