import { Link } from "react-router-dom";

import BackBtn from "../BackBtn";

const Favorites = (props) => {
  const { favoritedFlows, flows } = props;

  const myFavoritedFlows = flows.filter((flow) =>
    favoritedFlows.includes(flow.id)
  );

  return (
    <>
      <BackBtn />
      <h1>My Flows</h1>
      <div>
        {myFavoritedFlows.map((flow) => (
          <Link to={`/flow/${flow.id}`}>{flow.sequence_name}</Link>
        ))}
      </div>
    </>
  );
};

export default Favorites;
