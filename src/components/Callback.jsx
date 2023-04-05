import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../utils/magic";
import LoadingSpinner from "./LoadingSpinner";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, we try to login with a Magic credential in the URL query.
    magic.auth.loginWithCredential().finally(() => {
      navigate("/");
    });
  }, []);

  return <LoadingSpinner text="Loading..." />;
}
