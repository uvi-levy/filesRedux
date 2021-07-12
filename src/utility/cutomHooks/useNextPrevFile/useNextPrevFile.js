import React from "react";
import { useSelector } from "react-redux";

const useNextPrevFile = () => {
  const files = useSelector((state) => state.data.files);

  const getNextPrevFile = (condition, file) => {
    const index = files.findIndex((item) => item._id === file._id);
    if (condition === "prev") {
      if (index + 1 === files.length) return "disable";
      else return files[index + 1];
    } else {
      if (index - 1 < 0) return "disable";
      else return files[index - 1];
    }
  };

  return getNextPrevFile;
};

export default useNextPrevFile;
