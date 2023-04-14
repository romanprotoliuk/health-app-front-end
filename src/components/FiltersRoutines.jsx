import styled from "styled-components";
import { useMediaQuery } from "@mui/material";

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #33333370;
    margin-right: 10px;
  }

  select {
    border: none;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 30px 10px 20px;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 6px 22px 0 rgb(0 0 0 / 8%), 0 1px 6px 0 rgb(0 0 0 / 4%);
    outline: none;

    appearance: none;
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/9/9a/Caret_down_font_awesome.svg");
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    background-size: 10px;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    width: 100%;

    label {
      margin-bottom: 10px;
    }

    select {
      margin-bottom: 10px;
    }
  }
`;

const FiltersRoutines = (props) => {
  const bodyParts = [
    "Lower body",
    "Spine",
    "Arms",
    "Lower torso",
    "Legs",
    "Core",
    "Abdominals",
    "Obliques",
    "Hamstrings",
    "Lower back",
    "Hips",
    "Upper Body",
    "Upper Legs",
    "Back",
    "Shoulders",
  ];

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <FiltersContainer>
      <label
        htmlFor="difficulty"
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#333333",
        }}
      >
        Difficulty:
      </label>
      <select
        id="difficulty"
        value={props.difficultyFilter}
        onChange={props.handleSelectDifficulty}
        style={{
          marginRight: isMobile ? 0 : "30px",
          cursor: "pointer",
          marginBottom: isMobile ? "30px" : 0,
        }}
      >
        <option value="">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label
        htmlFor="bodyParts"
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#333333",
        }}
      >
        Body parts:
      </label>
      <select
        id="bodyParts"
        value={props.bodyPartsFilter}
        onChange={props.handleSelectBodyParts}
        style={{ cursor: "pointer" }}
      >
        <option value="">All</option>
        {bodyParts.map((parts) => (
          <option value={parts} key={parts}>
            {parts}
          </option>
        ))}
      </select>
    </FiltersContainer>
  );
};

export default FiltersRoutines;
