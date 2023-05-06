import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const PoseCard = (props) => {
  const { pose, poseNum, isCompleted, onClick, isFromPose } = props;

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
        style={{ backgroundImage: `url(${pose.image_url})` }}
      />
      <p style={{ fontSize: "10px" }}>{poseNum}</p>
      <h3 className="pose-name">{pose?.pose_name}</h3>
      <h3 className="pose-name">{pose?.exercise_name}</h3>
      <p style={{ fontSize: "10px" }}>{pose?.repetitions}</p>
      {isCompleted && <CheckMark isFromPose={isFromPose} />}
    </div>
  );
};

export default PoseCard;

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
