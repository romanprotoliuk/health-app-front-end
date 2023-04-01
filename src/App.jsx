import "./App.css";

// Components
import Header from "./components/Header";
import Yoga from "./components/Yoga";
import GridPoses from "./components/pages/GridPoses";
import FlowDetails from "./components/pages/FlowDetails";

import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

const App = () => {
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
          element={<FlowDetails flows={flows} filteredFlows={filteredFlows} />}
        />
      </Routes>
    </div>
  );
};

export default App;
