import { useState } from "react";
import BackBtn from "../BackBtn";

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
  const [poseSearch, setPoseSearch] = useState("");

  const handleChange = (e) => {
    setPoseSearch(e.target.value);
  };

  const handleCustomFlowSubmit = (e) => {
    e.preventDefault();
    const customFlow = {
      title: customFlowTitle,
      poses: selectedPoses,
    };
    setAllCustomFlows((prevFlows) => [...prevFlows, customFlow]);
    setSelectedPoses([]);
    setCustomFlowTitle("");
    localStorage.setItem(
      "customFlows",
      JSON.stringify([...allCustomFlows, customFlow])
    );
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
      <button onClick={handleClearAllPoses}>Clear All</button>
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
                  style={{
                    border: isCompleted ? "2px solid green" : "none",
                  }}
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
