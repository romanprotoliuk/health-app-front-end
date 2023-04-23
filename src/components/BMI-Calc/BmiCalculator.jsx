import { useState } from "react";
import * as calculateBMI from "./utils";
import Form from "./form/form.component";
import underweight from "./imgs/underweight.svg";
import normalweight from "./imgs/normal-weight.svg";
import overweight from "./imgs/overweight.svg";
import obese from "./imgs/obese.svg";

const BmiCalculator = () => {
  let avatarImg;
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
      setUserPrompt("underweight, please put on some muscles");
      setAvatar(underweight);
    } else if (bmi <= 24.9) {
      setUserPrompt("at a normal weight");
      setAvatar(normalweight);
    } else if (bmi <= 29.9) {
      setUserPrompt("overweight! Start working out");
      setAvatar(overweight);
    } else if (bmi >= 30) {
      setUserPrompt("obese! You should consider changing your life style");
      setAvatar(obese);
    }
  };

  console.log(avatarImg);
  const handleSubmit = (e) => {
    e.preventDefault();
    setThirdCheckMark(true);

    setTimeout(() => {
      getBMI(weight, feet, inches);
      setShow(true);
      document.querySelector("#form-for-bmi").style.display = "none";
    }, 1000);
  };

  const handleReset = () => {
    setShow(false);
    setUserPrompt("");
    setUserDetails({
      name: "",
      feet: "",
      inches: "",
      height: "",
      weight: "",
      bmi: "",
    });
  };

  const ResultRender = () => {
    return (
      <div className="result-wrapper">
        <h2 style={{ marginBottom: "20px" }}>Hi, {name}</h2>
        <div>
          <img className="img-icon" src={avatar} alt={avatar} />
        </div>
        <h5 style={{ marginTop: "20px", marginBottom: "10px" }}>
          your bio metrics:
        </h5>
        <h3>
          height: {feet}'{inches}
        </h3>
        <h3>weight: {weight}</h3>
        <h3>your bmi: {bmi}</h3>
        <h5 style={{ marginTop: "30px", marginBottom: "10px" }}>
          by our calculations:
        </h5>
        <h3 className="text-display">you are {userPrompt} </h3>
      </div>
    );
  };

  return (
    <div className="App">
      <h3 style={{ marginTop: "20px" }}>BMI CALCULATOR</h3>
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
      {/* <button onClick={handleReset}>Reset</button> */}
      {show ? <ResultRender /> : ""}
    </div>
  );
};

export default BmiCalculator;
