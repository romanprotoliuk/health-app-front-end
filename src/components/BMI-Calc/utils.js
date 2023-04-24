export const getKg = (pounds) => {
	const killoValue = 0.45359237;
	const answer = pounds * killoValue;
	return Math.round(10 * answer) / 10;
};

export const getM = (feet, inches) => {
	const inchesValue = 12;
	const getMformulaValue = 0.0254;
	let totalInches;

	const getInches = feet * inchesValue;

	if (inches === null) {
		totalInches = getInches;
	} else {
		totalInches = parseInt(getInches) + parseInt(inches);
	}
	const answer = totalInches * getMformulaValue;

	return Math.round(100 * answer) / 100;
};