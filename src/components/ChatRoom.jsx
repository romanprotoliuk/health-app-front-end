import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../utils/supabase";
import OnlineUsers from "./OnlineUsers";
import MessageForm from "./MessageForm";

const ChatRoom = ({ roomId, user }) => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUserOnline] = useState([]);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchData = useCallback(async () => {
    try {
      const { data: roomData, error: roomError } = await supabase
        .from("chat_rooms")
        .select("*")
        .eq("id", roomId || 0)
        .single();
      if (roomError) throw roomError;
      setRoom(roomData);

      const { data: messagesData, error: messagesError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room", roomData?.name)
        .order("created_at", { ascending: true });
      if (messagesError) throw messagesError;
      setMessages(messagesData);

      const subscription = supabase.channel(
        `chat_messages:room=eq.${roomData?.name}`
      );
      subscription.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
          console.log("Change received!", payload.new);
        }
      );

      subscription
        .on("presence", { event: "sync" }, () => {
          console.log("Synced presence state: ", subscription.presenceState());
          setUserOnline(subscription.presenceState());
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await subscription.track({ online_at: new Date().toISOString() });
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    } catch (error) {
      console.log(error);
    }
  }, [roomId, setUserOnline]);

  useEffect(() => {
    if (roomId) {
      fetchData();
    }
  }, [roomId, fetchData]);

  const handleNewMessage = async (newMessage) => {
    if (!newMessage.trim()) return;

    try {
      const { data: roomData, error: roomError } = await supabase
        .from("chat_rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (roomError) throw roomError;

      const { error } = await supabase.from("chat_messages").insert({
        message: newMessage.trim(),
        sender: user.nickname,
        room: roomData.name, // use the name of the selected room
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(usersOnline);

  return (
    <div>
      <h1>{room?.name}</h1>
      <div
        style={{
          height: "80vh",
          overflowY: "scroll",
        }}
      >
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.message}</p>
            <small>{message.sender}</small>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <OnlineUsers presenceState={usersOnline} />
      <MessageForm onSubmit={handleNewMessage} />
    </div>
  );
};

export default ChatRoom;
