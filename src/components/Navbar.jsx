import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./buttons/LoginBtn";
import LogoutButton from "./buttons/LogoutBtn";
import Logo from "./pq-log.png";
import LogoType from "./pq.png";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
  &:hover {
    color: #ccc;
  }
`;

const Navbar = ({ isAuthenticated, setUserSub }) => (
  <NavbarContainer style={{ marginBottom: "20px" }}>
    <Link to={"/"} style={{ cursor: "pointer" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <img style={{ width: "150px" }} src={Logo} alt="logo" />
        <img
          style={{ width: "70px", marginTop: "5px" }}
          src={LogoType}
          alt="logo"
        />
      </div>
    </Link>
    <NavLinks>
      {isAuthenticated && <NavLink to="/favorites">My flows</NavLink>}
      {isAuthenticated && <NavLink to="/poses">Poses</NavLink>}
    </NavLinks>
    {isAuthenticated ? (
      <LogoutButton setUserSub={setUserSub} />
    ) : (
      <div style={{ margin: "30px 0px" }}>
        <p
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "12px",
            color: "#00000080",
          }}
        >
          For better user experience
        </p>
        <LoginButton style={{ cursor: "pointer" }} />
      </div>
    )}
  </NavbarContainer>
);

export default Navbar;
