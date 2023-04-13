import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../utils/supabase";
import OnlineUsers from "./OnlineUsers";
import MessageForm from "./MessageForm";
import { formatDate } from "../utils/helper";
import LoginButton from "./buttons/LoginBtn";

const ChatRoom = ({ roomId, user, isAuthenticated }) => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUserOnline] = useState([]);
  const bottomRef = useRef(null);
  const chatWrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // The Chat component is visible, scroll to the bottom of the messages
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chatWrapperRef.current) {
      observer.observe(chatWrapperRef.current);
    }

    return () => {
      if (chatWrapperRef.current) {
        observer.unobserve(chatWrapperRef.current);
      }
    };
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
          //   console.log("Change received!", payload.new);
        }
      );

      subscription
        .on("presence", { event: "sync" }, () => {
          //   console.log("Synced presence state: ", subscription.presenceState());
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

  return (
    <div ref={chatWrapperRef}>
      <div>
        <h3
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#333333",
          }}
        >
          Community Chat
        </h3>
        <p
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "12px",
            color: "#00000080",
          }}
        >
          Here you can report bugs, make feature and UI suggestions, or just say
          something nice (:
        </p>

        <div className="parent-container">
          <div style={{ position: "absolute", top: "4vh", left: "2.5vw" }}>
            <OnlineUsers presenceState={usersOnline} />
          </div>
          <div className="action-container">
            {messages.map((message) => (
              <>
                <div
                  className={
                    user?.nickname === message.sender
                      ? "message-list-my-own"
                      : "message-list"
                  }
                >
                  <div
                    className={
                      user?.nickname === message.sender
                        ? "outter-container-message-my-own"
                        : "outter-container-message"
                    }
                  >
                    {user?.nickname === message.sender ? (
                      <>
                        <div className="container-message" key={message.id}>
                          <div className="message-content">
                            <p
                              style={{
                                marginBlockStart: "0",
                                marginBlockEnd: "0",
                              }}
                            >
                              {message.message}
                            </p>
                            <small className="small-right">
                              {formatDate(message.created_at)}
                            </small>
                          </div>
                        </div>
                        <div style={{ marginLeft: "30px" }}>
                          <div
                            style={{
                              width: "55px",
                              height: "55px",
                              backgroundColor: "white",
                              borderRadius: "6px",
                              marginLeft: "10px",
                            }}
                            className="image-div-chat"
                          ></div>
                          <div className="sender-time-holder-my-own">
                            <small className="sender">
                              {message.sender.length > 8
                                ? message.sender.slice(0, 8) + ".."
                                : message.sender}
                            </small>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ width: "80px", marginRight: "20px" }}>
                          <div
                            style={{
                              width: "55px",
                              height: "55px",
                              backgroundColor: "white",
                              borderRadius: "6px",
                              marginRight: "10px",
                            }}
                            className="image-div-chat"
                          ></div>
                          <div className="sender-time-holder">
                            <small className="sender">
                              {message.sender.length > 8
                                ? message.sender.slice(0, 8) + ".."
                                : message.sender}
                            </small>
                          </div>
                        </div>
                        <div className="container-message" key={message.id}>
                          <div className="message-content">
                            <p
                              style={{
                                marginBlockStart: "0",
                                marginBlockEnd: "0",
                              }}
                            >
                              {message.message}
                            </p>
                            <small
                              style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                fontSize: "8px",
                                color: "#00000080",
                                opacity: ".6",
                              }}
                            >
                              {formatDate(message.created_at)}
                            </small>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="background-container" />
        </div>

        <div style={{ marginTop: "20px" }}>
          {isAuthenticated && <MessageForm onSubmit={handleNewMessage} />}
          {!isAuthenticated && (
            <div style={{ margin: "30px 0px" }}>
              <p
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  color: "#00000080",
                }}
              >
                To Chat
              </p>
              <LoginButton style={{ cursor: "pointer" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
