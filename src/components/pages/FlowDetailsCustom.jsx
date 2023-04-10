import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import PoseCard from "../PoseCard";
import LoadingSpinner from "../LoadingSpinner";

// import { useEffect } from "react";

const FlowDetailsCustom = (props) => {
  const {
    handlePoseClick,
    poseCompletion,
    handleDeleteFlow,
    isAuthenticated,
    customUserFlows,
  } = props;
  const { id } = useParams();

  const selected = customUserFlows.find((flow) => flow.id === parseInt(id));

  if (!selected) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }
  const isCompleted = poseCompletion[selected.id];

  return (
    <>
      <h3>Flow Details</h3>
      <BackBtn />

      {isAuthenticated ? (
        <div style={{ marginBottom: "20px" }}>
          {isCompleted && (
            <DeleteFlowBtn
              handleDeleteFlow={handleDeleteFlow}
              id={selected.id}
            />
          )}
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {isCompleted && (
            <DeleteFlowBtn
              handleDeleteFlow={handleDeleteFlow}
              id={selected.id}
            />
          )}
        </div>
      )}

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

export default FlowDetailsCustom;
