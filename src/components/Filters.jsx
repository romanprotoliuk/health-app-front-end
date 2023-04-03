const Filters = (props) => {
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

  return (
    <>
      <div className="filter-container" style={{ marginBottom: "20px" }}>
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={props.difficultyFilter}
          onChange={props.handleSelectDifficulty}
        >
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label htmlFor="bodyParts">Body parts:</label>
        <select
          id="bodyParts"
          value={props.bodyPartsFilter}
          onChange={props.handleSelectBodyParts}
        >
          <option value="">All</option>
          {bodyParts.map((parts) => (
            <option value={parts} key={parts}>
              {parts}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;
