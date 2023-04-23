import checkmark from "../imgs/checkmark.svg";

const WeightField = ({ userDetails, handleChange, thirdCheckMark }) => {
  return (
    <div className="name-wrapper">
      <input
        id="weight-field"
        required
        type="text"
        autoComplete="off"
        // value={userDetails.weight}
        name="weight"
        onChange={handleChange}
        placeholder="Weight"
      />
      {thirdCheckMark ? (
        <div className="checkmark-img-div-two" style={{ position: "absolute" }}>
          <img className="checkmark-img" src={checkmark} alt="checkark" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WeightField;
