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
        <p>{onlineUsersCount} user is online.</p>
      ) : (
        <p>{onlineUsersCount} users are online.</p>
      )}
    </div>
  );
};

export default OnlineUsers;
