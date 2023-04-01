import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const FlowDetails = (props) => {
  const { flows, filteredFlows } = props;
  const { id } = useParams();

  const selected = (
    filteredFlows && filteredFlows.length > 0 ? filteredFlows : flows
  ).find((flow) => flow.id === parseInt(id));

  return (
    <>
      <h3>Flow Details</h3>
      <Link to={"/"}>Go back</Link>
      <div className="flow-poses">
        {selected.sequence_poses.map((pose, idx) => {
          return (
            <div key={idx} className="pose-card">
              <img
                className="pose-image"
                src={pose.image_url}
                alt={pose.pose_name}
              />
              <h3 className="pose-name">{pose.pose_name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FlowDetails;
