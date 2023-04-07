const SaveBtn = ({ handleFavoritedClick, id }) => {
  return (
    <button
      onClick={() => handleFavoritedClick(id)}
      style={{ cursor: "pointer" }}
    >
      Save
    </button>
  );
};

export default SaveBtn;
