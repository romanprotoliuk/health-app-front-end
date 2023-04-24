import { Link } from "react-router-dom";
import "./Menu.css";
import LogoutButton from "../buttons/LogoutBtn";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Menu = ({ isAuthenticated, setUserSub }) => {
  const [menuIconSetting, setMenuIconSetting] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const handleMenuIcon = () => {
    setMenuIconSetting(!menuIconSetting);
  };
  return (
    <>
      <div className="menu-wrapper">
        <div className="menu-icon" onClick={handleMenuIcon}>
          <div
            className={menuIconSetting ? "menu-dots-oneF" : "menu-dots-one"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-twoF" : "menu-dots-two"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-threeF" : "menu-dots-three"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-fourF" : "menu-dots-four"}
          ></div>
        </div>

        {menuIconSetting && (
          <div className="menu-content w-nav">
            <div style={{ padding: "10px 0px" }}>
              <Link
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  color: "#333333",
                  textDecoration: "none",
                }}
                to={"/"}
              >
                Home
              </Link>
            </div>
            <div className="div-block-26"></div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "10px 0px" }}>
                <Link
                  style={{
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                  to={"/about"}
                >
                  About
                </Link>
              </div>
              <div>
                <Link
                  style={{
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                  to={"/bmi"}
                >
                  BMI Calculator
                </Link>
              </div>
              {/* <div>
                <Link
                  style={{
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                  to={"/routines"}
                >
                  Strength Training
                </Link>
              </div> */}
              {isAuthenticated && (
                <div style={{ marginTop: "10px" }}>
                  <Link
                    style={{
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: "#333333",
                      textDecoration: "none",
                    }}
                    to="/favorites"
                  >
                    My Profile
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <div style={{ marginTop: "10px" }}>
                  <Link
                    style={{
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: "#333333",
                      textDecoration: "none",
                    }}
                    to="/poses"
                  >
                    Poses
                  </Link>
                </div>
              )}

              {/* {isAuthenticated && (
                <div style={{ marginTop: "10px" }}>
                  <Link
                    style={{
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: "#333333",
                      textDecoration: "none",
                    }}
                    to="/exercises"
                  >
                    Exercises
                  </Link>
                </div>
              )} */}

              {!isAuthenticated && (
                <div style={{ marginTop: "10px" }}>
                  <Link
                    style={{
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: "#333333",
                      textDecoration: "none",
                    }}
                    onClick={() => loginWithRedirect()}
                  >
                    Login or Register
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div style={{ marginTop: "30px" }}>
                  <LogoutButton setUserSub={setUserSub} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;

// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import "./buttons.css";

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();
//   return (
//     <button
//       className="custom-btn btn-6"
//       onClick={() => loginWithRedirect()}
//       style={{ cursor: "pointer" }}
//     >
//       <span>Log In or Register</span>
//     </button>
//   );
// };

// export default LoginButton;
