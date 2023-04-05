import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
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
    favoritedFlows,
  } = props;
  const { id } = useParams();

  // Retrieve flows data from local storage
  // const storedFlows = localStorage.getItem("customFlows");
  // const parsedFlows = JSON.parse(storedFlows);

  // console.log({ parsedFlows });

  const selected = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).find((flow) => flow.id === parseInt(id));

  const isSaved = favoritedFlows?.includes(id);

  // console.log({ selected });

  return (
    <>
      <h3>Flow Details</h3>
      <BackBtn />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleDeleteFlow(selected.id)}>Clear all</button>
        {!isSaved && (
          <button onClick={() => handleFavoritedClick(selected.id)}>
            Favor/Save/Like
          </button>
        )}
        <button onClick={() => handleUnlikeFlow(selected.id)}>Unsave</button>
      </div>
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
