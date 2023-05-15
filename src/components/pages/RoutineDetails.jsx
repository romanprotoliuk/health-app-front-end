import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import LoadingSpinner from "../LoadingSpinner";
import "./pageStyles.css";
import FilterRoutines from "../FiltersRoutines";

import { useEffect, useState } from "react";
import axios from "axios";
import FlowDetails from "./FlowDetails";
import ExerciseCard from "../ExerciseCard";

import DeleteRoutineBtn from "../buttons/DeleteRoutineBtn";

const RoutineDetails = (props) => {
  const {
    routines,
    filteredFlows,
    handleExerciseClick,
    handleDeleteFlow,
    handleDeleteRoutine,
    handleFavoritedRoutineClick,
    handleUnlikeRoutine,
    isAuthenticated,
    userRoutineIds,
    exerciseCompletion,
  } = props;
  const { id } = useParams();

  const [routineDetails, setRoutineDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlowDetails() {
      try {
        setLoading(true); // Set loading to true when the fetch starts
        const response = await axios.get(
          `https://health-app-wfed.onrender.com/api/routines/${id}`
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

  const isSaved = userRoutineIds.includes(routineDetails.id);
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
                <UnsaveBtn
                  handleUnlikeFlow={handleUnlikeRoutine}
                  id={routineDetails.id}
                />
              ) : (
                <SaveBtn
                  handleFavoritedClick={handleFavoritedRoutineClick}
                  id={routineDetails.id}
                />
              )}
            </div>

            {isCompleted && (
              <DeleteRoutineBtn
                handleDeleteRoutine={handleDeleteRoutine}
                id={routineDetails.id}
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {isCompleted && (
            <DeleteRoutineBtn
              handleDeleteRoutine={handleDeleteRoutine}
              id={routineDetails.id}
            />
          )}
        </div>
      )}

      <div className="flow-poses-details">
        {routineDetails.routine_poses.map((exercise, idx) => {
          const isCompleted = exerciseCompletion[routineDetails.id]?.[idx];
          return (
            <ExerciseCard
              key={idx}
              exercise={exercise}
              poseNum={idx + 1}
              isCompleted={isCompleted}
              onClick={() => handleExerciseClick(routineDetails.id, idx)}
              exerciseId={exercise.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default RoutineDetails;
