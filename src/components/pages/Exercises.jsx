import { useState } from "react";

import BackBtn from "../buttons/BackBtn";
import ClearAll from "../buttons/ClearAllBtn";
import ExerciseCard from "../ExerciseCard";

import { generateRandomNumbers } from "../../utils/helper";
import { supabase } from "../../utils/supabase";
import CreateCustomFlow from "../buttons/CreateCustomFlow";
import Create from "../buttons/Create";

const Exercises = (props) => {
  const {
    exercises,
    // selectedPoses,
    selectedExercises,
    setSelectedExercises,
    // setSelectedPoses,
    // handlePoseClickNewFlow,
    handlePoseClickNewRoutine,
    // setAllCustomFlows,
    setAllCustomRoutines,
    // allCustomFlows,
    allCustomRoutines,
    userSub,
  } = props;
  const [customFlowTitle, setCustomFlowTitle] = useState("");
  const [customFlowDescription, setCustomFlowDescription] = useState("");
  const [poseSearch, setPoseSearch] = useState("");
  const [generatedId, setGeneratedId] = useState(null);
  const [createNewFlow, setCreateNewFlow] = useState(false);

  const handleCreateNewFlow = () => {
    setCreateNewFlow(true);
  };

  const handleChange = (e) => {
    setPoseSearch(e.target.value);
  };

  const handleCustomFlowSubmit = async (e) => {
    e.preventDefault();

    const newGeneratedId = generateRandomNumbers();
    setGeneratedId(newGeneratedId);

    const customRoutine = {
      routine_name: customFlowTitle,
      routine_exercises: selectedExercises.map((exercise) => exercise.id),
      description: customFlowDescription,
      id: newGeneratedId,
      auth0_id: userSub,
    };

    const { data, error } = await supabase
      .from("customroutines")
      .insert([customRoutine]);
    if (error) {
      console.log(error);
      return;
    }

    // setAllCustomFlows((prevFlows) => [...prevFlows, customFlow]);
    setAllCustomRoutines((prevRoutines) => [...prevRoutines, customRoutine]);
    setSelectedExercises([]);
    setCustomFlowTitle("");
    setCustomFlowDescription("");
    localStorage.setItem(
      "customRoutine",
      JSON.stringify([...allCustomRoutines, customRoutine])
    );
  };

  const getFilteredPoses = () => {
    let newSearchTerm = poseSearch.toLowerCase();
    return exercises.filter((v) => {
      let lowerCaseName = v.exercise_name.toLowerCase();
      return lowerCaseName.includes(newSearchTerm);
    });
  };

  const limitReached = selectedExercises.length === 20;
  const filteredPoses = getFilteredPoses();

  const handleClearAllPoses = () => {
    setSelectedExercises([]);
    localStorage.removeItem("selectedExercises");
  };

  return (
    <>
      <BackBtn />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "200px",
          margin: "0 auto",
        }}
      >
        {createNewFlow && selectedExercises.length !== 0 && (
          <ClearAll handleClearAllPoses={handleClearAllPoses} />
        )}

        {!createNewFlow && (
          <CreateCustomFlow
            handleCreateNewFlow={handleCreateNewFlow}
            customText="Create Custom Routine"
          />
        )}
      </div>

      {createNewFlow && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <form onSubmit={handleCustomFlowSubmit}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="title"
                  style={{
                    marginTop: "60px",
                    marginBottom: "15px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    color: "#00000080",
                  }}
                >
                  Routine Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={customFlowTitle}
                  onChange={(e) => setCustomFlowTitle(e.target.value)}
                  required
                  style={{
                    resize: "none",
                    width: "250px",
                    margin: "0 auto",
                    border: "none",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    padding: "10px 30px 10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
                    outline: "none",
                  }}
                />

                <label
                  htmlFor="description"
                  style={{
                    marginTop: "20px",
                    marginBottom: "15px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    color: "#00000080",
                  }}
                >
                  Routine Description:
                </label>
                <textarea
                  id="description"
                  value={customFlowDescription}
                  onChange={(e) => setCustomFlowDescription(e.target.value)}
                  required
                  style={{
                    height: "100px",
                    resize: "none",
                    width: "250px",
                    margin: "0 auto",
                    border: "none",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    padding: "10px 30px 10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
                    outline: "none",
                  }}
                />
              </div>
              <p
                style={{
                  marginTop: "20px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  color: "#00000080",
                }}
              >
                Selected Exercises:
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {selectedExercises.map((exercise) => (
                  <div
                    className="flow-description"
                    style={{
                      padding: "1px 6px",
                      border: "1px solid #2870A3",
                      borderRadius: "50px",
                      margin: "2px",
                    }}
                  >
                    <div>
                      <p
                        key={exercise.id}
                        style={{ marginBlockEnd: "0", marginBlockStart: "0" }}
                      >
                        {exercise.exercise_name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Create buttonWord="Create Routine" />
            </form>
          </div>
          <div>
            {limitReached && (
              <p style={{ color: "darkred" }}>
                You have reached the limit of 20 poses
              </p>
            )}
            <input
              className="searchInput"
              placeholder="Search for exercises"
              type="text"
              onChange={handleChange}
              value={poseSearch}
              style={{
                width: "250px",
                margin: "60px 0 20px 0",
                border: "none",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "10px 30px 10px 20px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 22px 0 rgba(0, 0, 0, 0.08)",
                outline: "none",
              }}
            />
            {/* <div
              style={{
                height: "80vh",
                overflowY: "scroll",
              }}
            > */}
            <div className="flow-poses-details">
              {filteredPoses.map((exercise, idx) => {
                const isCompleted = selectedExercises.some(
                  (flow) => flow.id === exercise.id
                );
                return (
                  <ExerciseCard
                    key={idx}
                    exercise={exercise}
                    poseNum={idx + 1}
                    isCompleted={isCompleted}
                    onClick={() => handlePoseClickNewRoutine(exercise.id)}
                    flowId={exercise.id}
                    isFromPose={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Exercises;
