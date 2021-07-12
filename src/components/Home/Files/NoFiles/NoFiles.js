import React from "react";

import noFiles from "../../../../assets/no-files.png";

import UploadBtn from "../../../../utility/UploadBtn/UploadBtn";

import "./noFiles.css";

const NoFiles = () => {
  return (
    <div className="no-files">
      <div className="img-container">
        <img src={noFiles} />
      </div>
      <h4>You Have No Content Yet, Come Up</h4>
      <UploadBtn isLink={true} />
    </div>
  );
};

export default NoFiles;
