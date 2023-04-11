import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";

const DeleteFlowBtn = ({ handleDeleteFlow, id }) => {
  return (
    <Tooltip title="Delete Flow" placement="top">
      <button
        style={{
          margin: "10px auto 0 auto",
          width: "190px",
          border: "none",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "10px 30px 10px 20px",
          fontFamily: "Lato, sans-serif",
          fontSize: "14px",
          fontWeight: "500",
          // color: #33333390;
          transition: "all 0.3s ease",
          boxShadow:
            "0 6px 22px 0 rgb(0 0 0 / 8%), 0 1px 6px 0 rgb(0 0 0 / 4%)",
          outline: "none",
          // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => handleDeleteFlow(id)}
      >
        <FontAwesomeIcon icon={faArrowRotateRight} />
      </button>
    </Tooltip>
  );
};

export default DeleteFlowBtn;
