import { Link } from "react-router-dom";
import FiltersRoutines from "../FiltersRoutines";
import LoadingSpinner from "../LoadingSpinner";

const GridRoutines = (props) => {
  if (props.ChatRooms === "undefined") {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }
  const renderCards = (
    props.filteredRoutines && props.filteredRoutines.length > 0
      ? props.filteredRoutines
      : props.routines
  ).map((routine) => {
    const target = routine.targets.split(",");
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
        to={`/routine/${routine.id}`}
        key={routine.id}
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
            {routine.routine_name}
          </h3>
          <p className="flow-description" style={{ color: "#484848" }}>
            {routine.description}
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

  return (
    <>
      {props.isAuthenticated && (
        <p style={{ marginBottom: "40px" }}>Hi, {props.user.nickname}</p>
      )}
      <FiltersRoutines
        targetsFilter={props.targetsFilter}
        routineTypesFilter={props.routineTypesFilter}
        handleSelectTargets={props.handleSelectTargets}
        handleSelectRoutineTypes={props.handleSelectRoutineTypes}
      />
      <div className="flow-container-grid" style={{ marginTop: "40px" }}>
        {renderCards}
      </div>
    </>
  );
};

export default GridRoutines;
