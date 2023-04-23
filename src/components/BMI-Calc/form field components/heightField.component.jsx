import checkmark from "../imgs/checkmark.svg";

const HeightField = ({
  userDetails,
  handleChange,
  handleShowWeight,
  secondNextBtn,
  secondCheckMark,
}) => {
  return (
    <div className="form-fields">
      <div className="name-wrapper">
        <input
          className="feet-input"
          id="height-field"
          required
          type="text"
          autoComplete="off"
          // value={userDetails.feet}
          name="feet"
          placeholder="Feet"
          onChange={handleChange}
        />
        {secondCheckMark ? (
          <div className="checkmark-img-div" style={{ position: "absolute" }}>
            <img className="checkmark-img" src={checkmark} alt="checkark" />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="inches-input name-wrapper">
        <input
          className="feet-input"
          id="height-inches-field"
          required
          type="text"
          autoComplete="off"
          // value={userDetails.inches}
          name="inches"
          placeholder="inches"
          onChange={handleChange}
        />
        {secondCheckMark ? (
          <div className="checkmark-img-div" style={{ position: "absolute" }}>
            <img className="checkmark-img" src={checkmark} alt="checkark" />
          </div>
        ) : (
          ""
        )}
      </div>
      {secondNextBtn ? (
        <button
          className="next-btn"
          id="height-field-btn"
          onClick={handleShowWeight}
        >
          next
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeightField;
