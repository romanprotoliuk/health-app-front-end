import "./App.css";

// Components
import Header from "./components/Header";
import Yoga from "./components/Yoga";
import GridPoses from "./components/pages/GridPoses";
import FlowDetails from "./components/pages/FlowDetails";
import Favorites from "./components/Favorites";
import Poses from "./components/pages/Poses";
import Navbar from "./components/Navbar";

import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

import { Link } from "react-router-dom";

const App = () => {
  const [flows, setFlows] = useState([]);
  const [poses, setPoses] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");
  const [poseCompletion, setPoseCompletion] = useState(
    JSON.parse(localStorage.getItem("poseCompletion")) || {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [favoritedFlows, setFavoritedFlows] = useState(
    JSON.parse(localStorage.getItem("likedFlows")) || []
  );

  const handlePoseClick = (flowId, poseId) => {
    setPoseCompletion((prevPoseCompletion) => {
      const updatedPoseCompletion = { ...prevPoseCompletion };
      if (!updatedPoseCompletion[flowId]) {
        updatedPoseCompletion[flowId] = {};
      }
      updatedPoseCompletion[flowId][poseId] = true;
      localStorage.setItem(
        "poseCompletion",
        JSON.stringify(updatedPoseCompletion)
      );
      return updatedPoseCompletion;
    });
  };

  const handleDeleteFlow = (flowId) => {
    setPoseCompletion((prevPoseCompletion) => {
      const updatedPoseCompletion = { ...prevPoseCompletion };
      delete updatedPoseCompletion[flowId];
      localStorage.setItem(
        "poseCompletion",
        JSON.stringify(updatedPoseCompletion)
      );
      return updatedPoseCompletion;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [posesResponse, flowsResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/poses/"),
          axios.get("http://localhost:8000/api/flows/"),
        ]);

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
        setPoses(posesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
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

  useEffect(() => {
    localStorage.setItem("poseCompletion", JSON.stringify(poseCompletion));
  }, [poseCompletion]);

  useEffect(() => {
    const storedLikedFlows =
      JSON.parse(localStorage.getItem("likedFlows")) || [];
    setFavoritedFlows(storedLikedFlows);
  }, []);

  // Update localStorage whenever favoritedFlows changes
  useEffect(() => {
    localStorage.setItem("likedFlows", JSON.stringify(favoritedFlows));
  }, [favoritedFlows]);

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

  const handleFavoritedClick = (flow) => {
    setFavoritedFlows((prevLikedFlows) => [...prevLikedFlows, flow]);
  };

  const handleUnlikeFlow = (flowId) => {
    setFavoritedFlows((prevLikedFlows) =>
      prevLikedFlows.filter((id) => id !== flowId)
    );
  };

  const handleSelectDifficulty = (event) => {
    setDifficultyFilter(event.target.value);
  };

  const handleSelectBodyParts = (event) => {
    setBodyPartsFilter(event.target.value);
  };

  if (isLoading) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }

  return (
    <div className="App">
      <Navbar />
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
              handleDeleteFlow={handleDeleteFlow}
              handleFavoritedClick={handleFavoritedClick}
              handleUnlikeFlow={handleUnlikeFlow}
              favoritedFlows={favoritedFlows}
            />
          }
        />

        <Route
          path="/favorites"
          element={<Favorites favoritedFlows={favoritedFlows} flows={flows} />}
        />

        <Route path="/poses" element={<Poses poses={poses} />} />
      </Routes>
    </div>
  );
};

export default App;
