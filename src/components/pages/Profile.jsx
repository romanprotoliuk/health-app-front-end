import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { supabase } from "../../utils/supabase";
import { getMatchingFlows } from "../../utils/helper";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BackBtn from "../buttons/BackBtn";

const Profile = (props) => {
  const {
    poses,
    routines,
    favoritedFlows,
    flows,
    userSub,
    setFavoritedFlows,
    setFavoritedRoutines,
    favoritedRoutines,
    setUserFlowIds,
    setUserRoutineIds,
    customUserFlows,
    setCustomUserFlows,
    exercises,
    setCustomUserRoutines,
    customUserRoutines,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateFavoritedFlows = useCallback(
    (matchingFlows) => {
      setFavoritedFlows(matchingFlows);
    },
    [setFavoritedFlows]
  );

  const updateFavoritedRoutines = useCallback(
    (matchingRoutines) => {
      setFavoritedRoutines(matchingRoutines);
    },
    [setFavoritedRoutines]
  );

  const updatedCustomUserFlows = useCallback(
    (matchingCustomFlows) => {
      setCustomUserFlows(matchingCustomFlows);
    },
    [setCustomUserFlows]
  );

  const updatedCustomUserRoutines = useCallback(
    (matchingCustomRoutines) => {
      setCustomUserRoutines(matchingCustomRoutines);
    },
    [setCustomUserRoutines]
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

    const fetchUserRoutines = async () => {
      try {
        const { data: userRoutineData, error } = await supabase
          .from("users_routines_new")
          .select("routine_id")
          .eq("auth0_id", userSub);

        if (error) {
          throw error;
        }
        const userRoutineIds = userRoutineData.map(
          (userFlow) => userFlow.routine_id
        );
        setUserRoutineIds(userRoutineIds);
        const matchingFlows = getMatchingFlows(userRoutineIds, routines);
        updateFavoritedRoutines(matchingFlows);
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

    const fetchCustomUserRoutines = async () => {
      try {
        const { data, error } = await supabase
          .from("customroutines")
          .select("*")
          .eq("auth0_id", userSub);

        const customFlowsWithPoses = data.map((exercise) => {
          const routinesNew = exercise.routine_exercises.map((poseId) => {
            return exercises.find((exercise) => exercise.id === poseId);
          });
          return { ...exercise, routine_poses: routinesNew };
        });

        setCustomUserRoutines(customFlowsWithPoses);

        if (error) {
          throw error;
        }
      } catch (error) {}
    };

    fetchUserRoutines();
    fetchCustomUserRoutines();
    fetchCustomUserFlows();
    fetchUserFlows();
  }, [
    flows,
    userSub,
    updateFavoritedFlows,
    updatedCustomUserFlows,
    updatedCustomUserRoutines,
  ]);

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

  const renderRoutineCards = favoritedRoutines.map((flow) => {
    const target = flow.targets.split(",");
    const renderBenefits = target.map((benefit, index) => {
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
        to={`/routine/${flow.id}`}
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
          <h3
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#333333",
            }}
          >
            {flow.routine_name}
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

  const renderCustomFlows = customUserFlows.map((flow, id) => {
    return (
      <React.Fragment key={id}>
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
      </React.Fragment>
    );
  });

  const renderCustomRoutines = customUserRoutines.map((flow, id) => {
    return (
      <React.Fragment key={id}>
        <Link
          to={`/routines/${flow.id}`}
          key={flow.id}
          className="flow-card"
          style={{ textDecoration: "none" }}
        >
          <h2>{flow.routine_name}</h2>
          <p className="flow-description">{flow?.description}</p>
          <p className="flow-description">{flow?.level}</p>
          <p className="flow-description">{flow?.targets}</p>
          <p className="flow-description">{flow?.benefits}</p>
        </Link>
      </React.Fragment>
    );
  });

  return (
    <>
      <BackBtn />

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          border: "1px solid #03c8a8",
          borderRadius: "20px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
            }}
          >
            My favorited flows
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {favoritedFlows < 1 && <p>you have no fave flows</p>}
          <div className="flow-container-grid">{renderCards}</div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{
          border: "1px solid #03c8a8",
          borderRadius: "20px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
            }}
          >
            My favorited Routines
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {favoritedRoutines < 1 && <p>you have no fave routines</p>}
          <div className="flow-container-grid">{renderRoutineCards}</div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{
          border: "1px solid #03c8a8",
          borderRadius: "20px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
            }}
          >
            My own flows
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {customUserFlows < 1 && <p>you have no custom flows</p>}
          <div className="flow-container-grid">{renderCustomFlows}</div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        style={{
          border: "1px solid #03c8a8",
          borderRadius: "20px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
            }}
          >
            My own workout routines
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {customUserRoutines < 1 && <p>you have no fav routines</p>}
          <div className="flow-container-grid">{renderCustomRoutines}</div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Profile;

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
