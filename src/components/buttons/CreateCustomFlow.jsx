const CreateCustomFlow = ({ handleCreateNewFlow }) => {
  return (
    <>
      <button
        className="custom-btn btn-13"
        onClick={handleCreateNewFlow}
        style={{ cursor: "pointer" }}
      >
        <span>Create Custom Flow</span>
      </button>
    </>
  );
};

export default CreateCustomFlow;
