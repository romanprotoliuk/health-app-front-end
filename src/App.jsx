import "./App.css";

// Components
import Header from "./components/Header";
import Yoga from "./components/Yoga";
import GridPoses from "./components/pages/GridPoses";
import FlowDetails from "./components/pages/FlowDetails";

import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [flows, setFlows] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");
  const [poseCompletion, setPoseCompletion] = useState({});

  const handlePoseClick = (flowId, poseId) => {
    setPoseCompletion((prevPoseCompletion) => {
      const updatedPoseCompletion = { ...prevPoseCompletion };
      if (!updatedPoseCompletion[flowId]) {
        updatedPoseCompletion[flowId] = {};
      }
      updatedPoseCompletion[flowId][poseId] = true;
      return updatedPoseCompletion;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const posesResponse = await axios.get("http://localhost:8000/api/poses/");
      const flowsResponse = await axios.get("http://localhost:8000/api/flows/");

      // Group poses by pose_name for efficient lookup
      const posesByPoseName = posesResponse.data.reduce((acc, pose) => {
        acc[pose.pose_name] = pose;
        return acc;
      }, {});

      const flowsWithPosesData = flowsResponse.data.map((flow) => {
        const poseNames = flow.sequence_poses.split(",");
        const sequencePoses = poseNames.map((poseName) => {
          const pose = posesByPoseName[poseName.trim()];
          return pose
            ? {
                id: pose.id, // add id to each pose
                pose_name: pose.pose_name,
                image_url: pose.image_url,
                completed: false,
                flowId: flow.id, // add flowId to each pose
              }
            : null;
        });
        return {
          ...flow,
          sequence_poses: sequencePoses.filter((pose) => pose !== null),
          showPoses: false,
          posesCompleted: 0,
          flowId: flow.id,
        };
      });

      setFlows(flowsWithPosesData);
    };
    fetchData();
  }, [poseCompletion]);

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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <GridPoses
              flows={flows}
              filteredFlows={filteredFlows}
              difficultyFilter={difficultyFilter}
              bodyPartsFilter={bodyPartsFilter}
              handleSelectDifficulty={handleSelectDifficulty}
              handleSelectBodyParts={handleSelectBodyParts}
            />
          }
        />
        <Route
          path="/yoga"
          element={
            <Yoga
              flows={flows}
              filteredFlows={filteredFlows}
              handleShow={handleShow}
              difficultyFilter={difficultyFilter}
              bodyPartsFilter={bodyPartsFilter}
              handleSelectDifficulty={handleSelectDifficulty}
              handleSelectBodyParts={handleSelectBodyParts}
            />
          }
        />
        <Route
          path="/flow/:id"
          element={
            <FlowDetails
              flows={flows}
              filteredFlows={filteredFlows}
              handlePoseClick={handlePoseClick}
              poseCompletion={poseCompletion}
              setPoseCompletion={setPoseCompletion}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
