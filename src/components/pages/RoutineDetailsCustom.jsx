import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import DeleteCustomFlowBtb from "../buttons/DeleteCustomFlowBtn";
import PoseCard from "../PoseCard";
import LoadingSpinner from "../LoadingSpinner";

// import { useEffect } from "react";

const RoutineDetailsCustom = (props) => {
  const {
    handlePoseClick,
    poseCompletion,
    handleDeleteFlow,
    isAuthenticated,
    customUserFlows,
    handleDeleteCustomFlow,
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
      <div className="details-main-container">
        <h3
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#333333",
          }}
        >
          {selected.routine_name}
        </h3>
        <p className="flow-description" style={{ color: "#484848" }}>
          {selected.description}
        </p>

        <DeleteCustomFlowBtb
          handleDeleteCustomFlow={handleDeleteCustomFlow}
          id={selected.id}
        />
      </div>
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
        {selected.routine_poses.map((pose, idx) => {
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

export default RoutineDetailsCustom;
