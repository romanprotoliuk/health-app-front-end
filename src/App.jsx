import { useEffect, useState, useCallback, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { supabase } from "./utils/supabase";
import "./App.css";

// Components
import GridPoses from "./components/pages/GridPoses";
import FlowDetails from "./components/pages/FlowDetails";
import Favorites from "./components/pages/Favorites";
import Poses from "./components/pages/Poses";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import FlowDetailsCustom from "./components/pages/FlowDetailsCustom";
import Menu from "./components/Menu/Menu";
import About from "./components/pages/About";

import { getUserFlows } from "./utils/helper";
import { fetchData } from "./utils/helper";
import { getMatchingFlows } from "./utils/helper";
import { convertPosesToIds } from "./utils/helper";

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [flows, setFlows] = useState([]);
  const [poses, setPoses] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");
  const [isSavedCompleted, setIsSavedCompleted] = useState(false);
  const [allCustomFlows, setAllCustomFlows] = useState([]);
  const [userSub, setUserSub] = useState(null);
  const [userFlowIds, setUserFlowIds] = useState([]);
  const [favoritedFlows, setFavoritedFlows] = useState([]);
  const [idsForAll, setIdsForAll] = useState([]);
  const [customUserFlows, setCustomUserFlows] = useState([]);
  const [poseCompletion, setPoseCompletion] = useState(
    JSON.parse(localStorage.getItem("poseCompletion")) || {}
  );
  const [selectedPoses, setSelectedPoses] = useState([]);

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

  const handlePoseClickNewFlow = (poseId) => {
    setSelectedPoses((prevSelectedPoses) => {
      const isPoseAlreadySelected = prevSelectedPoses.some(
        (p) => p.id === poseId
      );

      if (isPoseAlreadySelected) {
        return prevSelectedPoses.filter((p) => p.id !== poseId);
      } else if (prevSelectedPoses.length < 20) {
        const newPose = poses.find((p) => p.id === poseId);
        return [...prevSelectedPoses, newPose];
      } else {
        return prevSelectedPoses;
      }
    });
    const idsForAllPoses = selectedPoses.map((pose) => pose.id);
    setIdsForAll(idsForAllPoses);
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
    fetchData(setFlows, setPoses, userSub);
  }, [poseCompletion]);

  const posesByPoseName = useMemo(() => {
    return poses.reduce((acc, pose) => {
      acc[pose.pose_name] = pose;
      return acc;
    }, {});
  }, [poses]);

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
    localStorage.setItem("selectedPoses", JSON.stringify(selectedPoses));
  }, [selectedPoses]);

  const registerUserInSupabase = useCallback(async () => {
    if (isAuthenticated && user) {
      console.log("User is authenticated:", user);

      // Check if the user is already registered in Supabase
      const { sub, email } = user;
      setUserSub(sub);
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth0_id", sub);

      if (error) {
        console.error("Error fetching user from Supabase:", error);
        return;
      }

      // If user is not already registered, insert their information into the "users" table
      if (users.length === 0) {
        const { error } = await supabase.from("users").insert([
          {
            auth0_id: sub,
            email,
            name: user.name,
            picture: user.picture,
          },
        ]);

        if (error) {
          console.error("Error registering user in Supabase:", error);
          return;
        }

        console.log("User successfully registered in Supabase!");
      } else {
        console.log("User is already registered in Supabase");
      }
    } else {
      console.log("User is not authenticated");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    registerUserInSupabase();
  }, [registerUserInSupabase]);
  useEffect(() => {
    const customFlows = JSON.parse(localStorage.getItem("customFlows")) || [];
    setAllCustomFlows(customFlows);
  }, []);

  const handleFavoritedClick = async (flowId) => {
    try {
      const { error } = await supabase
        .from("users_flows_new")
        .insert([{ auth0_id: userSub, flow_id: flowId }]);

      if (error) {
        throw error;
      }

      setUserFlowIds([...userFlowIds, flowId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikeFlow = async (flowId) => {
    try {
      const { error } = await supabase
        .from("users_flows_new")
        .delete()
        .eq("auth0_id", userSub)
        .eq("flow_id", flowId);

      if (error) {
        throw error;
      }

      setUserFlowIds(userFlowIds.filter((id) => id !== flowId));
    } catch (error) {
      console.error(error);
    }
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
      <Menu isAuthenticated={isAuthenticated} setUserSub={setUserSub} />
      <Navbar isAuthenticated={isAuthenticated} setUserSub={setUserSub} />
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
        <Route path="/about" element={<About />} />
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
              isSavedCompleted={isSavedCompleted}
              setIsSavedCompleted={setIsSavedCompleted}
              isAuthenticated={isAuthenticated}
              userFlowIds={userFlowIds}
            />
          }
        />
        <Route
          path="/flows/:id"
          element={
            isAuthenticated ? (
              <FlowDetailsCustom
                handlePoseClick={handlePoseClick}
                poseCompletion={poseCompletion}
                handleDeleteFlow={handleDeleteFlow}
                isAuthenticated={isAuthenticated}
                customUserFlows={customUserFlows}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/favorites"
          element={
            isAuthenticated ? (
              <Favorites
                poses={poses}
                favoritedFlows={favoritedFlows}
                flows={flows}
                allCustomFlows={allCustomFlows}
                userSub={userSub}
                setFavoritedFlows={setFavoritedFlows}
                userFlowIds={userFlowIds}
                setUserFlowIds={setUserFlowIds}
                customUserFlows={customUserFlows}
                setCustomUserFlows={setCustomUserFlows}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/poses"
          element={
            isAuthenticated ? (
              <Poses
                poses={poses}
                selectedPoses={selectedPoses}
                setSelectedPoses={setSelectedPoses}
                handlePoseClickNewFlow={handlePoseClickNewFlow}
                setAllCustomFlows={setAllCustomFlows}
                allCustomFlows={allCustomFlows}
                userSub={userSub}
              />
            ) : (
              <Login />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
