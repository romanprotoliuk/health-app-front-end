import { useState } from "react";
import PoseCard from "../PoseCard";

const Poses = (props) => {
  const { poses } = props;
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [customFlowTitle, setCustomFlowTitle] = useState("");

  const handlePoseClick = (pose) => {
    if (selectedPoses.length < 20 && !selectedPoses.includes(pose)) {
      setSelectedPoses([...selectedPoses, pose]);
    }
  };

  const handleCustomFlowSubmit = (e) => {
    e.preventDefault();
    const customFlow = {
      title: customFlowTitle,
      poses: selectedPoses,
    };
    console.log(customFlow); // do API POST request here
    setSelectedPoses([]);
    setCustomFlowTitle("");
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h3>Create Custom Flow</h3>
        <form onSubmit={handleCustomFlowSubmit}>
          <label htmlFor="title">Flow Title:</label>
          <input
            type="text"
            id="title"
            value={customFlowTitle}
            onChange={(e) => setCustomFlowTitle(e.target.value)}
            required
          />
          <div>Selected Poses:</div>
          {selectedPoses.map((pose) => (
            <p key={pose.id}>{pose.pose_name}</p>
          ))}
          <button type="submit">Create Flow</button>
        </form>
      </div>
      <div style={{ flex: 1 }}>
        <h3>Poses</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "10px",
          }}
        >
          {poses.map((pose) => (
            <div
              key={pose.id}
              style={{
                border: selectedPoses.includes(pose)
                  ? "2px solid green"
                  : "none",
              }}
              onClick={() => handlePoseClick(pose)}
            >
              <img
                src={pose.image_url}
                alt={pose.pose_name}
                style={{ height: "100px" }}
              />
              <div>{pose.pose_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Poses;
