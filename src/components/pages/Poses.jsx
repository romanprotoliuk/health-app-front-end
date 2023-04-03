import { useState } from "react";
import BackBtn from "../BackBtn";

const Poses = (props) => {
  const { poses } = props;
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [customFlowTitle, setCustomFlowTitle] = useState("");
  const [poseSearch, setPoseSearch] = useState("");

  const handlePoseClick = (pose) => {
    if (selectedPoses.includes(pose)) {
      setSelectedPoses(selectedPoses.filter((p) => p !== pose));
    } else if (selectedPoses.length < 20) {
      setSelectedPoses([...selectedPoses, pose]);
    }
  };

  const handleChange = (e) => {
    setPoseSearch(e.target.value);
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

  const getFilteredPoses = () => {
    let newSearchTerm = poseSearch.toLowerCase();
    return poses.filter((v) => {
      let lowerCaseName = v.pose_name.toLowerCase();
      return lowerCaseName.includes(newSearchTerm);
    });
  };

  const limitReached = selectedPoses.length === 20;

  return (
    <>
      <BackBtn />
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
            {getFilteredPoses().map((pose) => (
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
    </>
  );
};

export default Poses;
