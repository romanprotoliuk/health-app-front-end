import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { supabase } from "../../utils/supabase";
import { getMatchingFlows } from "../../utils/helper";

import BackBtn from "../buttons/BackBtn";

const Favorites = (props) => {
  const {
    poses,
    favoritedFlows,
    flows,
    userSub,
    setFavoritedFlows,
    setUserFlowIds,
    customUserFlows,
    setCustomUserFlows,
  } = props;

  const updateFavoritedFlows = useCallback(
    (matchingFlows) => {
      setFavoritedFlows(matchingFlows);
    },
    [setFavoritedFlows]
  );

  const updatedCustomUserFlows = useCallback(
    (matchingCustomFlows) => {
      setCustomUserFlows(matchingCustomFlows);
    },
    [setCustomUserFlows]
  );

  useEffect(() => {
    const fetchUserFlows = async () => {
      try {
        const { data: userFlowsData, error } = await supabase
          .from("users_flows_new")
          .select("flow_id")
          .eq("auth0_id", userSub);

        if (error) {
          throw error;
        }
        const userFlowIds = userFlowsData.map((userFlow) => userFlow.flow_id);
        setUserFlowIds(userFlowIds);
        const matchingFlows = getMatchingFlows(userFlowIds, flows);
        updateFavoritedFlows(matchingFlows);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCustomUserFlows = async () => {
      try {
        const { data, error } = await supabase
          .from("sequences")
          .select("*")
          .eq("auth0_id", userSub);
        const customFlowsWithPoses = data.map((flow) => {
          const posesNew = flow.sequence_poses.map((poseId) => {
            return poses.find((pose) => pose.id === poseId);
          });
          return { ...flow, sequence_poses: posesNew };
        });

        setCustomUserFlows(customFlowsWithPoses);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomUserFlows();
    fetchUserFlows();
  }, [flows, userSub, updateFavoritedFlows]);

  const renderCards = favoritedFlows.map((flow) => {
    return (
      <>
        <Link
          to={`/flow/${flow.id}`}
          key={flow.id}
          className="flow-card"
          style={{ textDecoration: "none" }}
        >
          <h2>{flow.sequence_name}</h2>
          <p className="flow-description">{flow?.description}</p>
          <p className="flow-description">{flow?.level}</p>
          <p className="flow-description">{flow?.targets}</p>
          <p className="flow-description">{flow?.benefits}</p>
        </Link>
      </>
    );
  });
  const renderCustomFlows = customUserFlows.map((flow) => {
    return (
      <>
        <Link
          to={`/flows/${flow.id}`}
          key={flow.id}
          className="flow-card"
          style={{ textDecoration: "none" }}
        >
          <h2>{flow.sequence_name}</h2>
          <p className="flow-description">{flow?.description}</p>
          <p className="flow-description">{flow?.level}</p>
          <p className="flow-description">{flow?.targets}</p>
          <p className="flow-description">{flow?.benefits}</p>
        </Link>
      </>
    );
  });

  return (
    <>
      <BackBtn />
      <h1>Favs Flows</h1>
      {favoritedFlows < 1 && <p>you have no fave flows</p>}
      <div className="flow-container-grid">{renderCards}</div>
      <h1>My Own Flows</h1>
      <div className="flow-container-grid">{renderCustomFlows}</div>
    </>
  );
};

export default Favorites;
