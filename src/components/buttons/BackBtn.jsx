import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackBtn = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: "4vh",
          left: "2.5vw",
          zIndex: "99",
        }}
      >
        <Link
          to={"/"}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "rgba(40, 112, 163, 0.153)",
            color: "#000",
            textDecoration: "none",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "1px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: "0.8rem", opacity: "0.7" }}
          />
        </Link>
      </div>
    </>
  );
};

export default BackBtn;
