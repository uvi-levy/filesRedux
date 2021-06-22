import React from "react";

import "./emptyTrash.css";

import emptyTrash from "../../../assets/empty-trash.png";

const EmptyTrash = () => {
  return (
    <div className="empty-trash">
      <div className="img-container">
        <img src={emptyTrash} />
      </div>
      <h4>No Item</h4>
      <h5>Your Trash Is Empty</h5>
    </div>
  );
};

export default EmptyTrash;
