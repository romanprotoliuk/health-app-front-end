import { useState, useEffect } from "react";
import axios from "axios";

const Yoga = () => {
  const [flows, setFlows] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const posesResponse = await axios.get("http://localhost:8000/api/poses/");
      const flowsResponse = await axios.get("http://localhost:8000/api/flows/");

      // Group poses by pose_name for efficient lookup
      const posesByPoseName = posesResponse.data.reduce((acc, pose) => {
        acc[pose.pose_name] = pose;
        return acc;
      }, {});

      // Restructure flows data to include poses data
      const flowsWithPosesData = flowsResponse.data.map((flow) => {
        const poseNames = flow.sequence_poses.split(",");
        const sequencePoses = poseNames.map((poseName) => {
          const pose = posesByPoseName[poseName.trim()];
          return pose
            ? { pose_name: pose.pose_name, image_url: pose.image_url }
            : null;
        });
        return {
          ...flow,
          sequence_poses: sequencePoses.filter((pose) => pose !== null),
          showPoses: false,
        };
      });

      setFlows(flowsWithPosesData);
      setFilteredFlows(flowsWithPosesData);
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     // Filter flows based on both difficulty and bodyParts filters
  //     const filtered = flows.filter(
  //       (flow) =>
  //         flow.level.split(",").includes(difficultyFilter) &&
  //         (bodyPartsFilter === "" ||
  //           flow.targets.split(",").includes(bodyPartsFilter))
  //     );
  //     setFilteredFlows(filtered);
  //   }, [difficultyFilter, bodyPartsFilter, flows]);

  useEffect(() => {
    // Filter flows based on bodyParts filter and difficulty filter
    const filtered = flows.filter(
      (flow) =>
        (difficultyFilter === "" ||
          flow.level.split(",").includes(difficultyFilter)) &&
        (bodyPartsFilter === "" ||
          flow.targets.split(",").includes(bodyPartsFilter))
    );
    setFilteredFlows(filtered);
  }, [bodyPartsFilter, difficultyFilter, flows]);

  const handleShow = (flowId) => {
    setFlows((prevFlows) => {
      const updatedFlows = prevFlows.map((flow) => {
        if (flow.id === flowId) {
          return { ...flow, showPoses: !flow.showPoses };
        }
        return flow;
      });
      return updatedFlows;
    });
  };

  const handleSelectDifficulty = (event) => {
    setDifficultyFilter(event.target.value);
  };

  const handleSelectBodyParts = (event) => {
    setBodyPartsFilter(event.target.value);
  };

  const renderCards = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).map((flow) => {
    return (
      <div key={flow.id} className="flow-card">
        <h2>{flow.sequence_name}</h2>
        <p className="flow-description">{flow.description}</p>
        <p className="flow-description">{flow.level}</p>
        <p className="flow-description">{flow.targets}</p>
        <p className="flow-description">{flow.benefits}</p>
        <button onClick={() => handleShow(flow.id)}>
          {flow.showPoses ? "Hide" : "Show"}
        </button>
        {flow.showPoses && (
          <div className="flow-poses">
            {flow.sequence_poses.map((pose, idx) => {
              return (
                <div key={idx} className="pose-card">
                  <img
                    className="pose-image"
                    src={pose.image_url}
                    alt={pose.pose_name}
                  />
                  <h3 className="pose-name">{pose.pose_name}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  const bodyParts = [
    "Lower body",
    "Spine",
    "Arms",
    "Lower torso",
    "Legs",
    "Core",
    "Abdominals",
    "Obliques",
    "Hamstrings",
    "Lower back",
    "Hips",
    "Upper Body",
    "Upper Legs",
    "Back",
    "Shoulders",
  ];

  return (
    <div className="yoga-app-container">
      <h1>Yoga App</h1>
      <div className="filter-container">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficultyFilter}
          onChange={handleSelectDifficulty}
        >
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label htmlFor="bodyParts">Body parts:</label>
        <select
          id="bodyParts"
          value={bodyPartsFilter}
          onChange={handleSelectBodyParts}
        >
          <option value="">All</option>
          {bodyParts.map((parts) => (
            <option value={parts} key={parts}>
              {parts}
            </option>
          ))}
        </select>
      </div>
      <div className="flow-container">{renderCards}</div>
    </div>
  );
};

export default Yoga;

// "Lower body", "Spine", "Arms", "Lower torso", "Legs", "Core", "Abdominals", "Obliques", "Hamstrings", "Lower back", "Hips", "Upper Body", "Upper Legs", "Back", "Shoulders"
