import { supabase } from "./supabase";
import axios from "axios";

export const generateRandomNumbers = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// partially working wip
export const getUserFlows = async (auth0_id) => {
  try {
    const { data: userFlows, error } = await supabase
      .from("users_flows_new")
      .select("flow_id")
      .eq("auth0_id", auth0_id);

    if (error) {
      throw error;
    }

    // Map over the userFlows array to extract just the flow IDs
    const flowIds = userFlows.map((userFlow) => userFlow.flow_id);

    // return flowIds;
  } catch (error) {
    console.error(error);
  }
};

export const fetchData = async (setFlows, setPoses) => {
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
  } catch (error) {
    console.log(error);
  }
};

// const allFlows = getUserFlows(userSub);
// console.log({ allFlows });
// const matchingFlows = getMatchingFlows(allFlows, flows);

export const getMatchingFlows = (allFlows, flows) => {
  return flows.filter((flow) => allFlows.includes(flow.id));
};

export const convertPosesToIds = (sequenceObj) => {
  const ids = sequenceObj.sequence_poses.map((pose) => pose.id);
  return {
    ...sequenceObj,
    sequence_poses: ids,
  };
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
  }
  