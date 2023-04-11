import { useState } from "react";

import BackBtn from "../buttons/BackBtn";
import ClearAll from "../buttons/ClearAllBtn";
import PoseCard from "../PoseCard";

import { generateRandomNumbers } from "../../utils/helper";
import { supabase } from "../../utils/supabase";
import CreateCustomFlow from "../buttons/CreateCustomFlow";
import Create from "../buttons/Create";

const Poses = (props) => {
  const {
    poses,
    selectedPoses,
    setSelectedPoses,
    handlePoseClickNewFlow,
    setAllCustomFlows,
    allCustomFlows,
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

    const customFlow = {
      sequence_name: customFlowTitle,
      sequence_poses: selectedPoses.map((pose) => pose.id),
      description: customFlowDescription,
      id: newGeneratedId,
      auth0_id: userSub,
    };

    const { data, error } = await supabase
      .from("sequences")
      .insert([customFlow]);
    if (error) {
      console.log(error);
      return;
    }

    setAllCustomFlows((prevFlows) => [...prevFlows, customFlow]);
    setSelectedPoses([]);
    setCustomFlowTitle("");
    setCustomFlowDescription("");
    localStorage.setItem(
      "customFlows",
      JSON.stringify([...allCustomFlows, customFlow])
    );
  };

  const getFilteredPoses = () => {
    let newSearchTerm = poseSearch.toLowerCase();
    return poses.filter((v) => {
      let lowerCaseName = v.pose_name.toLowerCase();
      return lowerCaseName.includes(newSearchTerm);
    });
  };

  const limitReached = selectedPoses.length === 20;
  const filteredPoses = getFilteredPoses();

  const handleClearAllPoses = () => {
    setSelectedPoses([]);
    localStorage.removeItem("selectedPoses");
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
        {createNewFlow && selectedPoses.length !== 0 && (
          <ClearAll handleClearAllPoses={handleClearAllPoses} />
        )}

        {!createNewFlow && (
          <CreateCustomFlow handleCreateNewFlow={handleCreateNewFlow} />
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
                  Flow Title:
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
                  Flow Description:
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
                Selected Poses:
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {selectedPoses.map((pose) => (
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
                        key={pose.id}
                        style={{ marginBlockEnd: "0", marginBlockStart: "0" }}
                      >
                        {pose.pose_name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Create />
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
              placeholder="Search for poses"
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
              {filteredPoses.map((pose, idx) => {
                const isCompleted = selectedPoses.some(
                  (flow) => flow.id === pose.id
                );
                return (
                  <PoseCard
                    key={idx}
                    pose={pose}
                    poseNum={idx + 1}
                    isCompleted={isCompleted}
                    onClick={() => handlePoseClickNewFlow(pose.id)}
                    flowId={pose.id}
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

export default Poses;
