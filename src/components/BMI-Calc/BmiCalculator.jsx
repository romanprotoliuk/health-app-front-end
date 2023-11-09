import { useState } from "react";
import * as calculateBMI from "./utils";
import Form from "./form/form.component";
import underweight from "./imgs/underweight.svg";
import normalweight from "./imgs/normal-weight.svg";
import overweight from "./imgs/overweight.svg";
import obese from "./imgs/obese.svg";
import ClearAll from "../buttons/ClearAllBtn";
import ResultRender from "./ResultRender";

const BmiCalculator = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    feet: 0,
    inches: 0,
    height: "",
    weight: 0,
    bmi: "",
  });
  const [bmi, setBmi] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [show, setShow] = useState(false);
  const [showHeight, setShowHeight] = useState(false);
  const [showWeight, setShowWeight] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);
  const [firstNextBtn, setFirstNextBtn] = useState(true);
  const [secondNextBtn, setSecondNextBtn] = useState(true);
  const [firstCheckMark, setFirstCheckMark] = useState(false);
  const [secondCheckMark, setSecondCheckMark] = useState(false);
  const [thirdCheckMark, setThirdCheckMark] = useState(false);
  const { name, feet, inches, height, weight } = userDetails;

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowHeight = () => {
    setShowHeight(true);
    setFirstNextBtn(false);
    setFirstCheckMark(true);
    document.querySelector("#name-field").disabled = true;
    document.querySelector("#name-field-btn").disabled = true;
  };

  const handleShowWeight = () => {
    setShowWeight(true);
    setHideSubmit(true);
    setSecondNextBtn(false);
    setSecondCheckMark(true);
    document.querySelector("#height-field").disabled = true;
    document.querySelector("#height-inches-field").disabled = true;
  };

  const getBMI = (userWeight, feet, inches) => {
    const userWeightInkg = calculateBMI.getKg(userWeight);
    const userHeightInM = calculateBMI.getM(feet, inches);
    const bmi =
      Math.round(100 * (userWeightInkg / Math.pow(userHeightInM, 2))) / 100;
    setBmi(bmi);
    determineBMImessage(bmi);
  };

  const determineBMImessage = (bmi) => {
    if (bmi <= 18.5) {
      setUserPrompt(
        "more capable than you realize, and I believe that a stronger physique could unlock your true potential."
      );
      setAvatar(underweight);
    } else if (bmi <= 24.9) {
      setUserPrompt("at a normal weight");
      setAvatar(normalweight);
    } else if (bmi <= 29.9) {
      setUserPrompt(
        "radiating with health and beauty, and I'm sure regular exercise would only add to your vibrant energy and vitality. Why not explore some enjoyable physical activities that align with your interests and fitness goals?"
      );
      setAvatar(overweight);
    } else if (bmi >= 30) {
      setUserPrompt(
        "capable of more than you realize, and I believe that making positive lifestyle changes could unlock your true potential."
      );
      setAvatar(obese);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setThirdCheckMark(true);

    setTimeout(() => {
      getBMI(weight, feet, inches);
      setShow(true);
    }, 1000);
  };

  const handleReset = () => {
    setShow(false);
    setUserDetails({
      name: "",
      feet: 0,
      inches: 0,
      height: "",
      weight: 0,
      bmi: "",
    });
    setBmi(0);
    setAvatar("");
    setUserPrompt("");
    setShowHeight(false);
    setShowWeight(false);
    setHideSubmit(false);
    setFirstNextBtn(true);
    setSecondNextBtn(true);
    setFirstCheckMark(false);
    setSecondCheckMark(false);
    setThirdCheckMark(false);
  };

  return (
    <div>
      {show && <ClearAll handleClearAllPoses={handleReset} />}
      <h3
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          color: "#333333",
        }}
      >
        BMI CALCULATOR
      </h3>

      {!show && (
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleShowHeight={handleShowHeight}
          handleShowWeight={handleShowWeight}
          userDetails={userDetails}
          showHeight={showHeight}
          showWeight={showWeight}
          hideSubmit={hideSubmit}
          firstNextBtn={firstNextBtn}
          secondNextBtn={secondNextBtn}
          firstCheckMark={firstCheckMark}
          secondCheckMark={secondCheckMark}
          thirdCheckMark={thirdCheckMark}
        />
      )}
      {show && (
        <ResultRender
          name={name}
          avatar={avatar}
          feet={feet}
          inches={inches}
          weight={weight}
          userPrompt={userPrompt}
          bmi={bmi}
        />
      )}
    </div>
  );
};
export default BmiCalculator;
