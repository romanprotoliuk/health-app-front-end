import checkmark from "../imgs/checkmark.svg";
import "./form.field.css";

const NameField = ({
  userDetails,
  handleChange,
  handleShowHeight,
  firstNextBtn,
  firstCheckMark,
}) => {
  return (
    <div>
      <div className="name-wrapper">
        <input
          className="feet-input"
          id="name-field"
          required
          type="text"
          autoComplete="off"
          value={userDetails.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        {firstCheckMark ? (
          <div className="checkmark-img-div" style={{ position: "absolute" }}>
            <img className="checkmark-img" src={checkmark} alt="checkark" />
          </div>
        ) : (
          ""
        )}
      </div>

      {firstNextBtn ? (
        <button
          className="next-btn"
          id="name-field-btn"
          onClick={handleShowHeight}
        >
          next
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default NameField;
