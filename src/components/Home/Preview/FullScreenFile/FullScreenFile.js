import React, { useState } from "react";

import Close from "../../../../assets/close-gray.png";
import PrevBtn from "../../../../assets/prev-btn.svg";
import NextBtn from "../../../../assets/next-btn.svg";

import useNextPrevFile from "../../../../hooks/useNextPrevFile/useNextPrevFile";

import "./fullScreenFile.css";

const FullScreenFile = ({ file, setDisplayPreview, setIsFullScreen }) => {
  const getNextPrevFile = useNextPrevFile();

  const [selectedFile, setSelectedFile] = useState(file);

  const handlePrevClick = () => {
    const res = getNextPrevFile("prev", selectedFile);
    if (res != "disable") setSelectedFile(res);
  };

  const handleNextClick = () => {
    const res = getNextPrevFile("next", selectedFile);
    if (res != "disable") setSelectedFile(res);
  };
  return (
    <div className="full-screen-container">
      <div style={{ width: "100%" }}>
        <button className="close-full-screen-btn">
          <img
            src={Close}
            onClick={() => {
              setIsFullScreen(false);
              setDisplayPreview(true);
            }}
          />
        </button>
      </div>
      <div style={{ margin: "auto" }}>
        <button className="prev-next-btns" onClick={handlePrevClick}>
          <img src={PrevBtn} />
        </button>
        <img src={selectedFile.url} className="full-screen-img" />
        <button className="prev-next-btns" onClick={handleNextClick}>
          <img src={NextBtn} />
        </button>
      </div>
    </div>
  );
};

export default FullScreenFile;
