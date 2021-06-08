import React, { useState } from 'react'

import Arrow from "../../../../assets/fileUp.png";

const UploadBtn = ({ changeView }) => {

    return (
        <div> 
            <button
                className="btn theme-color font-weight-bold upload-btn"
                onClick={() => {
                  changeView("upload");
                }}
                style={{
                  height: "35px",
                  color: "white",
                  backgroundColor: "#F4B248",
                  display: "flex",
                  width: "100px",
                  margin: "auto"
                }}
              >
                <p style={{ display: "inline", marginRight: "8%" }}>Upload</p>{" "}
                <img src={Arrow} style={{ display: "inline", marginLeft: "8%", marginTop: "8%" }}/>{" "}
              </button>
        </div>
    )
}

export default UploadBtn
