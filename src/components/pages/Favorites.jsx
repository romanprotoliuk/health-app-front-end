import { Link } from "react-router-dom";

import BackBtn from "../BackBtn";

const Favorites = (props) => {
  const { favoritedFlows, flows, allCustomFlows } = props;

  const myFavoritedFlows = flows.filter((flow) =>
    favoritedFlows.includes(flow.id)
  );

  const renderCards = myFavoritedFlows.map((flow) => {
    return (
      <>
        <Link
          to={`/flow/${flow.id}`}
          key={flow.id}
          className="flow-card"
          style={{ textDecoration: "none" }}
        >
          <h2>{flow.sequence_name}</h2>
          <p className="flow-description">{flow?.description}</p>
          <p className="flow-description">{flow?.level}</p>
          <p className="flow-description">{flow?.targets}</p>
          <p className="flow-description">{flow?.benefits}</p>
        </Link>
      </>
    );
  });

  const renderCustomFlows = allCustomFlows.map((flow) => {
    return <></>;
  });

  return (
    <>
      <BackBtn />
      <h1>Favs Flows</h1>
      <div className="flow-container-grid">{renderCards}</div>
      <h1>My Own Flows</h1>
    </>
  );
};

export default Favorites;
