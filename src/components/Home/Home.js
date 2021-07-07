import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import $ from "jquery";

import { Card } from "react-bootstrap";

import actions from "../../actions";

import Navbar from "../Navbar/Navbar";
import TopPattern from "./TopPattern/TopPattern";
import Folders from "./Folders/Folders";
import Files from "./Files/Files";
import UndoDelete from "../Home/Preview/UndoDelete/UndoDelete";
import Backdrop from "../Backdrop/Backdrop";
import Trash from "../Trash/Trash";
import Upload from "../Upload/Upload";
import Preview from "./Preview/Preview";
import CleanPreview from "./Preview/CleanPreview/CleanPreview";
import FullScreenFile from "./Preview/FullScreenFile/FullScreenFile";

import imgFile from "../../assets/file-solid.png";
import Img from "../../assets/image-regular.png";
import Adiuo from "../../assets/headphones-solid.png";
import Video from "../../assets/video-solid.png";
import SingleUser from "../../assets/user-solid.png";
import BigAudio from "../../assets/big-audio.png";
import BigVideo from "../../assets/big-video.png";
import BigFile from "../../assets/big-file.png";

import ImageIcon from "../../assets/image-icon.png";
import PdfIcon from "../../assets/pdf-icon.png";
import AudioIcon from "../../assets/audio-icon.png";
import VideoIcon from "../../assets/video-icon.png";
import FileIcon from "../../assets/file-icon.png";

import "./home.css";

import useLoadFiles from "../../hooks/useLoadFiles/useLoadFiles";

import {
  LOCAL_HOST,
  JWT_FROM_COOKIES,
  BASE_URL,
  LOGIN_PATH,
  USER_NAME,
  FIND_BY_TAG,
} from "../../utility/constants";

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
}) => {
  let history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [grid, setGrid] = useState([]);
  const [view, setView] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const [filter, setFilter] = useState([{}]);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [preview, setPreview] = useState(<CleanPreview showGrid={showGrid} />);
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
      document.cookie = "devJwt" + "=" + jwtGlobal + ";" + expires + ";path=/";
      window.location.replace(newUrl);
    }
    let tmpJwtFromCookie;
    if (window.location.href.includes("http://localhost:3000")) {
      tmpJwtFromCookie = JWT_FROM_COOKIES;
    } else {
      tmpJwtFromCookie = document.cookie
        ? document.cookie.slice(7) //according to: document.cookie === "devJwt=jwt_string"
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

  useEffect(() => {
    console.log("isFullScreen", isFullScreen);
  }, [isFullScreen]);

  const showPreFile = (file) => {
    if (file && file.name.split("__")[1] && file.dateCreated.split("T")[0]) {
      console.log("showPreFile", file);

      setPreview(
        <Preview
          file={file}
          findByTag={(folder) => {
            findByTag(folder);
          }}
          setShowBreadcrumb={setShowBreadcrumb}
          showGrid={showGrid}
          setPreview={setPreview}
          setShowToast={setShowToast}
          setDisplayPreview={setDisplayPreview}
          setIsFullScreen={setIsFullScreen}
        />
      );
    } else {
      setPreview(<CleanPreview showGrid={showGrid} />);
    }
  };

  const showFiles = () => {
    console.log("in showFiles");

    var iconsClasses = {
      ai: <img src={imgFile} />,
      docx: <img src={imgFile} />,
      pdf: <img src={imgFile} />,
      xls: <img src={imgFile} />,
      psd: <img src={imgFile} />,
      pptx: <img src={imgFile} />,
      png: <img src={Img} />,
      jpg: <img src={Img} />,
      jpeg: <img src={Img} />,
      mp3: <img src={Adiuo} />,
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

          let fileType = file.name.toLowerCase().split(".")[1];
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
            fileIcon = AudioIcon;
          } else if (fileType === "mp4") {
            fileIcon = VideoIcon;
          }

          const row = {
            id: file._id,
            all: iconsClasses[file.name.toLowerCase().split(".")[1]],
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
                width: "200px",
                height: "185px",
                overflow: "hidden",
                padding: "0",
                margin: "10px",
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

          $(".pre-file").addClass("show-grid-view");
          $(".pre-file").removeClass("on-list-display");
          $(".pre-file").addClass("on-grid-display");

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
      url: BASE_URL + USER_NAME + FIND_BY_TAG + folder,
      headers: { Authorization: jwtFromCookie },
      success: (data) => {
        console.log(data);
        setShowBreadcrumb(true);
        setCurrentPage(1);
        setFilter(data);
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

  return (
    <div>
      <div>
        <Navbar
          showGrid={showGrid}
          setShowGrid={setShowGrid}
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
          className={
            "home-container " +
            (location != "home"
              ? ""
              : !showGrid && displayPreview && "home-list-display")
            //  : !showGrid && "home-list-display show-grid-view")
          }
        >
          <TopPattern
            showGrid={showGrid}
            setShowGrid={setShowGrid}
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
                showGrid={showGrid}
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
              <Upload setShowBreadcrumb={setShowBreadcrumb} />
            </Route>
            <Route exact path="/:userName/trash">
              <Trash showGrid={showGrid} />
            </Route>
            {/* add protected route for admin */}
            {/* <Route/> add err page */}
          </Switch>
        </div>
        {displayPreview && preview}
        {/* {preview} */}
        {showToast && (
          <UndoDelete
            showToast={showToast}
            setShowToast={setShowToast}
            selectedFile={selectedFile}
          />
        )}
      </div>
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
