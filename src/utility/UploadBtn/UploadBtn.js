import React from "react";
import { Link } from "react-router-dom";

import Arrow from "../../assets/fileUp.svg";

import "./uploadBtn.css";

import { USER_NAME } from "../../utility/constants";

const UploadBtn = ({ isLink, style }) => {
  return (
    <div className="upload-btn">
      {isLink ? (
        <>
          <Link to={`/${USER_NAME}/upload`}>
            <button
              className="btn theme-color font-weight-bold upload-btn"
              style={{
                ...style,
              }}
            >
              <p style={{ display: "inline" }}>Upload</p>{" "}
              <img
                src={Arrow}
                style={{ display: "inline" }}
              />{" "}
            </button>
          </Link>
        </>
      ) : (
        <button
          className="btn theme-color font-weight-bold upload-btn"
          style={{
            ...style,
          }}
        >
          <p style={{ display: "inline" }}>Upload</p>{" "}
          <img
            src={Arrow}
            style={{ display: "inline" }}
          />{" "}
        </button>
      )}
    </div>
  );
};

export default UploadBtn;
