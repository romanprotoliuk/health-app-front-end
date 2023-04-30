import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import PoseCard from "../PoseCard";
import "./pageStyles.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

import { useEffect, useState } from "react";

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

  // const selected = (
  //   filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  // ).find((flow) => flow.id === parseInt(id));

  const [flowDetails, setFlowDetails] = useState([]);
  // Add a loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlowDetails() {
      try {
        setLoading(true); // Set loading to true when the fetch starts
        const response = await axios.get(
          `http://localhost:8000/api/flows/${id}`
        );
        setFlowDetails(response.data);
        setLoading(false); // Set loading to false when the fetch completes
      } catch (error) {
        console.error(error);
        setLoading(false); // Also set loading to false on error
      }
    }
    fetchFlowDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }

  // Render levels array
  const levelsArray = flowDetails.level.split(",");
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

  const benefitsArray = flowDetails.benefits.split(",");
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

  console.log({ flowDetails });

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
          {flowDetails.sequence_name}
        </h3>
        <p className="flow-description" style={{ color: "#484848" }}>
          {flowDetails.description}
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
      <div className="flow-poses-details">
        {flowDetails.sequence_poses.map((pose, idx) => {
          // const isCompleted = poseCompletion[selected.id]?.[idx];
          return (
            <PoseCard
              key={idx}
              pose={pose}
              poseNum={idx + 1}
              // isCompleted={isCompleted}
              isCompleted={null}
              onClick={() =>
                handlePoseClick(flowDetails.sequence_poses.id, idx)
              }
              flowId={flowDetails.id} // add flowId prop to pose card
            />
          );
        })}
      </div>
    </>
  );
};

export default FlowDetails;
