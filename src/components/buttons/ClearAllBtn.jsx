const ClearAll = ({ handleClearAllPoses }) => {
  return (
    <button onClick={handleClearAllPoses} style={{ cursor: "pointer" }}>
      Clear All
    </button>
  );
};

export default ClearAll;
