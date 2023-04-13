import React, { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { supabase } from "../utils/supabase";

const MessageInput = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!message) return;

    const { data: room, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    const { data: user, error: userError } = await supabase.auth.user();
    if (userError) {
      console.log(userError);
      return;
    }

    const newMessage = {
      room_id: room.id,
      user_id: user.id,
      message: message,
    };

    const { error: insertError } = await supabase
      .from("messages")
      .insert(newMessage);

    if (insertError) {
      console.log(insertError);
      return;
    }

    setMessage("");
  };

  return (
    <InputGroup>
      <Input
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        size="lg"
      />
      <InputRightElement>
        <p>Air plane icon</p>
      </InputRightElement>
    </InputGroup>
  );
};

export default MessageInput;
