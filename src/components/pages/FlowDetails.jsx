import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PoseCard from "../PoseCard";

const FlowDetails = (props) => {
  const {
    flows,
    filteredFlows,
    handlePoseClick,
    poseCompletion,
    handleDeleteFlow,
    handleFavoritedClick,
    handleUnlikeFlow,
  } = props;
  const { id } = useParams();

  const selected = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).find((flow) => flow.id === parseInt(id));

  return (
    <>
      <h3>Flow Details</h3>
      <Link to={"/"}>Go back</Link>
      <button onClick={() => handleDeleteFlow(selected.id)}>Clear all</button>
      <button onClick={() => handleFavoritedClick(selected.id)}>
        Favor/Save/Like
      </button>
      <button onClick={() => handleUnlikeFlow(selected.id)}>Unsave</button>
      <div className="flow-poses">
        {selected.sequence_poses.map((pose, idx) => {
          const isCompleted = poseCompletion[selected.id]?.[idx];
          return (
            <PoseCard
              key={idx}
              pose={pose}
              poseNum={idx + 1}
              isCompleted={isCompleted}
              onClick={() => handlePoseClick(selected.id, idx)}
              flowId={selected.id} // add flowId prop to pose card
            />
          );
        })}
      </div>
    </>
  );
};

export default FlowDetails;
