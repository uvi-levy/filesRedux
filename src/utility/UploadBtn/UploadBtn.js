import React from "react";
import { Link } from "react-router-dom";

import Arrow from "../../assets/fileUp.png";

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
                height: "35px",
                color: "white",
                backgroundColor: "#F4B248",
                display: "flex",
                width: "100px",
                margin: "auto",
                ...style,
              }}
            >
              <p style={{ display: "inline", marginRight: "8%" }}>Upload</p>{" "}
              <img
                src={Arrow}
                style={{ display: "inline", marginLeft: "8%", marginTop: "8%" }}
              />{" "}
            </button>
          </Link>
        </>
      ) : (
        <button
          className="btn theme-color font-weight-bold upload-btn"
          style={{
            height: "35px",
            color: "white",
            backgroundColor: "#F4B248",
            display: "flex",
            width: "100px",
            margin: "auto",
            ...style,
          }}
        >
          <p style={{ display: "inline", marginRight: "8%" }}>Upload</p>{" "}
          <img
            src={Arrow}
            style={{ display: "inline", marginLeft: "8%", marginTop: "8%" }}
          />{" "}
        </button>
      )}
    </div>
  );
};

export default UploadBtn;
