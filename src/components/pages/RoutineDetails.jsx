import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import PoseCard from "../PoseCard";
import LoadingSpinner from "../LoadingSpinner";
import "./pageStyles.css";

import { useEffect, useState } from "react";
import axios from "axios";
import FlowDetails from "./FlowDetails";
import ExerciseCard from "../ExerciseCard";

const RoutineDetails = (props) => {
  const {
    routines,
    filteredFlows,
    handleExerciseClick,
    poseCompletion,
    handleDeleteCustomFlow,
    handleDeleteFlow,
    handleFavoritedRoutineClick,
    handleUnlikeRoutine,
    isAuthenticated,
    userRoutineIds,
    exerciseCompletion,
  } = props;
  const { id } = useParams();

  // const selected = routines.find((flow) => flow.id === parseInt(id));

  // if (!selected) {
  //   return (
  //     <>
  //       <LoadingSpinner text="Loading..." />
  //     </>
  //   );
  // }

  const [routineDetails, setRoutineDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlowDetails() {
      try {
        setLoading(true); // Set loading to true when the fetch starts
        const response = await axios.get(
          `http://localhost:8000/api/routines/${id}`
        );
        setRoutineDetails(response.data);
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

  // const isSaved = userRoutineIds.includes(selected.id);
  // const isCompleted = poseCompletion[selected.id];

  const isSaved = userRoutineIds.includes(routineDetails.id);
  console.log({ exerciseCompletion });
  const isCompleted = exerciseCompletion[routineDetails.id];
  // Render benefits array
  const benefitsArray = routineDetails.targets.split(",");
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
          {routineDetails.routine_name}
        </h3>
        <p className="flow-description" style={{ color: "#484848" }}>
          {routineDetails.description}
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
                // <UnsaveBtn
                //   handleUnlikeFlow={handleUnlikeFlow}
                //   id={flowDetails.id}
                // />
                <></>
              ) : (
                // <SaveBtn
                //   handleFavoritedClick={handleFavoritedClick}
                //   id={routineDetails.id}
                // />
                <></>
              )}
            </div>

            {isCompleted && (
              <DeleteFlowBtn
                handleDeleteFlow={handleDeleteFlow}
                id={routineDetails.id}
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {isCompleted && (
            <DeleteFlowBtn
              handleDeleteFlow={handleDeleteFlow}
              id={routineDetails.id}
            />
          )}
        </div>
      )}

      <div className="flow-poses-details">
        {routineDetails.routine_poses.map((exercise, idx) => {
          console.log("thsisssss", poseCompletion);
          const isCompleted = poseCompletion[routineDetails.id]?.[idx];
          console.log(routineDetails.id);
          console.log({ exercise });
          return (
            <ExerciseCard
              key={idx}
              exercise={exercise}
              poseNum={idx + 1}
              isCompleted={isCompleted}
              onClick={() => handleExerciseClick(routineDetails.id, idx)}
              exerciseId={exercise.id} // add flowId prop to pose card
            />
          );
        })}
      </div>
    </>
  );
};

export default RoutineDetails;
