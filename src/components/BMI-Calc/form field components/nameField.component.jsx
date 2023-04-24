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
      <div
        style={{
          position: "relative",
          marginBottom: "20px",
          maxWidth: "300px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          id="name-field"
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
          required
          type="text"
          autoComplete="off"
          value={userDetails.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        {firstCheckMark && (
          <div
            className="checkmark-img-div"
            style={{
              position: "absolute",
              top: "50%",
              right: "0%",
            }}
          >
            <img
              className="checkmark-img"
              src={checkmark}
              alt="checkark"
              style={{ marginTop: "3px", opacity: ".6" }}
            />
          </div>
        )}
      </div>

      {firstNextBtn && (
        <button
          style={{ marginTop: "20px" }}
          className="custom-btn btn-13"
          id="name-field-btn"
          onClick={handleShowHeight}
        >
          next
        </button>
      )}
    </div>
  );
};

export default NameField;
