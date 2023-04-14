const CreateCustomFlow = ({
  handleCreateNewFlow,
  customText = "Create Custom Flow",
}) => {
  return (
    <>
      <button
        className="custom-btn-2 btn-13"
        onClick={handleCreateNewFlow}
        style={{ cursor: "pointer" }}
      >
        <span>{customText}</span>
      </button>
    </>
  );
};

export default CreateCustomFlow;
