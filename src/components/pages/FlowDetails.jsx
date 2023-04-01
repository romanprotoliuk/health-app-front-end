import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FlowDetails = (props) => {
  const { flows, filteredFlows } = props;
  const { id } = useParams();

  const selected = (
    props.filteredFlows && props.filteredFlows.length > 0
      ? props.filteredFlows
      : props.flows
  ).find((flow) => flow.id === parseInt(id));

  // useEffect(() => {
  //   // Find the selected flow based on the id parameter

  // }, [flows, id]);

  console.log({ selected });

  return (
    <>
      <h3>Flow Details</h3>
    </>
  );
};

export default FlowDetails;
