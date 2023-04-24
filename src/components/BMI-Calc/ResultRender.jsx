const ResultRender = (props) => {
  return (
    <div className="result-wrapper">
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#00000080",
          marginBottom: "30px",
        }}
      >
        Hi, {props.name}
      </p>
      <div>
        <img
          className="img-icon"
          src={props.avatar}
          alt={props.avatar}
          style={{ width: "100px", opacity: ".3" }}
        />
      </div>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#00000080",
          marginBottom: "30px",
        }}
      >
        your bio metrics:
      </p>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: ".8rem",
        }}
      >
        height: {props.feet}'{props.inches}
      </p>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: ".8rem",
        }}
      >
        weight: {props.weight}
      </p>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: ".8rem",
        }}
      >
        your bmi: {props.bmi}
      </p>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#00000080",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        by our calculations:
      </p>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: ".8rem",
        }}
        className="text-display"
      >
        you are {props.userPrompt}{" "}
      </p>
    </div>
  );
};

export default ResultRender;
