import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const HomeSections = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <div
        style={
          isMobile
            ? { display: "flex", margin: "0 auto", flexDirection: "column" }
            : { display: "flex", margin: "0 auto" }
        }
      >
        <Link
          to={"/yoga"}
          style={
            isMobile
              ? {
                  position: "relative",
                  width: "100%",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "url('./yoga-background.avif')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "20px",
                  margin: "0 auto",
                  overflow: "hidden",
                  marginBottom: "10px",
                  // border: "2.5px solid #E56E1E",
                }
              : {
                  position: "relative",
                  width: "50%",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "url('./yoga-background.avif')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "20px",
                  marginRight: "10px",
                  margin: "0 auto",
                  overflow: "hidden",
                  // border: "2.5px solid #E56E1E",
                }
          }
        >
          <div
            className="home-cards"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25))",
              transition: "background 0.3s",
            }}
          ></div>
          <span
            style={{
              zIndex: "10",
              fontWeight: "600",
              textTransform: "uppercase",
              color: "rgb(51, 51, 51)",
              padding: "10px 20px",
              backgroundColor: "#FAFAFC",
              borderRadius: "20px",
            }}
          >
            Yoga
          </span>
        </Link>

        <Link
          className="home-cards"
          to={"/strength"}
          style={
            isMobile
              ? {
                  position: "relative",
                  width: "100%",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "url('./workout-background.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "20px",
                  overflow: "hidden",
                }
              : {
                  position: "relative",
                  width: "50%",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "url('./workout-background.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "20px",
                  marginLeft: "10px",
                  overflow: "hidden",
                }
          }
        >
          <div
            className="home-cards"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25))",
              transition: "background 0.3s",
            }}
          ></div>
          <span
            style={{
              zIndex: "10",
              fontWeight: "600",
              textTransform: "uppercase",
              color: "rgb(51, 51, 51)",
              padding: "10px 20px",
              backgroundColor: "#FAFAFC",
              borderRadius: "20px",
            }}
          >
            Strength
          </span>
        </Link>
      </div>
    </>
  );
};

export default HomeSections;
