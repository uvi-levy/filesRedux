import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Search from "./Search/Search";
import FilterButtons from "./FilterButtons/FilterButtons";
import Chart from "./Chart/Chart";

import "./navbar.css";

import actions from "../../actions";

import { USER_NAME } from "../../utility/constants";

const Navbar = ({
  files,
  filteredFilesByType,
  changeProps,
  filteredFilesByTypeFunc,
  trashFiles,
  location,
}) => {
  const history = useHistory();

  useEffect(() => {
    filteredFilesByTypeFunc();
  }, [location, trashFiles]);

  const filteredFilesFunc = (type, searchVal) => {
    let tmpFiles = [];
    if (location == "trash") tmpFiles = trashFiles;
    else tmpFiles = files;
    console.log("in filterFiles");

    let filtaredFiles = [];

    console.log("tmpFiles", tmpFiles);

    if (tmpFiles && tmpFiles.length) {
      if (type == "folder") {
        changeProps([], true);
      }
      if (type == "search") {
        console.log("in searchInFiles");
        const value = searchVal;
        console.log(value);
        let result = [];
        tmpFiles.forEach((file) => {
          if (file.name.toLowerCase().includes(value)) {
            result.push(file);
          }
        });
        changeProps(result, false);
      }
      if (type == "img") {
        filtaredFiles = filteredFilesByType[0].img;

        console.log("img" + filtaredFiles);
        changeProps(filtaredFiles, false);
      }
      if (type == "audio") {
        filtaredFiles = filteredFilesByType[1].audio;
        console.log(filtaredFiles, false);

        changeProps(filtaredFiles);
      }
      if (type == "video") {
        filtaredFiles = filteredFilesByType[2].video;
        console.log(filtaredFiles);

        changeProps(filtaredFiles, false);
      }
      if (type == "file") {
        filtaredFiles = filteredFilesByType[3].others;
        console.log(filtaredFiles);

        changeProps(filtaredFiles, false);
      }
      if (type == "all") {
        changeProps(tmpFiles, true);
      }
    }
    if (filtaredFiles.length < 1) {
      console.log("no files");
    }
    if (type == "trash") {
      console.log("trash");
      history.push("/" + USER_NAME + "/trash");
    }
  };

  return (
    <div className="navbar" style={{ display: "flex", alignItems: "center" }}>
      <div className="left-div">
        <Container fluid>
          <Row>
            <Col>
              <Search filteredFiles={filteredFilesFunc} />
            </Col>
            <Col>
              <Chart />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="filter-buttons">
        <FilterButtons filteredFiles={filteredFilesFunc} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredFilesByType: state.data.filteredFilesByType,
    location: state.data.location,
    trashFiles: state.data.trashFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filteredFilesByTypeFunc: () => dispatch(actions.filteredFilesByType()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
