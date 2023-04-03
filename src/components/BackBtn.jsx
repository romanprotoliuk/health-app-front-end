import { Link } from "react-router-dom";

const BackBtn = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Link
          to={"/"}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#f1f1f1",
            color: "#000",
            textDecoration: "none",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "1px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
        >
          Go back
        </Link>
      </div>
    </>
  );
};

export default BackBtn;
