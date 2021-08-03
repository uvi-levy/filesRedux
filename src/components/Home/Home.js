import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import $ from "jquery";

import { Card } from "react-bootstrap";

import actions from "../../redux/actions";

import Navbar from "../Navbar/Navbar";
import TopPattern from "./TopPattern/TopPattern";
import Folders from "./Folders/Folders";
import Files from "./Files/Files";
import UndoDelete from "../Home/Preview/UndoDelete/UndoDelete";
import Backdrop from "../../utility/Backdrop/Backdrop";
import Trash from "../Trash/Trash";
import Upload from "../Upload/Upload";
import Preview from "./Preview/Preview";
import CleanPreview from "./Preview/CleanPreview/CleanPreview";
import FullScreenFile from "./Preview/FullScreenFile/FullScreenFile";
import Error from "../Error/Error";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import imgFile from "../../assets/file-solid.svg";
import Img from "../../assets/image-regular.svg";
import Audio from "../../assets/headphones-solid.svg";
import Video from "../../assets/video-solid.svg";
import SingleUser from "../../assets/user-solid.png";
import BigAudio from "../../assets/big-audio.svg";
import BigVideo from "../../assets/big-video.svg";
import BigFile from "../../assets/big-file.svg";

import ImageIcon from "../../assets/image-icon.svg";
import PdfIcon from "../../assets/pdf-icon.svg";
import FileIcon from "../../assets/file-icon.svg";

import "./home.css";

import useLoadFiles from "../../utility/cutomHooks/useLoadFiles/useLoadFiles";

import {
  JWT_FROM_COOKIES,
  USER_NAME,
  FIND_BY_TAG,
} from "../../utility/constants";

import keys from "../../config/env/keys";

const Home = ({
  data,
  files,
  trashFiles,
  filteredFilesByType,
  loadFolders,
  setFilteredFiles,
  filteredFiles,
  jwtFromCookie,
  setJwtFromCookie,
  location,
  showGrid,
}) => {
  let history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [grid, setGrid] = useState([]);
  const [view, setView] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const [filter, setFilter] = useState([{}]);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [preview, setPreview] = useState(<CleanPreview />);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const loadFiles = useLoadFiles();

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let jwtGlobal = params.get("jwt");
    if (jwtGlobal) {
      let newUrl = window.location.href;
      newUrl = newUrl.split("?jwt=");
      newUrl = newUrl[0];
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      var expires = "expires=" + date;
      document.cookie = keys.JWT + "=" + jwtGlobal + ";" + expires + ";path=/";
      window.location.replace(newUrl);
    }
    let tmpJwtFromCookie;
    if (window.location.href.includes(keys.BASE_CLIENT_URL)) {
      tmpJwtFromCookie = JWT_FROM_COOKIES;
    } else {
      if (keys.JWT === "devJwt")
        tmpJwtFromCookie = document.cookie
          ? document.cookie.slice(7) //according to: document.cookie === "devJwt=jwt_string"
          : null;
      else
        tmpJwtFromCookie = document.cookie
          ? document.cookie.slice(4) //according to: document.cookie === "jwt=jwt_string"
          : null;
    }
    setJwtFromCookie(tmpJwtFromCookie);
    loadFiles(tmpJwtFromCookie);
  }, []);

  useEffect(() => {
    console.log("files==" + files);
    if (history) history.push("/" + USER_NAME);
    if (files.length > 0) {
      filteredFilesByType();
    }
  }, [files, history]);

  useEffect(() => {
    if (data) loadFolders();
  }, [data]);

  useEffect(() => {
    showFiles();
  }, [filteredFiles]);

  const showPreFile = (file) => {
    if (file && file.name.split("__")[1] && file.dateCreated.split("T")[0]) {
      console.log("showPreFile", file);

      setPreview(
        <Preview
          file={file}
          setFile={setSelectedFile}
          findByTag={(folder) => {
            findByTag(folder);
          }}
          setShowBreadcrumb={setShowBreadcrumb}
          setPreview={setPreview}
          setShowToast={setShowToast}
          setDisplayPreview={setDisplayPreview}
          setIsFullScreen={setIsFullScreen}
        />
      );
    } else {
      setPreview(<CleanPreview />);
    }
  };

  const showFiles = () => {
    console.log("in showFiles");

    var iconsClasses = {
      ai: <img src={imgFile} />,
      docx: <img src={imgFile} />,
      pdf: <img src={PdfIcon} />,
      xls: <img src={imgFile} />,
      psd: <img src={imgFile} />,
      pptx: <img src={imgFile} />,
      png: <img src={Img} />,
      jpg: <img src={Img} />,
      jpeg: <img src={Img} />,
      mp3: <img src={Audio} />,
      mp4: <img src={Video} />,
      gif: <img src={Img} />,
    };
    const tmpRows = [];
    const tmpGrid = [];
    if (filteredFiles) {
      var sortFilesByDate = filteredFiles.slice().reverse();
      console.log(sortFilesByDate);

      const user = <img src={SingleUser} />;
      sortFilesByDate.forEach((file) => {
        if (
          file.name &&
          file.dateCreated &&
          file.size &&
          file.name.split(".")[1] &&
          file.name.split("__")[1]
        ) {
          let filePreview;
          let viewIcon;
          if (file.type) {
            if (file.type.includes("video")) viewIcon = BigVideo;
            if (file.type.includes("audio")) viewIcon = BigAudio;
            if (file.type.includes("pdf")) viewIcon = BigFile;
            if (file.type.includes("image")) viewIcon = BigFile;
          } else {
            viewIcon = BigFile;
          }

          if (
            file.name.toLowerCase().split(".")[1] == "png" ||
            file.name.toLowerCase().split(".")[1] == "jpg" ||
            file.name.toLowerCase().split(".")[1] == "jpeg" //replace file.type.includes("image")
          ) {
            filePreview = (
              <Card.Text
                style={{
                  height: "145px",
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  backgroundColor: "#EFF0F2",
                  marginBottom: "0",
                  marginTop: "0",
                }}
              >
                <img
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                  src={file.url}
                />
              </Card.Text>
            );
          } else {
            filePreview = (
              <Card.Text
                style={{
                  height: "145px",
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  backgroundColor: "#EFF0F2",
                  marginBottom: "0",
                  marginTop: "0",
                }}
              >
                <img
                  style={{
                    display: "block",
                    maxHeight: "60%",
                    margin: "auto",
                  }}
                  src={viewIcon}
                />
              </Card.Text>
            );
          }

          let fileType = file.name.toLowerCase().split(".");
          fileType = fileType[fileType.length - 1];
          let fileIcon = ImageIcon;
          if (
            fileType === "png" ||
            fileType === "jpg" ||
            fileType === "jpeg" ||
            fileType === "gif"
          ) {
            fileIcon = ImageIcon;
          } else if (
            fileType === "ai" ||
            fileType === "docx" ||
            fileType === "xls" ||
            fileType === "psd" ||
            fileType === "pptx"
          ) {
            fileIcon = FileIcon;
          } else if (fileType === "pdf") {
            fileIcon = PdfIcon;
          } else if (fileType === "mp3") {
            fileIcon = Audio;
          } else if (fileType === "mp4") {
            fileIcon = Video;
          }

          let icon = file.name.toLowerCase().split(".");
          icon = icon[icon.length - 1];
          icon = iconsClasses[icon];

          const row = {
            id: file._id,
            all: icon,
            name: file.name.split("__")[1].substr(0, 19),
            team: user,
            date: file.dateCreated.split("T")[0].substr(2),
            file: file.name.split(".")[1],
            "file size": (file.size * 1024).toPrecision(4) + " KB",
          };
          const gridCard = (
            <Card
              id={file._id}
              className="gridCard"
              onClick={() => findFile(null, null, null, file._id)}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                padding: "0",
                margin: "10px 20px 10px 0",
              }}
            >
              <Card.Body
                style={{ padding: "0px", cursor: "pointer", marginBottom: "0" }}
              >
                {filePreview}
                <Card.Title
                  style={{
                    padding: "0",
                    textAlign: "left",
                    justifyContent: "center",
                    marginTop: "3px",
                  }}
                >
                  <img
                    src={fileIcon}
                    style={{
                      width: "12px",
                      marginLeft: "7px",
                      marginRight: "3px",
                    }}
                  ></img>
                  <p
                    style={{
                      fontSize: "70%",
                      marginLeft: "1%",
                      display: "inline",
                    }}
                  >
                    {file.name.split("__")[1].substr(0, 16)}
                  </p>
                </Card.Title>
              </Card.Body>
            </Card>
          );

          tmpRows.push(row);
          tmpGrid.push(gridCard);
        }
      });
    } else console.log("no files");
    setView(tmpRows);
    setGrid(tmpGrid);
  };

  const findFile = (row, isSelect, tmpRowIndex, checkBoxValue) => {
    console.log("in findFile " + isSelect);
    var cards = $(".gridCard");
    cards.css("outline", "none ");

    if (row) {
      if (row.id.includes("folder")) {
        console.log(row.id);
        findByTag(row.name);
      }
    }
    console.log("checkBoxValue" + checkBoxValue);
    if (typeof checkBoxValue === "string") {
      if (checkBoxValue.includes("folder")) {
        console.log(checkBoxValue.split("/")[1]);
        findByTag(checkBoxValue.split("/")[1]);
      }
    }

    files.forEach((file) => {
      if (row) {
        if (file._id == row.id) {
          console.log("file list", file);

          if (isSelect) {
            console.log("isSelect", isSelect);
            showPreFile(file);
            setDisplayPreview(true);

            setSelectedFile(file);
            setRowIndex(tmpRowIndex);
          }
        }
      }

      if (checkBoxValue) {
        if (file._id == checkBoxValue) {
          console.log("file grid", file);

          var card = $("#" + checkBoxValue);
          card.css("outline", "1px solid #8181A5 ");
          console.log("checkBoxValue", checkBoxValue);

          setDisplayPreview(true);

          showPreFile(file);

          setSelectedFile(file);
          setRowIndex(tmpRowIndex);
        }
      }
    });
  };

  const findByTag = (folder) => {
    console.log("in findByTag");
    console.log(folder);
    console.log(jwtFromCookie);
    $.ajax({
      type: "GET",
      url: keys.BASE_URL + USER_NAME + FIND_BY_TAG + folder,
      headers: { Authorization: jwtFromCookie },
      success: (data) => {
        console.log(data);
        setBreadCrumbs("/ " + folder);
        setShowBreadcrumb(true);
        setCurrentPage(1);
        setFilteredFiles(data);
      },
      error: (err) => {
        alert("please try again later");
      },
    });
  };

  const changeProps = (files) => {
    console.log("filesChangeProps" + files);

    setFilteredFiles(files);
    setShowBreadcrumb(false);
    setCurrentPage(1);
  };

  let TokenToString =
    document.cookie && document.cookie.includes("devJwt")
      ? document.cookie
          .split(";")
          .filter((s) => s.includes("devJwt"))[0]
          .split("=")
          .pop()
      : null;

  return (
    <div>
      <Switch>
        <div>
          <Navbar
            changeProps={changeProps}
            files={files}
            trashFiles={trashFiles}
          />

          {showGrid && displayPreview && <Backdrop />}

          {isFullScreen && (
            <>
              <Backdrop />
              <FullScreenFile
                file={selectedFile}
                setDisplayPreview={setDisplayPreview}
                setIsFullScreen={setIsFullScreen}
              />
            </>
          )}

          <div
            style={{
              width: "100vw",
              height: "calc( 100vh - 70px )",
              padding: "1%",
            }}
          >
            <div
              className={
                "home-container " +
                (location != "home"
                  ? ""
                  : !showGrid && displayPreview && "home-list-display")
              }
            >
              <TopPattern
                breadCrumbs={breadCrumbs}
                showBreadcrumb={showBreadcrumb}
                setDisplayPreview={setDisplayPreview}
              />
              <Switch>
                <Route exact path="/:userName">
                  <Folders
                    changeProps={changeProps}
                    setBreadCrumbs={setBreadCrumbs}
                    setShowBreadcrumb={setShowBreadcrumb}
                  />
                  <Files
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    showFiles={showFiles}
                    grid={grid}
                    view={view}
                    filter={filter}
                    findFile={findFile}
                  />
                </Route>

                <Route exact path="/:userName/upload">
                  <Upload
                    setShowBreadcrumb={setShowBreadcrumb}
                    setDisplayPreview={setDisplayPreview}
                  />
                </Route>
                <Route exact path="/:userName/trash">
                  <Trash setDisplayPreview={setDisplayPreview} />
                </Route>
              </Switch>
            </div>
            {displayPreview && preview}
            {showToast && (
              <UndoDelete
                showToast={showToast}
                setShowToast={setShowToast}
                selectedFile={selectedFile}
              />
            )}
          </div>
        </div>

        <ProtectedRoute
          // path={"/admin/:userName"}
          user={TokenToString}
          component={Home}
        />

        <Route component={Error} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.data.files,
    data: state.data.data,
    filteredFiles: state.data.filteredFiles,
    trashFiles: state.data.trashFiles,
    jwtFromCookie: state.data.jwtFromCookie,
    location: state.data.location,
    showGrid: state.data.showGrid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filteredFilesByType: () => dispatch(actions.filteredFilesByType()),
    loadFolders: () => dispatch(actions.loadFolders()),
    setFilteredFiles: (files) => dispatch(actions.setFilteredFiles(files)),
    setJwtFromCookie: (jwt) => dispatch(actions.setJwtFromCookie(jwt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
