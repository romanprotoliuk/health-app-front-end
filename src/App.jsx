import { useEffect, useState, useCallback, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { supabase } from "./utils/supabase";
import { redirect } from "react-router-dom";
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
import GridRoutines from "./components/pages/GridRoutines";
import Exercises from "./components/pages/Exercises";
import RoutineDetailsCustom from "./components/pages/RoutineDetailsCustom";
import RoutineDetails from "./components/pages/RoutineDetails";

import { fetchData } from "./utils/helper";

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [flows, setFlows] = useState([]);
  const [poses, setPoses] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [bodyPartsFilter, setBodyPartsFilter] = useState("");
  const [isSavedCompleted, setIsSavedCompleted] = useState(false);
  const [allCustomFlows, setAllCustomFlows] = useState([]);
  const [allCustomRoutines, setAllCustomRoutines] = useState([]);
  const [userSub, setUserSub] = useState(null);
  const [userFlowIds, setUserFlowIds] = useState([]);
  const [userRoutineIds, setUserRoutineIds] = useState([]);
  const [favoritedFlows, setFavoritedFlows] = useState([]);
  const [favoritedRoutines, setFavoritedRoutines] = useState([]);
  const [idsForAll, setIdsForAll] = useState([]);
  const [idsForAllExercises, setIdsForAllExercises] = useState([]);
  const [customUserFlows, setCustomUserFlows] = useState([]);
  const [customUserRoutines, setCustomUserRoutines] = useState([]);
  const [poseCompletion, setPoseCompletion] = useState(
    JSON.parse(localStorage.getItem("poseCompletion")) || {}
  );
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  console.log({ poses });
  console.log({ flows });
  console.log({ exercises });
  console.log({ routines });
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

  const handlePoseClickNewRoutine = (poseId) => {
    setSelectedExercises((prevSelectedExercises) => {
      const isPoseAlreadySelected = prevSelectedExercises.some(
        (p) => p.id === poseId
      );

      if (isPoseAlreadySelected) {
        return prevSelectedExercises.filter((p) => p.id !== poseId);
      } else if (prevSelectedExercises.length < 20) {
        const newExercise = exercises.find((p) => p.id === poseId);
        return [...prevSelectedExercises, newExercise];
      } else {
        return prevSelectedExercises;
      }
    });
    const idsForAllExercises = selectedExercises.map((exercise) => exercise.id);
    setIdsForAllExercises(idsForAllExercises);
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
    fetchData(setFlows, setPoses, userSub, setRoutines, setExercises);
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

  // useEffect(() => {
  //   // Filter flows based on bodyParts filter and difficulty filter
  //   const filtered = flows.filter(
  //     (flow) =>
  //       (difficultyFilter === "" ||
  //         flow.level.split(",").includes(difficultyFilter)) &&
  //       (bodyPartsFilter === "" ||
  //         flow.targets.split(",").includes(bodyPartsFilter))
  //   );
  //   setFilteredFlows(filtered);
  // }, [bodyPartsFilter, difficultyFilter, flows]);

  useEffect(() => {
    localStorage.setItem("poseCompletion", JSON.stringify(poseCompletion));
  }, [poseCompletion]);

  useEffect(() => {
    localStorage.setItem("selectedPoses", JSON.stringify(selectedPoses));
  }, [selectedPoses]);

  useEffect(() => {
    localStorage.setItem(
      "selectedExercises",
      JSON.stringify(selectedExercises)
    );
  }, [selectedExercises]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const { data } = await supabase.from("chat_rooms").select("*");
        setChatRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatRooms();
  }, []);

  const registerUserInSupabase = useCallback(async () => {
    if (isAuthenticated && user) {
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

        // console.log("User successfully registered in Supabase!");
      } else {
        // console.log("User is already registered in Supabase");
      }
    } else {
      // console.log("User is not authenticated");
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
    const customRoutines =
      JSON.parse(localStorage.getItem("customRoutines")) || [];
    setAllCustomFlows(customRoutines);
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

  const handleFavoritedRoutineClick = async (flowId) => {
    try {
      const { error } = await supabase
        .from("users_routines_new ")
        .insert([{ auth0_id: userSub, routine_id: flowId }]);

      if (error) {
        throw error;
      }

      setUserRoutineIds([...userRoutineIds, flowId]);
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

  const handleUnlikeRoutine = async (flowId) => {
    try {
      const { error } = await supabase
        .from("users_routines_new ")
        .delete()
        .eq("auth0_id", userSub)
        .eq("routine_id", flowId);

      if (error) {
        throw error;
      }

      setUserRoutineIds(userRoutineIds.filter((id) => id !== flowId));
    } catch (error) {
      console.error(error);
    }
  };

  // CREATE TABLE users_routines_new (
  //   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  //   auth0_id text references users(auth0_id),
  //   routine_id integer,
  //   created_at timestamp with time zone default now(),
  //   updated_at timestamp with time zone default now()
  // );

  const handleDeleteCustomFlow = async (id) => {
    <Navigate replace to="/favorites" />;
    try {
      const { error } = await supabase
        .from("sequences")
        .delete()
        .eq("id", id)
        .eq("auth0_id", userSub);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCustomRoutine = async (id) => {
    <Navigate replace to="/favorites" />;
    try {
      const { error } = await supabase
        .from("customroutines")
        .delete()
        .eq("id", id)
        .eq("auth0_id", userSub);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
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
              user={user}
              isAuthenticated={isAuthenticated}
              chatRooms={chatRooms}
            />
          }
        />
        <Route
          path="/routines"
          element={
            <GridRoutines
              routines={routines}
              // filteredFlows={filteredFlows}
              // difficultyFilter={difficultyFilter}
              // bodyPartsFilter={bodyPartsFilter}
              handleSelectDifficulty={handleSelectDifficulty}
              handleSelectBodyParts={handleSelectBodyParts}
              user={user}
              isAuthenticated={isAuthenticated}
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
          path="/routine/:id"
          element={
            <RoutineDetails
              routines={routines}
              filteredFlows={filteredFlows}
              handlePoseClick={handlePoseClick}
              poseCompletion={poseCompletion}
              setPoseCompletion={setPoseCompletion}
              handleDeleteFlow={handleDeleteFlow}
              handleFavoritedRoutineClick={handleFavoritedRoutineClick}
              handleUnlikeRoutine={handleUnlikeRoutine}
              favoritedFlows={favoritedFlows}
              isSavedCompleted={isSavedCompleted}
              setIsSavedCompleted={setIsSavedCompleted}
              isAuthenticated={isAuthenticated}
              userRoutineIds={userRoutineIds}
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
                handleDeleteCustomFlow={handleDeleteCustomFlow}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/routines/:id"
          element={
            isAuthenticated ? (
              <RoutineDetailsCustom
                handlePoseClick={handlePoseClick}
                poseCompletion={poseCompletion}
                handleDeleteFlow={handleDeleteFlow}
                isAuthenticated={isAuthenticated}
                customUserFlows={customUserRoutines}
                handleDeleteCustomFlow={handleDeleteCustomRoutine}
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
                routines={routines}
                favoritedFlows={favoritedFlows}
                flows={flows}
                allCustomFlows={allCustomFlows}
                userSub={userSub}
                setFavoritedFlows={setFavoritedFlows}
                favoritedRoutines={favoritedRoutines}
                setFavoritedRoutines={setFavoritedRoutines}
                userFlowIds={userFlowIds}
                setUserFlowIds={setUserFlowIds}
                setUserRoutineIds={setUserRoutineIds}
                customUserFlows={customUserFlows}
                setCustomUserFlows={setCustomUserFlows}
                exercises={exercises}
                setCustomUserRoutines={setCustomUserRoutines}
                customUserRoutines={customUserRoutines}
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
        <Route
          path="/exercises"
          element={
            isAuthenticated ? (
              <Exercises
                exercises={exercises}
                // selectedPoses={selectedPoses}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                // setSelectedPoses={setSelectedPoses}
                handlePoseClickNewRoutine={handlePoseClickNewRoutine}
                setAllCustomRoutines={setAllCustomRoutines}
                // setAllCustomFlows={setAllCustomFlows}
                // allCustomFlows={allCustomFlows}
                allCustomRoutines={allCustomRoutines}
                userSub={userSub}
              />
            ) : (
              <Login />
            )
          }
        />

        {/* Exercises */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
