import "./buttons.css";

const SaveBtn = ({ handleFavoritedClick, id }) => {
  return (
    <button
      className="custom-btn btn-13"
      onClick={() => handleFavoritedClick(id)}
      style={{ cursor: "pointer" }}
    >
      <span>Save</span>
    </button>
  );
};

export default SaveBtn;
