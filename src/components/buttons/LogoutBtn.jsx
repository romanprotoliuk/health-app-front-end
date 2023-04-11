import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttons.css";
import { Link } from "react-router-dom";

const LogoutButton = ({ setUserSub }) => {
  const { logout } = useAuth0();

  const handleLogOut = () => {
    setUserSub(null);
    logout();
  };

  return (
    <Link
      onClick={handleLogOut}
      style={{
        fontWeight: "600",
        textTransform: "uppercase",
        fontSize: "12px",
        color: "#333333",
        textDecoration: "none",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      Log out
    </Link>
  );
};

export default LogoutButton;
