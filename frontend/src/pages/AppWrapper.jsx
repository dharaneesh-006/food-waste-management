import React from "react";
import App from "../App.jsx";
import { LoadingProvider } from "./LoadingContext.jsx";
import LoadingWrapper from "./LoadingWrapper.jsx"; 

const AppWrapper = () => (
  <LoadingProvider>
    <LoadingWrapper>
      <App />
    </LoadingWrapper>
  </LoadingProvider>
);

export default AppWrapper;
