import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttons.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="custom-btn btn-6"
      onClick={() => loginWithRedirect()}
      style={{ cursor: "pointer" }}
    >
      <span>Log In or Register</span>
    </button>
  );
};

export default LoginButton;
