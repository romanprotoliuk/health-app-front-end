import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = ({ text }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      <div style={{ marginTop: "10px" }}>{text}</div>
    </div>
  );
};

export default LoadingSpinner;
