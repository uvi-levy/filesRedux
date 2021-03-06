import React from "react";

import "./prevNextFile.css";

import PrevBtn from "../../../../assets/prev-btn.svg";
import NextBtn from "../../../../assets/next-btn.svg";

import useNextPrevFile from "../../../../utility/cutomHooks/useNextPrevFile/useNextPrevFile";

const PrevNextFile = ({ selectedFile, setSelectedFile, setFile }) => {
  const getNextPrevFile = useNextPrevFile();

  const getPrev = () => {
    const res = getNextPrevFile("prev", selectedFile);
    if (res !== "disable") {
      setSelectedFile(res);
      setFile(res);
    }
  };

  const getNext = () => {
    const res = getNextPrevFile("next", selectedFile);
    if (res !== "disable") {
      setFile(res);
      setSelectedFile(res);
    }
  };

  return (
    <div className="prevNextFile">
      <img src={PrevBtn} onClick={getPrev} />
      <img src={NextBtn} onClick={getNext} />
    </div>
  );
};

export default PrevNextFile;
