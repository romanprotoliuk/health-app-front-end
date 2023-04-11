import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";

const DeleteCustomFlowBtb = ({ handleDeleteCustomFlow, id }) => {
  return (
    <Link
      to={"/favorites"}
      className="custom-btn btn-25"
      onClick={() => handleDeleteCustomFlow(id)}
      style={{ cursor: "pointer", textDecoration: "none", color: "white" }}
    >
      <span>Delete</span>
    </Link>
  );
};

export default DeleteCustomFlowBtb;
