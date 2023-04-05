import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
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

const Navbar = ({ logout, isRegistered }) => {
  return (
    <NavbarContainer style={{ marginBottom: "20px" }}>
      <NavTitle>Health App</NavTitle>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {isRegistered && <NavLink to="/favorites">My flows</NavLink>}

        <NavLink to="/poses">Poses</NavLink>
      </NavLinks>
      {isRegistered && <button onClick={logout}>Logout</button>}
    </NavbarContainer>
  );
};

export default Navbar;
