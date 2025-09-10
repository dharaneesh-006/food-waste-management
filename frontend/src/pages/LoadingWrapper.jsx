import React from "react";
import { useLoading } from "../pages/LoadingContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

const LoadingWrapper = ({ children }) => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LoadingSpinner />}
      {children}
    </>
  );
};

export default LoadingWrapper;
