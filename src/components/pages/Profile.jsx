import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../../utils/magic";
import LoadingSpinner from "../LoadingSpinner";

const Profile = ({
  userMetadata,
  setUserMetadata,
  isAuthenticated,
  isRegistered,
  setIsAuthenticated,
  setIsRegistered,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        setIsAuthenticated(magicIsLoggedIn);
        magic.user.getMetadata().then(setUserMetadata);
        const userMetadata = magic.user.getMetadata();
        setIsRegistered(Boolean(userMetadata?.email));
      } else {
        // If no user is logged in, redirect to `/login`
        navigate("/login");
      }
    });
  }, []);

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      navigate("/login");
    });
  }, [navigate]);

  return userMetadata ? (
    <div className="container">
      <h1>Current user: {userMetadata.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <LoadingSpinner text="Loading..." />
  );
};

export default Profile;
