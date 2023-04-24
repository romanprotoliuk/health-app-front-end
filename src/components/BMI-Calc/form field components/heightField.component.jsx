import checkmark from "../imgs/checkmark.svg";

const HeightField = ({
  userDetails,
  handleChange,
  handleShowWeight,
  secondNextBtn,
  secondCheckMark,
}) => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "300px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        className="name-wrapper"
        style={{
          position: "relative",
          maxWidth: "300px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          className="feet-input"
          id="height-field"
          required
          type="text"
          autoComplete="off"
          style={{
            position: "relative",
            maxWidth: "300px",
            minWidth: "200px",
            border: "none",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "10px 30px 10px 20px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
            outline: "none",
          }}
          name="feet"
          placeholder="Feet"
          onChange={handleChange}
        />
        {secondCheckMark && (
          <div
            className="checkmark-img-div"
            style={{
              position: "absolute",
              //   top: "50%",
              right: "0%",
            }}
          >
            <img
              className="checkmark-img"
              src={checkmark}
              alt="checkark"
              style={{ marginBottom: "3px", opacity: ".6" }}
            />
          </div>
        )}
      </div>

      <div
        className="inches-input name-wrapper"
        style={{
          position: "relative",
          maxWidth: "300px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          className="feet-input"
          id="height-inches-field"
          required
          type="text"
          autoComplete="off"
          style={{
            position: "relative",
            maxWidth: "300px",
            minWidth: "200px",
            border: "none",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "10px 30px 10px 20px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
            outline: "none",
          }}
          name="inches"
          placeholder="Inches"
          onChange={handleChange}
        />
        {secondCheckMark && (
          <div
            className="checkmark-img-div"
            style={{
              position: "absolute",
              //   top: "50%",
              right: "0%",
            }}
          >
            <img
              className="checkmark-img"
              src={checkmark}
              alt="checkark"
              style={{ marginBottom: "3px", opacity: ".6" }}
            />
          </div>
        )}
      </div>
      {secondNextBtn && (
        <button
          style={{ marginTop: "20px" }}
          className="custom-btn btn-13"
          id="height-field-btn"
          onClick={handleShowWeight}
        >
          next
        </button>
      )}
    </div>
  );
};

export default HeightField;
