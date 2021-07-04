import React from "react";

import "./emptyTrash.css";

import emptyTrash from "../../../assets/empty-trash.png";
import GoBack from "../../GoBack/GoBack";

const EmptyTrash = () => {
  return (
    <div className="empty-trash">
      <GoBack />
      <div className="img-container">
        <img src={emptyTrash} />
      </div>
      <h4>No Item</h4>
      <h5>Your Trash Is Empty</h5>
    </div>
  );
};

export default EmptyTrash;
