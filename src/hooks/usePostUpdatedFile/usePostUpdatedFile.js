import React from "react";
import { useSelector } from "react-redux";

const usePostUpdatedFile = () => {
  const files = useSelector((state) => state.data.files);

  const getUpdatedFile = (file) => {
    const res = files.find((File) => file._id === File._id);
    return res;
  };
  return getUpdatedFile;
};

export default usePostUpdatedFile;
