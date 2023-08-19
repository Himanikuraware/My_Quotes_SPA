import React from "react";
import notFoundImg from "../assets/not-found.jpg";

const NotFound = () => {
  return (
    <div className="centered">
      <img style={{ width: "100%" }} src={notFoundImg} alt="Page Not Found" />
    </div>
  );
};

export default NotFound;
