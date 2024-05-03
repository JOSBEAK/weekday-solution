import React from "react";
import NF from "../assets/image.png";
const NotFound = () => {
  return (
    <div className="not-found">
      <img alt="not-found" src={NF} width="150" height="150"></img>
      <p>No Jobs available for this category at the moment</p>
    </div>
  );
};

export default NotFound;
