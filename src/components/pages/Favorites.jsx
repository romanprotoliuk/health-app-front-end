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
  }, [flows, userSub, updateFavoritedFlows, updatedCustomUserFlows]);

  const renderCards = favoritedFlows.map((flow) => {
    const levels = flow.level.split(",");

    // check if each level is included in the array
    const beginner = levels.includes("beginner");
    const intermediate = levels.includes("intermediate");
    const advanced = levels.includes("advanced");

    // Render benefits array
    const benefitsArray = flow.benefits.split(",");
    const renderBenefits = benefitsArray.map((benefit, index) => {
      return (
        <div
          key={index}
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
              style={{
                marginBlockEnd: "0",
                marginBlockStart: "0",
              }}
            >
              {benefit}
            </p>
          </div>
        </div>
      );
    });
    return (
      <Link
        to={`/flow/${flow.id}`}
        key={flow.id}
        className="flow-card"
        style={{
          textDecoration: "none",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignContent: "stretch",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {beginner && !intermediate && !advanced && (
            <LevelDot backgroundImage="linear-gradient(to bottom, #43E44B, #0AE0A7)" />
          )}
          {beginner && intermediate && (
            <>
              <LevelDot backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)" />
              <LevelDot
                backgroundImage="linear-gradient(to bottom, #43E44B, #0AE0A7)"
                right={"30px"}
              />
            </>
          )}
          {intermediate && !beginner && !advanced && (
            <LevelDot backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)" />
          )}
          {advanced && intermediate && (
            <>
              <LevelDot backgroundImage="linear-gradient(to bottom, #f83600, #FE6D10)" />
              <LevelDot
                backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)"
                right={"30px"}
              />
            </>
          )}
          {advanced && !beginner && !intermediate && (
            <LevelDot backgroundImage="linear-gradient(to bottom, #f83600, #FE6D10)" />
          )}

          <h3
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#333333",
            }}
          >
            {flow.sequence_name}
          </h3>
          <p className="flow-description" style={{ color: "#484848" }}>
            {flow.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#FAFAFC",
              marginBottom: "10px",
            }}
          ></div>
          {renderBenefits}
        </div>
      </Link>
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
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#00000080",
        }}
      >
        My favorited flows
      </p>
      {favoritedFlows < 1 && <p>you have no fave flows</p>}
      <div className="flow-container-grid">{renderCards}</div>
      <p
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#00000080",
          marginTop: "40px",
        }}
      >
        My own flows
      </p>
      <div className="flow-container-grid">{renderCustomFlows}</div>
    </>
  );
};

export default Favorites;

const LevelDot = ({ backgroundImage, right = "15px" }) => {
  return (
    <div
      className="levelDot"
      style={{
        position: "absolute",
        top: "15px",
        right: right,
        border: "2px solid #FFF",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundImage: backgroundImage,
          borderRadius: "20px",
        }}
      ></div>
    </div>
  );
};
