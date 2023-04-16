import { Link } from "react-router-dom";
import Filters from "../Filters";
import ChatRoom from "../ChatRoom";
import LoadingSpinner from "../LoadingSpinner";

const GridPoses = (props) => {
  if (props.ChatRooms === "undefined") {
    return (
      <>
        <LoadingSpinner text="Loading..." />
      </>
    );
  }
  const renderCards = (
    props.filteredFlows && props.filteredFlows.length > 0
      ? props.filteredFlows
      : props.flows
  ).map((flow) => {
    const levels = flow.level;

    const beginner = levels.includes("beginner");
    const intermediate = levels.includes("intermediate");
    const advanced = levels.includes("advanced");

    // Render benefits array
    const benefitsArray = flow.benefits;
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

  return (
    <>
      {props.isAuthenticated && (
        <p style={{ marginBottom: "40px" }}>Hi, {props.user.nickname}</p>
      )}
      <Filters
        difficultyFilter={props.difficultyFilter}
        handleSelectDifficulty={props.handleSelectDifficulty}
        bodyPartsFilter={props.bodyPartsFilter}
        handleSelectBodyParts={props.handleSelectBodyParts}
      />
      <DifficultyLevelBar />
      <div className="flow-container-grid">{renderCards}</div>
      <div className="chat-room-container">
        {props.chatRooms.map((chatRoom) => (
          <ChatRoom
            key={chatRoom.id}
            roomId={props.chatRooms[0].id}
            user={props.user}
            isAuthenticated={props.isAuthenticated}
          />
        ))}
      </div>
    </>
  );
};

export default GridPoses;

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

const DifficultyLevelBar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBottom: "40px",
          marginTop: "40px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundImage: "linear-gradient(to bottom, #43E44B, #0AE0A7)",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          ></div>
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
            }}
          >
            Beginner
          </p>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundImage: "linear-gradient(to bottom, #FEA700, #FFD400)",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          ></div>
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
            }}
          >
            Intermediate
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundImage: "linear-gradient(to bottom, #f83600, #FE6D10)",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          ></div>
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#00000080",
            }}
          >
            Advanced
          </p>
        </div>
      </div>
    </>
  );
};
