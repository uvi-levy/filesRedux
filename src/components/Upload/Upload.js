import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import uploadImg from "../../assets/upload.png";
import File from "../../assets/file-solid.png";
import Img from "../../assets/image-regular.png";
import Adiuo from "../../assets/headphones-solid.png";
import Video from "../../assets/video-solid.png";

import imageCompression from "browser-image-compression";

import SuccessPopup from "./SuccessPopup/SuccessPopup";

import "./upload.css";

import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  ProgressBar,
} from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import $ from "jquery";

import GoBack from "../GoBack/GoBack";
import actions from "../../actions";

import {
  BASE_URL,
  USER_NAME,
  UPLOAD_MULTIPLE_FILES,
  SAVE_MULTI_FILES_DB,
} from "../../utility/constants";
import UploadBtn from "../UploadBtn/UploadBtn";

import useLoadFiles from "../../hooks/useLoadFiles/useLoadFiles";

window.$ = $;

let iconsClasses = {
  ai: <img src={File} />,
  docx: <img src={File} />,
  pdf: <img src={File} />,
  xls: <img src={File} />,
  psd: <img src={File} />,
  pptx: <img src={File} />,
  png: <img src={Img} />,
  jpg: <img src={Img} />,
  jpeg: <img src={Img} />,
  mp3: <img src={Adiuo} />,
  mp4: <img src={Video} />,
};

const Upload = ({ jwtFromCookie, folders, setShowBreadcrumb, setLocation }) => {
  const loadFiles = useLoadFiles();

  const fileInputRef = useRef("");

  const [loadBar, setLoadBar] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filesToUp, setFilesToUp] = useState([]);
  const [uploadFile, setUploadFile] = useState([]);
  const [upload, setUpload] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [inputFile, setInputFile] = useState(true);
  const [showFiles, setShowFiles] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [progressColor, setProgressColor] = useState("#F4B248"); //change color
  const [loadedAjax1, setLoadedAjax1] = useState(0);
  const [loadedAjax2, setLoadedAjax2] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoadBar(true);
    setShowBreadcrumb(false);
    setLocation("upload");
    document
      .getElementById("dropdown-menu-align-right")
      .classList.remove("btn-primary");
  }, []);

  const saveFiles = async (files) => {
    const rows = [];
    console.log("saveFiles");
    setUpload(false);
    setShowFiles(true);
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();

    date = yyyy + "-" + mm + "-" + dd;

    let compressedFiles = [];
    if (files) {
      console.log("files", files);
      let myFiles = Object.values(files);

      let compressedFile;
      await Promise.all(
        myFiles.map(async (file) => {
          if (file.type.includes("image")) {
            console.log("in img type");
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };
            console.log(file);

            compressedFile = await imageCompression(file, options);

            console.log("compressedFile  " + JSON.stringify(compressedFile));
            console.log(
              "compressedFile instanceof Blob",
              compressedFile instanceof Blob
            ); // true
            console.log(
              `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            );
          } else {
            compressedFile = file;
          }
          const row = {
            all: iconsClasses[compressedFile.name.split(".")[1].toLowerCase()],
            name: compressedFile.name,
            date: date,
            file: compressedFile.name.split(".")[1],
            "file size": (compressedFile.size / 1024).toPrecision(4) + " KB",
            regret: (
              <Button
                letiant="outline-danger"
                style={{
                  backgroundColor: "#F4B248",
                  border: "none",
                }}
                onClick={() => removeFile(compressedFile.name)}
              >
                X
              </Button>
            ),
          };
          rows.push(row);
          compressedFiles.push(compressedFile);
        })
      );
    }
    setUploadFile(compressedFiles);
    setFilesToUp(rows);
    setShowFiles(true);
    setInputFile(false);
  };

  const removeFile = (fileToRemove) => {
    // console.log("uploadFile in remove file", uploadFile) ;
    // console.log("filesToUp in remove file", filesToUp) ;
    // debugger;
    console.log(fileToRemove);
    let files = Object.values(uploadFile);
    files.forEach((file) => {
      if (file.name == fileToRemove) {
        files.pop(file);
      }
    });
    let FilesToUp = filesToUp;
    FilesToUp.forEach((row) => {
      if (row.name == fileToRemove) {
        FilesToUp.pop(row);
      }
    });
    setFilesToUp(FilesToUp);
    setUploadFile(files);
  };

  const backToHome = () => {
    console.log("in backToHome");
    setLoadedAjax1(0);
    setLoadedAjax2(0);
    loadFiles();
  };

  const uploadMulti = (SelectedFolder) => {
    let formData = new FormData();
    let myFiles = Object.values(uploadFile);
    console.log("files" + uploadFile.length);
    console.log(myFiles);
    if (!myFiles[0].name) {
      alert("ooops... not files to upload");
    } else {
      if (SelectedFolder != "None") formData.append("tags", SelectedFolder);
      myFiles.forEach((file, index) => {
        if (file.size > 2097152) {
          alert(
            `sorry, the file ${file.name} is too big file, Please remove it from the list`
          );
        } else {
          if (
            !file.type.includes("image") &&
            !file.type.includes("video") &&
            !file.type.includes("audio") &&
            !file.type.includes("pdf")
          ) {
            alert(
              `sorry, the file ${file.name} is not support, Please remove it from the list`
            );
          } else {
            formData.append("files" + index, file, file.name);
            console.log("file", file);
          }
        }
      });
      console.log(formData.entries().next().value);
      if (!!formData.entries().next().value == true) {
        console.log("ok");
        setLoader(true);
        $.ajax({
          xhr: () => {
            let xhr = new XMLHttpRequest();
            xhr.upload.onloadstart = function () {
              console.log("Upload has started.");
            };

            xhr.upload.onprogress = (event) => {
              let uploadedBytes = (event.loaded / event.total) * 100;
              console.log(`Uploaded ${uploadedBytes} bytes 072-2467000
                    `);
              setLoadedAjax1(uploadedBytes);
              if (uploadedBytes > 90) {
                setLoadedAjax1(90);
              }

              if (cancel == true) {
                xhr.abort();
              }
            };

            xhr.upload.onload = function () {
              console.log("Upload completed successfully.");
            };

            xhr.upload.onerror = function () {
              console.log(`Error during the upload: ${xhr.status}.`);
            };
            return xhr;
          },
          url: BASE_URL + USER_NAME + UPLOAD_MULTIPLE_FILES,
          method: "post",
          contentType: false,
          processData: false,
          headers: { authorization: jwtFromCookie },
          data: formData,
          error: (err) => {
            alert("err");
          },
          success: (data) => {
            let myData = { files: data.filesData };
            console.log(
              "finish first ajax  " +
                JSON.stringify(myData) +
                "...." +
                data.filesData
            );
            setTimeout(() => {
              $.ajax({
                xhr: () => {
                  let xhr = new XMLHttpRequest();

                  xhr.upload.onloadstart = function () {
                    console.log("Upload has started.");
                  };

                  xhr.upload.onprogress = (event) => {
                    let uploadedBytes = (event.loaded / event.total) * 10;
                    console.log(`Uploaded ${uploadedBytes} bytes`);
                    setLoadedAjax2(uploadedBytes);
                    setProgressColor("#F4B248");
                  };

                  xhr.upload.onload = () => {
                    console.log("Upload completed successfully.");
                  };

                  xhr.upload.onerror = function () {
                    console.log(`Error during the upload: ${xhr.status}.`);
                  };
                  return xhr;
                },
                url: BASE_URL + USER_NAME + SAVE_MULTI_FILES_DB,
                method: "POST",

                headers: { authorization: jwtFromCookie },
                data: myData,
                error: (err) => {
                  console.log("err", err);
                  alert("upload canceled");
                  backToHome();
                },
                success: (data) => {
                  setLoader(false);

                  console.log("upload success", data);
                  setIsOpen(true);
                  setTimeout(() => {
                    setIsOpen(false);
                    backToHome();
                  }, 1000);
                },
              });
            }, 2000);
          },
        });
      }
    }
  };

  const Cancel = () => {
    setCancel(true);
  };

  const saveFolder = (SelectedFolder) => {
    console.log("in saveFolder", SelectedFolder);
    console.log(SelectedFolder);
    setSelectedFolder(SelectedFolder);
    uploadMulti(SelectedFolder);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    saveFiles(files);
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      saveFiles(fileInputRef.current.files);
    }
  };

  const columns = [
    {
      dataField: "all",
      text: "ALL",
      sort: true,
      align: "center",
      style: { width: "7%", direction: "ltr" },
      headerAlign: "center",
    },
    {
      dataField: "name",
      text: "name",
      sort: true,
      headerAlign: "center",
      style: { width: "14%" },
    },
    {
      dataField: "date",
      text: "date",
      align: "center",
      sort: true,
      style: { width: "14%" },
      headerAlign: "center",
    },
    {
      dataField: "file",
      text: "file",
      sort: true,
      align: "center",
      style: { width: "7%" },
      headerAlign: "center",
    },
    {
      dataField: "file size",
      text: "size",
      align: "center",
      sort: true,
      style: { width: "7%" },
      headerAlign: "center",
    },
    {
      dataField: "regret",
      text: "regret",
      align: "center",
      sort: true,
      style: { width: "7%" },
      headerAlign: "center",
    },
  ];

  const notFiles = (
    <Row>
      <Col>oopsss...no files found 😞</Col>
      <Col>
        {" "}
        <Button
          style={{ backgroundColor: "#F4B248", border: "none" }}
          onClick={() => {
            setInputFile(true);
            setShowFiles(false);
          }}
        >
          back to upload
        </Button>
      </Col>
    </Row>
  );

  const uploadBtnStyle = {
    marginTop: "10px",
  };

  return (
    <>
      <SuccessPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container fluid style={{ marginTop: "1%" }}>
        <Row>
          <Col
            style={{
              backgroundColor: "white",
              borderRadius: "12px 0 0 12px",
            }}
          >
            <Row>
              <Col>
                <GoBack />
              </Col>
            </Row>
            <Row>
              <Col style={{ display: inputFile ? "block" : "none" }}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "auto",
                  }}
                >
                  <div
                    id="fileUp"
                    onClick={fileInputClicked}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    style={{
                      width: "70%",
                      height: "100%",
                      border: "4px dashed #E8E7F2",
                      textAlign: "center",
                      overflow: "hidden",
                      padding: "2%",
                    }}
                  >
                    <img src={uploadImg} style={{ marginBottom: "3%" }} />
                    <h2
                      style={{
                        color: "#3A405E",
                        font: "normal normal medium 32px/43px Roboto",
                        letterSpacing: "0.58px",
                      }}
                    >
                      <p style={{ display: "inline" }}>
                        {" "}
                        Upload or drag your files here
                      </p>{" "}
                      <UploadBtn isLink={false} style={uploadBtnStyle} />
                    </h2>
                  </div>
                  <input
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    multiple
                    onChange={filesSelected}
                  />
                </div>
              </Col>

              <Col
                style={{
                  minHeight: "80vh",
                  textAlign: "center",
                  padding: "0.5%",
                  display: showFiles ? "block" : "none",
                }}
              >
                {" "}
                <div style={{ width: "80%", margin: "10%", marginTop: "10%" }}>
                  <BootstrapTable
                    keyField="id"
                    data={filesToUp}
                    columns={columns}
                    noDataIndication={notFiles}
                    bordered={false}
                    striped
                    hover
                    condensed
                    search
                  />
                </div>
                <Container style={{ marginTop: "10%" }}>
                  <Row
                    className="align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#F8F8F8",
                      width: "100%",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    <Col
                      className="align-items-center"
                      sm={6}
                      style={{ textAlign: "center" }}
                    >
                      <p
                        style={{
                          color: "#3A405E",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Which folder do you want to associate your files with?
                      </p>
                    </Col>
                    <Col
                      className="align-items-center"
                      sm={3}
                      style={{ textAlign: "left" }}
                    >
                      <DropdownButton
                        className="folders-dropdown"
                        alignRight
                        title={
                          selectedFolder ? selectedFolder : "Choose folder"
                        }
                        id="dropdown-menu-align-right"
                        onSelect={saveFolder}
                      >
                        <Dropdown.Item eventKey="None">None</Dropdown.Item>
                        {folders.map(
                          (folder) =>
                            folder.name && (
                              <Dropdown.Item eventKey={folder.name}>
                                {folder.name}
                              </Dropdown.Item>
                            )
                        )}
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    {loader && (
                      <>
                        <Col>
                          <ProgressBar
                            variant={progressColor}
                            animated
                            now={loadedAjax1 + loadedAjax2}
                            label={`${
                              Math.round(loadedAjax1) + Math.round(loadedAjax2)
                            }%`}
                          />
                        </Col>
                        <Col onClick={Cancel}>X</Col>
                      </>
                    )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    folders: state.data.folders,
    jwtFromCookie: state.data.jwtFromCookie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) => dispatch(actions.setLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
