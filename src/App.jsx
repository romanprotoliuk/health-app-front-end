import { useEffect, useState, useCallback, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
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

import { getUserFlows } from "./utils/helper";
import { fetchData } from "./utils/helper";
import { getMatchingFlows } from "./utils/helper";

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

  const [poseCompletion, setPoseCompletion] = useState(
    JSON.parse(localStorage.getItem("poseCompletion")) || {}
  );

  const [selectedPoses, setSelectedPoses] = useState(
    JSON.parse(localStorage.getItem("selectedPoses")) || []
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

    // const allFlows = getUserFlows(userSub);
    // console.log({ allFlows });
    // const matchingFlows = getMatchingFlows(allFlows, flows);
    // console.log({ matchingFlows });
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

  // useEffect(() => {
  //   const storedLikedFlows =
  //     JSON.parse(localStorage.getItem("likedFlows")) || [];
  //   setFavoritedFlows(storedLikedFlows);
  // }, []);

  // Update localStorage whenever favoritedFlows changes
  // useEffect(() => {
  //   localStorage.setItem("likedFlows", JSON.stringify(favoritedFlows));
  // }, [favoritedFlows]);

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

  useEffect(() => {
    // Do something when userFlowIds change
    console.log("userFlowIds changed:", userFlowIds);
  }, [userFlowIds]);

  // const handleShow = (flowId) => {
  //   setFlows((prevFlows) => {
  //     const updatedFlows = prevFlows.map((flow) => {
  //       if (flow.id === flowId) {
  //         return { ...flow, showPoses: !flow.showPoses };
  //       }
  //       return flow;
  //     });
  //     return updatedFlows;
  //   });
  // };

  // const { sub, email } = user;
  // console.log({ sub });

  const handleFavoritedClick = async (flow) => {
    setIsSavedCompleted(true);
    // setFavoritedFlows((prevLikedFlows) => [...prevLikedFlows, flow]);

    try {
      const { data, error } = await supabase
        .from("users_flows_new")
        .insert({ auth0_id: userSub, flow_id: flow });

      if (error) {
        throw error;
      }

      console.log("Flow saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikeFlow = async (flowId) => {
    // setFavoritedFlows((prevLikedFlows) =>
    //   prevLikedFlows.filter((id) => id !== flowId)
    // );

    try {
      const { data, error } = await supabase
        .from("users_flows_new")
        .delete()
        .eq("auth0_id", userSub)
        .eq("flow_id", flowId);

      if (error) {
        throw error;
      }

      console.log("Flow removed successfully");
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
          path="/favorites"
          element={
            isAuthenticated ? (
              <Favorites
                favoritedFlows={favoritedFlows}
                flows={flows}
                allCustomFlows={allCustomFlows}
                userSub={userSub}
                setFavoritedFlows={setFavoritedFlows}
                userFlowIds={userFlowIds}
                setUserFlowIds={setUserFlowIds}
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
