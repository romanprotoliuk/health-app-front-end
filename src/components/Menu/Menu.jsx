import { Link } from "react-router-dom";
import "./Menu.css";
import LogoutButton from "../buttons/LogoutBtn";
import { useState } from "react";

const Menu = ({ isAuthenticated, setUserSub }) => {
  const [menuIconSetting, setMenuIconSetting] = useState(false);

  const handleMenuIcon = () => {
    setMenuIconSetting(!menuIconSetting);
  };
  return (
    <>
      <div className="menu-wrapper">
        <div className="menu-icon" onClick={handleMenuIcon}>
          <div
            className={menuIconSetting ? "menu-dots-oneP" : "menu-dots-one"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-twoP" : "menu-dots-two"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-threeP" : "menu-dots-three"}
          ></div>
          <div
            className={menuIconSetting ? "menu-dots-fourP" : "menu-dots-four"}
          ></div>
        </div>

        {menuIconSetting && (
          <div class="menu-content w-nav">
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
            <div class="div-block-26"></div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginTop: "10px" }}>
                {isAuthenticated && (
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
                    My flows
                  </Link>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                {isAuthenticated && (
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
                )}
              </div>

              <div style={{ marginTop: "10px" }}>
                {isAuthenticated && <LogoutButton setUserSub={setUserSub} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
