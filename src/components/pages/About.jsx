const About = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        margin: "0 auto",
      }}
    >
      <div>
        <p
          className="flow-description"
          style={{ color: "#484848", maxWidth: "500px", margin: "0 auto" }}
        >
          Protoloq is a unique digital health community platform that is
          dedicated to developing cutting-edge technology solutions and
          gathering essential resources to help individuals extend their
          lifespan and live more enjoyable lives. Our mission is to empower
          people with the tools and knowledge necessary to take control of their
          health and wellness, making it possible to live longer, healthier, and
          more fulfilling lives. By leveraging the latest advances in science
          and technology, we provide a comprehensive suite of resources designed
          to promote physical and mental well-being, including personalized
          health assessments, advanced diagnostics, and evidence-based
          recommendations for diet, exercise, and lifestyle modifications. With
          a focus on innovation, collaboration, and community, Protoloq aims to
          redefine the concept of health and wellness, helping people to achieve
          their full potential and live life to the fullest.
        </p>
      </div>

      <div style={{ marginTop: "50px" }}>
        <a
          href="https://romanprotoliuk-links.webflow.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "12px",
            color: "#00000080",
          }}
        >
          @romanprotoliuk
        </a>
      </div>
    </div>
  );
};

export default About;
