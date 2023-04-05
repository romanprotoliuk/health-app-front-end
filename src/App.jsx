import "./App.css";

// Components
import Yoga from "./components/Yoga";
import GridPoses from "./components/pages/GridPoses";
import FlowDetails from "./components/pages/FlowDetails";
import Favorites from "./components/pages/Favorites";
import Poses from "./components/pages/Poses";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Profile from "./components/pages/Profile";
import LoadingSpinner from "./components/LoadingSpinner";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { magic } from "./utils/magic";

const App = () => {
  const [flows, setFlows] = useState([]);
  const [poses, setPoses] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userMetadata, setUserMetadata] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [allCustomFlows, setAllCustomFlows] = useState([]);

  const [poseCompletion, setPoseCompletion] = useState(
    JSON.parse(localStorage.getItem("poseCompletion")) || {}
  );
  const [favoritedFlows, setFavoritedFlows] = useState(
    JSON.parse(localStorage.getItem("likedFlows")) || []
  );
  const [selectedPoses, setSelectedPoses] = useState(
    JSON.parse(localStorage.getItem("selectedPoses")) || []
  );

  const navigate = useNavigate();

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

  useEffect(() => {
    localStorage.setItem("selectedPoses", JSON.stringify(selectedPoses));
  }, [selectedPoses]);

  useEffect(() => {
    const customFlows = JSON.parse(localStorage.getItem("customFlows")) || [];
    setAllCustomFlows(customFlows);
  }, []);

  const login = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      const user = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
      setIsAuthenticated(true);
      setUserData(user);
      navigate("/");
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        setIsAuthenticated(magicIsLoggedIn);
        magic.user.getMetadata().then((userMetadata) => {
          setUserMetadata(userMetadata);
          setIsRegistered(Boolean(userMetadata?.email));
          localStorage.setItem("userMetadata", JSON.stringify(userMetadata));
        });
      } else {
        // If no user is logged in, redirect to `/login`
        navigate("/login");
      }
    });
  }, [isAuthenticated]);

  // useEffect(() => {
  //   // On mount, we check if a user is logged in.
  //   // If so, we'll retrieve the authenticated user's profile.
  //   magic.user.isLoggedIn().then((magicIsLoggedIn) => {
  //     if (magicIsLoggedIn) {
  //       setIsAuthenticated(magicIsLoggedIn);
  //       magic.user.getMetadata().then(setUserMetadata);
  //       const userMetadata = magic.user.getMetadata();
  //       setIsRegistered(Boolean(userMetadata?.email));
  //     } else {
  //       // If no user is logged in, redirect to `/login`
  //       navigate("/login");
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   // Check if the user is authenticated
  //   const isLoggedIn = magic.user.isLoggedIn();
  //   setIsAuthenticated(isLoggedIn);

  //   // Check if the user has completed registration
  //   const userMetadata = JSON.parse(localStorage.getItem("userMetadata"));
  //   setIsRegistered(Boolean(userMetadata?.email));
  // }, []);

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

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      localStorage.removeItem("userMetadata");
      setIsAuthenticated(false);
      navigate("/login");
    });
  }, [navigate]);

  console.log(Boolean(userMetadata));
  console.log({ isAuthenticated });
  console.log({ isRegistered });

  if (isLoading) {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }

  return (
    <div className="App">
      <Navbar logout={logout} isRegistered={isRegistered} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              userData={userData}
              setUserData={setUserData}
              setIsAuthenticated={setIsAuthenticated}
              setIsRegistered={setIsRegistered}
              setEmail={setEmail}
              isLoggingIn={isLoggingIn}
              login={login}
            />
          }
        />

        <Route path="/callback" element={<Callback />} />

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
          element={
            <Favorites
              favoritedFlows={favoritedFlows}
              flows={flows}
              allCustomFlows={allCustomFlows}
            />
          }
        />

        <Route
          path="/poses"
          element={
            <Poses
              poses={poses}
              selectedPoses={selectedPoses}
              setSelectedPoses={setSelectedPoses}
              handlePoseClickNewFlow={handlePoseClickNewFlow}
              setAllCustomFlows={setAllCustomFlows}
              allCustomFlows={allCustomFlows}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              userMetadata={userMetadata}
              setUserMetadata={setUserMetadata}
              isAuthenticated={isAuthenticated}
              isRegistered={isRegistered}
              setIsAuthenticated={setIsAuthenticated}
              setIsRegistered={setIsRegistered}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
