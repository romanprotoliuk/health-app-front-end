import React, { useState, useEffect } from "react";

const OnlineUsers = ({ presenceState }) => {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  useEffect(() => {
    const countOnlineUsers = () => {
      let count = 0;

      for (const key in presenceState) {
        count += presenceState[key].length;
      }

      setOnlineUsersCount(count);
    };

    countOnlineUsers();
  }, [presenceState]);

  return (
    <div>
      {onlineUsersCount === 1 ? (
        <p
          style={{
            marginBlockStart: "0",
            marginBlockEnd: "0",
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "8px",
            color: "#00000080",
            opacity: ".6",
          }}
        >
          {onlineUsersCount} user online
        </p>
      ) : (
        <p
          style={{
            marginBlockStart: "0",
            marginBlockEnd: "0",
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "8px",
            color: "#00000080",
            opacity: ".6",
          }}
        >
          {onlineUsersCount} users online
        </p>
      )}
    </div>
  );
};

export default OnlineUsers;
