import NameField from "../form field components/nameField.component";
import HeightField from "../form field components/heightField.component";
import WeightField from "../form field components/weightField.component";
import "./form.styles.css";

const Form = (props) => {
  return (
    <>
      <form
        className="search-form"
        id="form-for-bmi"
        onSubmit={props.handleSubmit}
      >
        <div>
          <NameField
            userDetails={props.userDetails}
            handleChange={props.handleChange}
            handleShowHeight={props.handleShowHeight}
            firstNextBtn={props.firstNextBtn}
            firstCheckMark={props.firstCheckMark}
          />
        </div>
        <div>
          {props.showHeight ? (
            <HeightField
              userDetails={props.userDetails}
              handleChange={props.handleChange}
              handleShowWeight={props.handleShowWeight}
              secondNextBtn={props.secondNextBtn}
              secondCheckMark={props.secondCheckMark}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {props.showWeight ? (
            <WeightField
              userDetails={props.userDetails}
              handleChange={props.handleChange}
              thirdCheckMark={props.thirdCheckMark}
            />
          ) : (
            ""
          )}
        </div>

        {props.hideSubmit ? (
          <input className="submit-btn" id="submit-btn" type="submit" />
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default Form;
