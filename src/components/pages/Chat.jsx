import ChatRoom from "../ChatRoom";

const Chat = (props) => {
  return (
    <>
      <div className="chat-room-container">
        {props.chatRooms.map((chatRoom) => (
          <ChatRoom
            key={chatRoom.id}
            roomId={props.chatRooms[0].id}
            user={props.user}
            isAuthenticated={props.isAuthenticated}
          />
        ))}
      </div>
    </>
  );
};

export default Chat;
