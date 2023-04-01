import Filters from "./Filters";

const Yoga = (props) => {
  const renderCards = (
    props.filteredFlows && props.filteredFlows.length > 0
      ? props.filteredFlows
      : props.flows
  ).map((flow) => {
    return (
      <div className="flow-container">
        <div
          className="flow-container-left"
          style={{ width: "30vw", height: "100vh", overflowY: "scroll" }}
        >
          <div key={flow.id} className="flow-card">
            <h2>{flow.sequence_name}</h2>
            <p className="flow-description">{flow.description}</p>
            <p className="flow-description">{flow.level}</p>
            <p className="flow-description">{flow.targets}</p>
            <p className="flow-description">{flow.benefits}</p>
            <button onClick={() => props.handleShow(flow.id)}>
              {flow.showPoses ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flow-container-right">
          {flow.showPoses && (
            <div className="flow-poses">
              {flow.sequence_poses.map((pose, idx) => {
                return (
                  <div key={idx} className="pose-card">
                    <img
                      className="pose-image"
                      src={pose.image_url}
                      alt={pose.pose_name}
                    />
                    <h3 className="pose-name">{pose.pose_name}</h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="yoga-app-container">
      <Filters
        difficultyFilter={props.difficultyFilter}
        handleSelectDifficulty={props.handleSelectDifficulty}
        bodyPartsFilter={props.bodyPartsFilter}
        handleSelectBodyParts={props.handleSelectBodyParts}
      />
      <div>{renderCards}</div>
    </div>
  );
};

export default Yoga;
