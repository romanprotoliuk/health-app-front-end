import { Link } from "react-router-dom";

const HomeSections = () => {
  return (
    <>
      <div
        style={{ display: "flex", margin: "0 auto", flexDirection: "column" }}
      >
        <Link to={"/yoga"}>yoga</Link>
        <Link to={"/strength"}>strength</Link>
      </div>
    </>
  );
};

export default HomeSections;
