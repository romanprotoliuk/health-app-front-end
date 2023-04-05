import { Link } from "react-router-dom";
import Filters from "../Filters";

const GridPoses = (props) => {
  const renderCards = (
    props.filteredFlows && props.filteredFlows.length > 0
      ? props.filteredFlows
      : props.flows
  ).map((flow) => {
    return (
      <Link
        to={`/flow/${flow.id}`}
        key={flow.id} // add the "key" prop here
        className="flow-card"
        style={{ textDecoration: "none" }}
      >
        <h2>{flow.sequence_name}</h2>
        <p className="flow-description">{flow.description}</p>
        <p className="flow-description">{flow.level}</p>
        <p className="flow-description">{flow.targets}</p>
        <p className="flow-description">{flow.benefits}</p>
      </Link>
    );
  });

  return (
    <>
      <h3>Suggested flows</h3>
      <Filters
        difficultyFilter={props.difficultyFilter}
        handleSelectDifficulty={props.handleSelectDifficulty}
        bodyPartsFilter={props.bodyPartsFilter}
        handleSelectBodyParts={props.handleSelectBodyParts}
      />
      <div className="flow-container-grid">{renderCards}</div>
    </>
  );
};

export default GridPoses;
