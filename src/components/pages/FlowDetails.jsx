import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import PoseCard from "../PoseCard";
import LoadingSpinner from "../LoadingSpinner";
import "./pageStyles.css";

const FlowDetails = (props) => {
  const {
    flows,
    filteredFlows,
    handlePoseClick,
    poseCompletion,
    handleDeleteFlow,
    handleFavoritedClick,
    handleUnlikeFlow,
    isAuthenticated,
    userFlowIds,
  } = props;
  const { id } = useParams();

  const selected = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).find((flow) => flow.id === parseInt(id));

  if (!selected) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }

  const isSaved = userFlowIds.includes(selected.id);
  const isCompleted = poseCompletion[selected.id];

  // Render benefits array
  const benefitsArray = selected.benefits;
  const renderBenefits = benefitsArray.map((benefit, index) => {
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
            {benefit}
          </p>
        </div>
      </div>
    );
  });

  // Render levels array
  const levelsArray = selected.level;
  const renderLevels = levelsArray.map((level, index) => {
    let difLevel;
    difLevel =
      level === "beginner"
        ? "linear-gradient(to bottom, #43E44B, #0AE0A7)"
        : level === "intermediate"
        ? "linear-gradient(to bottom, #FEA700, #FFD400)"
        : level === "advanced"
        ? "linear-gradient(to bottom, #f83600, #FE6D10)"
        : "";
    return (
      <div
        key={index}
        className="flow-description"
        style={{
          padding: "1px 6px",
          backgroundImage: difLevel,
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
            {level}
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
          {selected.sequence_name}
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
          {renderLevels}
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
                  handleUnlikeFlow={handleUnlikeFlow}
                  id={selected.id}
                />
              ) : (
                <SaveBtn
                  handleFavoritedClick={handleFavoritedClick}
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
              handleDeleteFlow={handleDeleteFlow}
              id={selected.id}
            />
          )}
        </div>
      )}

      <div className="flow-poses-details">
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
