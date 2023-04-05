import React, { useCallback } from "react";

const Login = ({
  userData,
  setUserData,
  isAuthenticated,
  setIsAuthenticated,
  isRegistered,
  setIsRegistered,
  login,
  setEmail,
  isLoggingIn,
}) => {
  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="container">
      <h1>Please sign up or login</h1>
      <input
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email"
        onChange={handleInputOnChange}
        disabled={isLoggingIn}
      />
      <button onClick={login} disabled={isLoggingIn}>
        Login
      </button>
    </div>
  );
};

export default Login;
