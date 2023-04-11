import "./buttons.css";

const UnsaveBtn = ({ handleUnlikeFlow, id }) => {
  return (
    <button
      className="custom-btn btn-13"
      onClick={() => handleUnlikeFlow(id)}
      style={{ cursor: "pointer" }}
    >
      <span>Unsave</span>
    </button>
  );
};

export default UnsaveBtn;
