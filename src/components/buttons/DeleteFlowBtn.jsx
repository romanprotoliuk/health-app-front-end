import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

const DeleteFlowBtn = ({ handleDeleteFlow, id }) => {
  return (
    <button
      style={{
        margin: "10px auto 10px auto",
        width: "40px",
        height: "40px",
        border: "none",
        backgroundColor: "transparent",
        borderRadius: "50%",
        padding: "10px",
        fontFamily: "Lato, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.3s ease",
        boxShadow: "0 6px 22px 0 rgb(0 0 0 / 8%), 0 1px 6px 0 rgb(0 0 0 / 4%)",
        outline: "none",
      }}
      onClick={() => handleDeleteFlow(id)}
    >
      <FontAwesomeIcon icon={faArrowRotateRight} />
    </button>
  );
};

export default DeleteFlowBtn;
