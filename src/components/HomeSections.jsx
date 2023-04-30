import { Link } from "react-router-dom";

const HomeSections = () => {
  return (
    <>
      <h2>Home</h2>
      <div>
        <Link to={"/yoga"}>yoga</Link>
        <Link to={"/strength"}>strength</Link>
      </div>
    </>
  );
};

export default HomeSections;
