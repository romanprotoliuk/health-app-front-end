import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./buttons/LoginBtn";
import Logo from "./pq-log.png";
import LogoType from "./pq.png";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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
    {/* {!isAuthenticated && (
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
    )} */}
  </NavbarContainer>
);

export default Navbar;
