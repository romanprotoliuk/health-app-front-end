import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttons.css";

const LogoutButton = ({ setUserSub }) => {
  const { logout } = useAuth0();

  const handleLogOut = () => {
    setUserSub(null);
    logout();
  };

  return (
    <button
      className="custom-btn btn-6"
      onClick={handleLogOut}
      style={{ cursor: "pointer" }}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
