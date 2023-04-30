import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import PoseCard from "../PoseCard";
import LoadingSpinner from "../LoadingSpinner";
import "./pageStyles.css";

const RoutineDetails = (props) => {
  const {
    routines,
    filteredFlows,
    handlePoseClick,
    poseCompletion,
    handleDeleteCustomFlow,
    handleDeleteFlow,
    handleFavoritedRoutineClick,
    handleUnlikeRoutine,
    isAuthenticated,
    userRoutineIds,
  } = props;
  const { id } = useParams();

  const selected = routines.find((flow) => flow.id === parseInt(id));

  if (!selected) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }

  const isSaved = userRoutineIds.includes(selected.id);
  const isCompleted = poseCompletion[selected.id];

  // Render benefits array
  const benefitsArray = selected.targets.split(",");
  const renderBenefits = benefitsArray.map((target, index) => {
    return (
      <div
        key={index}
        className="flow-description"
        style={{
          padding: "1px 6px",
          border: "1px solid #2870A3",
          borderRadius: "50px",
          margin: "2px",
        }}
      >
        <div>
          <p
            style={{
              marginBlockEnd: "0",
              marginBlockStart: "0",
            }}
          >
            {target}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <BackBtn />
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
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "0 auto",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {renderBenefits}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "20px auto 20px auto",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* {renderLevels} */}
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              {isSaved ? (
                <UnsaveBtn
                  handleUnlikeFlow={handleUnlikeRoutine}
                  id={selected.id}
                />
              ) : (
                <SaveBtn
                  handleFavoritedClick={handleFavoritedRoutineClick}
                  id={selected.id}
                />
              )}
            </div>

            {isCompleted && (
              <DeleteFlowBtn
                handleDeleteFlow={handleDeleteFlow}
                id={selected.id}
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {isCompleted && (
            <DeleteFlowBtn
              handleDeleteFlow={handleDeleteCustomFlow}
              id={selected.id}
            />
          )}
        </div>
      )}

      <div className="flow-poses-details">
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

export default RoutineDetails;
