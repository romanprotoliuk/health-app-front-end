const PoseCard = (props) => {
  const { pose, poseNum, isCompleted, onClick } = props;
  return (
    <div
      className="pose-card"
      onClick={onClick}
      style={isCompleted ? { border: "2px solid green" } : {}}
    >
      <img className="pose-image" src={pose.image_url} alt={pose.pose_name} />
      <p>{poseNum}</p>
      <h3 className="pose-name">{pose.pose_name}</h3>
      <p>{isCompleted ? " (Completed)" : ""}</p>
    </div>
  );
};

export default PoseCard;
