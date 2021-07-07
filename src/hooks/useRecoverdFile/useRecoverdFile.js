import React from "react";
import { useSelector } from "react-redux";

import $ from "jquery";

import {
  USER_NAME,
  BASE_URL,
  RECOVER_MULTI_FILES,
} from "../../utility/constants";

import useLoadFiles from "../../hooks/useLoadFiles/useLoadFiles";

const useRecoverdFile = () => {
  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);
  const homeLoadFiles = useLoadFiles();

  const recoveredFile = (fileId, hideModal, loadTrashFiles) => {
    console.log("in recoveredFile");

    if (hideModal) hideModal();

    console.log(fileId);

    $.ajax({
      type: "PUT",
      url: BASE_URL + USER_NAME + RECOVER_MULTI_FILES,
      headers: { Authorization: jwtFromCookie },
      data: JSON.stringify({ files: fileId }),
      dataType: "json",
      contentType: "application/json",

      success: (data) => {
        if (loadTrashFiles) loadTrashFiles();
        homeLoadFiles();
      },
      error: function (err) {
        alert("err");
      },
    });
  };
  return recoveredFile;
};

export default useRecoverdFile;
