import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { supabase } from "../../utils/supabase";
import { getMatchingFlows } from "../../utils/helper";

import BackBtn from "../buttons/BackBtn";

const Favorites = (props) => {
  const { favoritedFlows, flows, userSub, setFavoritedFlows, setUserFlowIds } =
    props;

  const updateFavoritedFlows = useCallback(
    (matchingFlows) => {
      setFavoritedFlows(matchingFlows);
    },
    [setFavoritedFlows]
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

        // console.log({ userFlowsData });

        const userFlowIds = userFlowsData.map((userFlow) => userFlow.flow_id);
        setUserFlowIds(userFlowIds);

        // console.log({ userFlowIds });

        const matchingFlows = getMatchingFlows(userFlowIds, flows);
        // console.log({ matchingFlows });
        updateFavoritedFlows(matchingFlows);
      } catch (error) {
        console.error(error);
      }
    };

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

  return (
    <>
      <BackBtn />
      <h1>Favs Flows</h1>
      {favoritedFlows < 1 && <p>you have no fave flows</p>}
      <div className="flow-container-grid">{renderCards}</div>
      {/* <h1>My Own Flows</h1>
      <div className="flow-container-grid">{renderCustomFlows}</div> */}
    </>
  );
};

export default Favorites;

// const renderCustomFlows = allCustomFlows.map((flow) => {
//   return (
//     <>
//       <Link
//         to={`/flow/${flow.id}`}
//         key={flow.id}
//         className="flow-card"
//         style={{ textDecoration: "none" }}
//       >
//         <h2>{flow.sequence_name}</h2>
//         <p className="flow-description">{flow?.description}</p>
//         <p className="flow-description">{flow?.level}</p>
//         <p className="flow-description">{flow?.targets}</p>
//         <p className="flow-description">{flow?.benefits}</p>
//       </Link>
//     </>
//   );
// });
