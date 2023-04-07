import { useParams } from "react-router-dom";
import BackBtn from "../buttons/BackBtn";
import DeleteFlowBtn from "../buttons/DeleteFlowBtn";
import SaveBtn from "../buttons/SaveBtn";
import UnsaveBtn from "../buttons/UnsaveBtn";
import PoseCard from "../PoseCard";

import { useEffect, useState } from "react";

const FlowDetails = (props) => {
  const {
    flows,
    filteredFlows,
    handlePoseClick,
    poseCompletion,
    handleDeleteFlow,
    handleFavoritedClick,
    handleUnlikeFlow,
    favoritedFlows,
    isSavedCompleted,
    setIsSavedCompleted,
  } = props;
  const { id } = useParams();

  // Retrieve flows data from local storage
  // const storedFlows = localStorage.getItem("customFlows");
  // const parsedFlows = JSON.parse(storedFlows);

  // console.log({ parsedFlows });

  // useEffect(() => {
  //   if (isSavedCompleted) {
  //     const timeoutId = setTimeout(() => {
  //       setIsSavedCompleted(false);
  //     }, 5000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isSavedCompleted]);

  const selected = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).find((flow) => flow.id === parseInt(id));

  const isSaved = favoritedFlows.includes(selected.id);
  console.log("issaved", isSaved && isSavedCompleted);
  const isCompleted = poseCompletion[selected.id];

  return (
    <>
      <h3>Flow Details</h3>
      <BackBtn />
      <div style={{ marginBottom: "20px" }}>
        {isCompleted && (
          <DeleteFlowBtn handleDeleteFlow={handleDeleteFlow} id={selected.id} />
        )}

        {isSaved ? (
          <UnsaveBtn handleUnlikeFlow={handleUnlikeFlow} id={selected.id} />
        ) : (
          <SaveBtn
            handleFavoritedClick={handleFavoritedClick}
            id={selected.id}
          />
        )}
      </div>
      {isSaved && <p>This flow has been added to your flows</p>}

      <div className="flow-poses">
        {selected.sequence_poses.map((pose, idx) => {
          const isCompleted = poseCompletion[selected.id]?.[idx];
          return (
            <PoseCard
              key={idx}
              pose={pose}
              poseNum={idx + 1}
              isCompleted={isCompleted}
              onClick={() => handlePoseClick(selected.id, idx)}
              flowId={selected.id} // add flowId prop to pose card
            />
          );
        })}
      </div>
    </>
  );
};

export default FlowDetails;
