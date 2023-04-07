const DeleteFlowBtn = ({ handleDeleteFlow, id }) => {
  return (
    <button onClick={() => handleDeleteFlow(id)} style={{ cursor: "pointer" }}>
      Clear all
    </button>
  );
};

export default DeleteFlowBtn;
