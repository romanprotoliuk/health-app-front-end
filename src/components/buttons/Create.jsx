import "./buttons.css";

const Create = ({ buttonWord = "Create Flow" }) => {
  return (
    <>
      <button
        className="custom-btn btn-13"
        style={{ cursor: "pointer", marginTop: "60px" }}
        type="submit"
      >
        <span>{buttonWord}</span>
      </button>
    </>
  );
};

export default Create;
