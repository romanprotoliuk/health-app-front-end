import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = ({ isAuthenticated }) => {
  return (
    <>
      <div className="menu-wrapper">
        <div className="menu-icon">
          <div className="menu-dots one"></div>
          <div className="menu-dots two"></div>
          <div className="menu-dots three"></div>
          <div className="menu-dots four"></div>
        </div>
        <div class="menu-content w-nav">
          <Link className="nav-link-3 home-link w-nav-link w--current" to={"/"}>
            Home
          </Link>
          <div class="div-block-26"></div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {isAuthenticated && (
                <Link className="nav-link-3 w-nav-link" to="/favorites">
                  My flows
                </Link>
              )}
            </div>
            <div>
              {isAuthenticated && (
                <Link className="nav-link-3 w-nav-link" to="/poses">
                  Poses
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
