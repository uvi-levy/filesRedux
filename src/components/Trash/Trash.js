import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MdRestore } from "react-icons/md";

import actions from "../../actions";

import EmptyTrash from "./EmptyTrash/EmptyTrash";
import GoBack from "../GoBack/GoBack"
import ListDispalay from "./ListDispalay/ListDispalay";
import GridDisplay from "./GridDisplay/GridDisplay";
import RestorePopup from "./RestorePopup/RestorePopup";
import Loader from "../Loader/Loader";

import $ from "jquery";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

import Img from "../../assets/image-regular.png";
import Adiuo from "../../assets/headphones-solid.png";
import Video from "../../assets/video-solid.png";
import User from "../../assets/user-solid.png";
import FileCard from "../../assets/Group.png";
import Folder from "../../assets/folder-solid.png";

import {
  BASE_URL,
  USER_NAME,
  SHOW_DELETED_FILES,
} from "../../utility/constants";

const Trash = ({
  jwtFromCookie,
  files,
  setFiles,
  showGrid,
  setFilteredFiles,
  filteredFiles,
  setLocation,
}) => {

  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [grid, setGrid] = useState([]);
  const [allDisplay, setAllDisplay] = useState("none");
  const [TeamDisplay, setTeamDisplay] = useState("none");
  const [view, setView] = useState([]);
  const [img, setImg] = useState(0);
  const [all, setAll] = useState(0);
  const [video, setVideo] = useState(0);
  const [adiuo, setAdiuo] = useState(0);
  const [file, setFile] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocation("trash");
    setLoad(true);
    if (jwtFromCookie) loadFiles();
  }, []);

  useEffect(() => {
    if (jwtFromCookie) loadFiles();
  }, [jwtFromCookie]);

  useEffect(() => {
    showFiles();
  }, [files]);

  const loadFiles = () => {
    console.log("load");
    $.ajax({
      type: "GET",
      url: BASE_URL + USER_NAME + SHOW_DELETED_FILES,
      headers: { Authorization: jwtFromCookie },

      success: (data) => {
        console.log("**", data, data.length);
        if (data.length > 0) {
          console.log(data);
          const myFiles = [];
          data.forEach((file) => {
            if (
              file.name &&
              file.size &&
              file.dateCreated &&
              file.name.split(".")[1] &&
              file.name.split("__")[1]
            ) {
              myFiles.push(file);
            }
          });
          setFilteredFiles(myFiles);
          setFiles(myFiles);
          setLoad(false);
        }
        else {
          setFiles([]);
          setFilteredFiles([{}]);
          setLoad(false);
        }
      },
    });
  };

  const showFiles = () => {
    console.log("in showFiles");

    var iconsClasses = {
      ai: <img src={File} />,
      docx: <img src={File} />,
      pdf: <img src={File} />,
      xls: <img src={File} />,
      psd: <img src={File} />,
      pptx: <img src={File} />,
      png: <img src={Img} />,
      jpg: <img src={Img} />,
      mp3: <img src={Adiuo} />,
      mp4: <img src={Video} />,
    };

    if (filteredFiles) {
      console.log(files);
      // let team = <img src={User}/>;
      const tmpRows = [];
      const tmpGrid = [];
      const user = <img src={User} />;

      filteredFiles.forEach((file) => {
        if (
          file.name &&
          file.dateCreated &&
          file.size &&
          file.name.split(".")[1] &&
          file.name.split("__")[1]
        ) {
          const actions = (
            <Button
              variant="light"
              style={{ padding: "7px" }}
              onClick={() => toggleDialog(file.name, file._id)}
            >
              <MdRestore style={{ color: "#F4B248", fontSize: "25px" }} />
            </Button>
          );

          const row = {
            id: file._id,
            all: iconsClasses[file.name.split(".")[1].toLowerCase()],
            name: file.name.split("__")[1].substr(0, 16),
            team: user,
            date: file.dateCreated.split("T")[0],
            file: file.name.split(".")[1],
            "file size": file.size.toPrecision(4),
            recovered: actions,
          };
          const gridCard = (
            <Card
              id={file._id}
              className="gridCard"
              style={{
                borderRadius: " 11px 11px 0px 0px",
                margin: "12% 4% 12% 4%",
                minWidth: "150px",
                maxHeight: "310px",
              }}
            >
              <Card.Body style={{ padding: "1%" }}>
                <Card.Img src={FileCard} />
                <Card.ImgOverlay>{actions}</Card.ImgOverlay>
                <Card.Title>
                  <p style={{ fontSize: "85%" }}>
                    {file.name.split("__")[1].substr(0, 13)}
                  </p>
                </Card.Title>
                <Card.Text style={{ backgroundColor: "#EFF0F2" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "right",
                      flexWrap: "wrap",
                    }}
                  >
                    <p
                      style={{ fontSize: "70%", marginLeft: "0", width: "50%" }}
                    >
                      Date of deletion{file.deleteToArchiv}
                    </p>
                    <p
                      style={{ fontSize: "70%", float: "right", width: "50%" }}
                    >
                      SIZE {(file.size * 1024).toPrecision(6).substr(0, 8)} KB
                    </p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          );

          tmpRows.push(row);
          tmpGrid.push(gridCard);
        }
      });
      setView(tmpRows);
      setGrid(tmpGrid);
    } else console.log("no files");
  };

  const toggleDialog = (name, id) => {
    console.log("toggle");
    setIsOpen(!isOpen);
    setName(name);
    setId(id);
  };

  const foldersVies = [];
  const folders = [];

  files.forEach((file) => {
    const folder = file.tags;

    if (folder != "" && folder != null && folder != undefined) {
      folders.push(folder);
    }
  });
  let stringArray = folders.map(JSON.stringify);
  let uniqueStringArray = new Set(stringArray);

  var foldersArr = [];

  uniqueStringArray.forEach((str) => {
    foldersArr.push(str);
  });

  foldersArr.forEach((folder) => {
    if (folder) {
      const clean = folder.replace(/^\["(.+)\"]$/, "$1");
      const button = (
        <button
          className="btn btn-outline-secondary"
          style={{ color: "gray", margin: "10px" }}
          // onClick={() => findByTag(clean)}
        >
          <img style={{ marginRight: "10px" }} src={Folder} />
          {clean}
        </button>
      );
      foldersVies.push(button);
    }
  });

  const buttonsViews = [];

  const buttons = [
    { text: "All", value: "all", num: all },
    { text: "File", value: "file", icon: File, num: file },
    { text: "Image", value: "img", icon: Img, num: img },
    { text: "Adiuo", value: "adiuo", icon: Adiuo, num: adiuo },
    { text: "Video", value: "video", icon: Video, num: video },
  ];

  buttons.forEach((Button) => {
    const button = (
      <Col style={{ padding: "0", margin: "0.5%" }}>
        <button
          className="btn btn-outline-secondary"
          id={Button.value}
          style={{ fontSize: "75%", width: "100%", margin: "0" }}
          // onClick={() => {
          //   filterFiles(Button.value);
          // }}
        >
          <img style={{ marginRight: "5%" }} src={Button.icon} />
          {Button.text} {Button.num}
        </button>
      </Col>
    );
    buttonsViews.push(button);
  });

  if (files.length == 0 && load == false) {
    return <EmptyTrash />;
  }

  return (
    <div>
      <RestorePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={name}
        id={id}
        loadFiles={loadFiles}
      />
      <Container fluid style={{ backgroundColor: "#EDEEF0" }}>
        <GoBack />
        <Container>
          <Col style={{ backgroundColor: "white", borderRadius: "8px" }}>
            <Row className="justify-content-md-center align-items-center">
              <Col
                md={4}
                style={{
                  height: "60px",
                  backgroundColor: "#F6F6FA",
                  borderRadius: "8px",
                  margin: "3%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#75798E",
                    margin: "0",
                    textAlign: "center",
                  }}
                >
                  Items In Trash Are Deleted Forever After 30 Days
                </p>
              </Col>
            </Row>
          </Col>
          {filteredFiles.length == 0 ? (
            <p>no files were found</p>
          ) : (
            <>
              {load ? (
                <Loader />
              ) : (
                <>
                  <ListDispalay
                    view={view}
                    setAllDisplay={setAllDisplay}
                    allDisplay={allDisplay}
                    TeamDisplay={TeamDisplay}
                    setTeamDisplay={setTeamDisplay}
                    showGrid={showGrid}
                  />
                  <GridDisplay showGrid={showGrid} grid={grid} />
                </>
              )}
            </>
          )}
        </Container>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.data.trashFiles,
    filteredFiles: state.data.filteredFiles,
    jwtFromCookie: state.data.jwtFromCookie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiles: (data) => dispatch(actions.setTrashFiles(data)),
    setFilteredFiles: (files) => dispatch(actions.setFilteredFiles(files)),
    setLocation: (location) => dispatch(actions.setLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
