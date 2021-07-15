import React from "react";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import $ from "jquery";

import { USER_NAME } from "../../constants";

import keys from "../../../config/env/keys";

const useLoadFiles = () => {
  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);
  const dispatch = useDispatch();

  const loadFiles = (jwt) => {
    console.log(keys);
    console.log("load");
    $.ajax({
      type: "GET",
      url: keys.BASE_URL + USER_NAME,
      headers: { authorization: jwt ? jwt : jwtFromCookie },
      error: (err) => {
        if (err.status == 401) {
          window.location = keys.LOGIN_PATH;
        }
      },
      success: (data) => {
        console.log("*data.length*", data, typeof data);
        if (data.length > 0) {
          dispatch(actions.setData(data));
          let validFiles = data.filter(
            (file) => file.name && file.size && file.dateCreated
          );
          dispatch(actions.setFiles(validFiles));
          dispatch(actions.setFilteredFiles(validFiles));
        } else {
          dispatch(actions.setIsLoadFiles(false));
          dispatch(actions.setData("no-files"));
        }
      },
    });
  };

  return loadFiles;
};

export default useLoadFiles;
