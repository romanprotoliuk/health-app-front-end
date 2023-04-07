import { useState } from "react";
import BackBtn from "../buttons/BackBtn";
import ClearAll from "../buttons/ClearAllBtn";
import { generateRandomNumbers } from "../../utils/helper";

const Poses = (props) => {
  const {
    poses,
    selectedPoses,
    setSelectedPoses,
    handlePoseClickNewFlow,
    setAllCustomFlows,
    allCustomFlows,
  } = props;
  const [customFlowTitle, setCustomFlowTitle] = useState("");
  const [customFlowDescription, setCustomFlowDescription] = useState("");
  const [poseSearch, setPoseSearch] = useState("");
  const [generatedId, setGeneratedId] = useState(null);

  const handleChange = (e) => {
    setPoseSearch(e.target.value);
  };

  const handleCustomFlowSubmit = (e) => {
    e.preventDefault();

    const newGeneratedId = generateRandomNumbers();
    setGeneratedId(newGeneratedId);

    const customFlow = {
      sequence_name: customFlowTitle,
      sequence_poses: selectedPoses,
      description: customFlowDescription,
      id: newGeneratedId,
    };
    setAllCustomFlows((prevFlows) => [...prevFlows, customFlow]);
    setSelectedPoses([]);
    setCustomFlowTitle("");
    setCustomFlowDescription("");
    localStorage.setItem(
      "customFlows",
      JSON.stringify([...allCustomFlows, customFlow])
    );
    console.log({ customFlow });
  };

  const getFilteredPoses = () => {
    let newSearchTerm = poseSearch.toLowerCase();
    return poses.filter((v) => {
      let lowerCaseName = v.pose_name.toLowerCase();
      return lowerCaseName.includes(newSearchTerm);
    });
  };

  const limitReached = selectedPoses.length === 20;
  const filteredPoses = getFilteredPoses();

  const handleClearAllPoses = () => {
    setSelectedPoses([]);
    localStorage.removeItem("selectedPoses");
  };

  return (
    <>
      <BackBtn />
      <ClearAll handleClearAllPoses={handleClearAllPoses} />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h3>Create Custom Flow</h3>
          <form onSubmit={handleCustomFlowSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title">Flow Title:</label>
              <input
                type="text"
                id="title"
                value={customFlowTitle}
                onChange={(e) => setCustomFlowTitle(e.target.value)}
                required
              />

              <label htmlFor="description">Flow Description:</label>
              <textarea
                id="description"
                value={customFlowDescription}
                onChange={(e) => setCustomFlowDescription(e.target.value)}
                required
                style={{ height: "100px", resize: "none" }}
              />
            </div>
            <div>Selected Poses:</div>
            {selectedPoses.map((pose) => (
              <p key={pose.id}>{pose.pose_name}</p>
            ))}
            <button type="submit">Create Flow</button>
          </form>
        </div>
        <div style={{ flex: 1 }}>
          {/* <h3>Poses</h3> */}
          {limitReached && (
            <p style={{ color: "darkred" }}>
              You have reached the limit of 20 poses
            </p>
          )}
          <input
            className="searchInput"
            placeholder="Search for poses"
            type="text"
            onChange={handleChange}
            value={poseSearch}
            style={{ marginBottom: "20px" }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "10px",
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            {filteredPoses.map((pose) => {
              const isCompleted = selectedPoses.some(
                (flow) => flow.id === pose.id
              );

              return (
                <div
                  key={pose.id}
                  style={
                    isCompleted
                      ? { border: "2px solid green", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => handlePoseClickNewFlow(pose.id)}
                >
                  <img
                    src={pose.image_url}
                    alt={pose.pose_name}
                    style={{ height: "100px" }}
                  />
                  <div>{pose.pose_name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Poses;
