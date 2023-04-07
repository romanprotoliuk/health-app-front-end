const UnsaveBtn = ({ handleUnlikeFlow, id }) => {
  return (
    <button onClick={() => handleUnlikeFlow(id)} style={{ cursor: "pointer" }}>
      Unsave
    </button>
  );
};

export default UnsaveBtn;
