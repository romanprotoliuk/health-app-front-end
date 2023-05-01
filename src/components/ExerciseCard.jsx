import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ExerciseCard = (props) => {
  const { exercise, poseNum, isCompleted, onClick, isFromPose } = props;

  console.log("completedExercise", isCompleted);

  return (
    <div
      className="flow-card-details"
      onClick={onClick}
      style={
        isCompleted
          ? { border: "2px solid rgb(40, 112, 163)" }
          : { cursor: "pointer" }
      }
    >
      <div
        className="pose-image"
        style={{ backgroundImage: `url(${exercise.image_url})` }}
      />
      <p style={{ fontSize: "10px" }}>{poseNum}</p>
      <h3 className="pose-name">{exercise.exercise_name}</h3>
      <p style={{ fontSize: "10px" }}>{exercise?.repetitions}</p>
      {isCompleted && <CheckMark isFromPose={isFromPose} />}
      {/* <p>{isCompleted ? " (Completed)" : ""}</p> */}
    </div>
  );
};

export default ExerciseCard;

const CheckMark = ({ isFromPose }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {!isFromPose && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          style={{
            fontSize: "0.8rem",
            opacity: "0.7",
            color: "#43E44B",
          }}
        />
      )}
    </div>
  );
};
