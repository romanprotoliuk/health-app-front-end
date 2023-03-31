import { useState, useEffect } from "react";
import axios from "axios";

function Yoga() {
  const [poses, setPoses] = useState([]);
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posesResponse = await axios.get("http://localhost:8000/api/poses/");
      const flowsResponse = await axios.get("http://localhost:8000/api/flows/");
      setPoses(posesResponse.data);
      setFlows(flowsResponse.data);
    };
    fetchData();
  }, []);

  const getFlowPoses = (flow) => {
    const poseNames = flow.sequence_poses.split(",");
    return poseNames.map((poseName) => {
      const pose = poses.find(
        (pose) => pose.pose_name.trim() === poseName.trim()
      );
      return pose ? pose : { pose_name: poseName.trim(), id: null };
    });
  };

  return (
    <div className="yoga-app-container">
      <h1>Yoga App</h1>
      <div className="flow-container">
        {flows.map((flow, idx) => (
          <div key={flow.id} className="flow-card">
            <h2>{flow.sequence_name}</h2>
            <p className="flow-description">{flow.description}</p>
            <p className="flow-description">{flow.level}</p>
            <p className="flow-description">{flow.targets}</p>
            <p className="flow-description">{flow.benefits}</p>
            <div className="flow-poses">
              {getFlowPoses(flow).map((pose, idx) => (
                <div key={idx} className="pose-card">
                  <img
                    className="pose-image"
                    src={pose.image_url}
                    alt={pose.pose_name}
                  />
                  <p>{pose.image_url}</p>
                  {console.log({ pose })}
                  <h3 className="pose-name">{pose.pose_name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Yoga;
