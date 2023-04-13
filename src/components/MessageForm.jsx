import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      <input
        style={{
          minWidth: "200px",
          //   margin: "60px 0 20px 0",
          marginRight: "20px",
          border: "none",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "10px 30px 10px 20px",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
          outline: "none",
        }}
        type="text"
        value={newMessage}
        onChange={handleChange}
      />
      <button
        style={{
          //   margin: "60px 0 20px 0",
          border: "none",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "10px 30px 10px 30px",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
          outline: "none",
          cursor: "pointer",
        }}
        type="submit"
      >
        <FontAwesomeIcon icon={faPaperPlane} style={{ opacity: "0.5" }} />
      </button>
    </form>
  );
};

export default MessageForm;
