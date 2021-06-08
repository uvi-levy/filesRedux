import React, { useEffect, useState } from 'react'
import $, { data } from "jquery";

import { connect } from "react-redux";

import actions from "../../../actions";

import { Row, Col, Button, OverlayTrigger, Tooltip, Container, Card } from "react-bootstrap";

import NoFiles from "./NoFiles/NoFiles";

import Loader from "../../../assets/loader.gif";

import Print from "../../../assets/print.png";
import Copy from "../../../assets/copy.png";
import Delete from "../../../assets/delete.png";
import Move from "../../../assets/moveTo.png";
import Download from "../../../assets/download.png";
import Share from "../../../assets/share.png";
import Link from "../../../assets/link.png";
import LinkW from "../../../assets/linkWhite.png";
import imgFile from "../../../assets/file-solid.png";
import Img from "../../../assets/image-regular.png";
import Adiuo from "../../../assets/headphones-solid.png";
import Video from "../../../assets/video-solid.png";
import SingleUser from "../../../assets/user-solid.png";
import BigAudio from "../../../assets/big-audio.png";
import BigVideo from "../../../assets/big-video.png";
import BigFile from "../../../assets/big-file.png";
import FileCard from "../../../assets/Group.png";

import Folder from "../../../assets/folder-solid.png";
import Note from "../../../assets/edit.svg";

import ImageIcon from "../../../assets/image-icon.png";
import PdfIcon from "../../../assets/pdf-icon.png";
import AudioIcon from "../../../assets/audio-icon.png";
import VideoIcon from "../../../assets/video-icon.png";
import FileIcon from "../../../assets/file-icon.png";

import "./files.css"
import GridDispaly from './GridDisplay/GridDispaly';
import ListDispaly from './ListDispaly/ListDispaly';
import PageNumbers from './PageNumbers/PageNumbers';

const Files = ({ isLoadFolders, files, isLoadFiles, jwtFromCookie, setShowBreadcrumb, showGrid, folders, loadFolders }) => {

    const [visibleDel, setVisibleDel] = useState(false);
    const [grid, setGrid] = useState([]);
    const [view, setView] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [rowIndex, setRowIndex] = useState(0);
    const [folderName, setFolderName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(12);
    const [filter, setFilter] = useState([{}]);
    const [inFolder, setInFolder] = useState(true);
    const [filePreview, setFilePreview] = useState(
            <p style={{ margin: "0", color: "#75798E" }}>no Preview Available</p>);

    useEffect(() => {
        loadFolders();
        showFiles();
    }, [])

    useEffect(() => {
        loadFolders();
    }, [files])

    useEffect(() => {
        showFiles();
    }, [folders, filter])

    const toggleDeleteDialog = () => {
      setVisibleDel(!visibleDel);
    }

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
              console.log(file);
    
              if (isSelect) {
                // showPreFile(file);  //preview
    
                setSelectedFile(file);
                setRowIndex(tmpRowIndex);
              }
            }
          }
    
          if (checkBoxValue) {
            if (file._id == checkBoxValue) {
              console.log(file);
    
              var card = $("#" + checkBoxValue);
              card.css("outline", "1px solid #8181A5 ");
              // showPreFile(file);  //preview
    
              setSelectedFile(file);
              setRowIndex(tmpRowIndex);
            }
          }
        });
    }

    const findByTag = (folder) => {
    let url = window.location;
    let userName = url.pathname.split("/")[1];
    console.log("in findByTag");
    console.log(folder);
    setFolderName(folder);
    console.log(jwtFromCookie);
    $.ajax({
        type: "GET",
        url:
        "https://files.codes/api/" +
        userName +
        "/findByTag/" +
        folder,
        headers: { Authorization: jwtFromCookie },
        success: (data) => {
        console.log(data);
        setShowBreadcrumb(true);
        setCurrentPage(1);
        setFilter(data);
        setInFolder(false);
        },
        error: (err) => {
        alert("please try again later");
        },
    });
    };

    const showPreFile = (file) => {
        if (file) {
          console.log("showPreFile", file);
    
          var preFile;
          var folderButton = (
            <button
              className="btn btn-outline-secondary folderBtn"
              style={{ color: "gray", border: "none" }}
            >
              <img src={Folder} /> /
            </button>
          );
          var p = $("p");
          p.attr("contenteditable", "false");
          p.css("border", "none ");
    
          if (file.tags != null && file.tags != "" && file.tags != []) {
            const folders = file.tags.split("/");
            console.log(folders);
            const folder = folders[folders.length - 1];
            console.log(folder);
    
            folderButton = (
              <button
                className="btn btn-outline-secondary folderBtn"
                style={{ color: "gray", border: "none" }}
                onClick={() => findByTag(folder)}
              >
                <img src={Folder} />
                {folder}
              </button>
            );
          }
    
          var notes = [];
          console.log(file.notes);
          file.notes.forEach((note, index) => {
            const fileNotes = (
              <Row key={index}>
                <Col md={10} style={{ color: "#363839", textAlign: "left" }}>
                  <Row>
                    <Col md={5}>
                      <p
                        className="notes"
                        id={"note" + index}
                        onKeyDown={(e) =>
                          this.saveEditNote(e, note, note.note, file)
                        }
                      >
                        {note.note}
                      </p>
                    </Col>
                    <Col md={3}>
                      <p style={{ float: "right", fontSize: "75%" }}>
                        {note.editor}
                      </p>
                    </Col>
                    <Col md={5}>
                      <p style={{ float: "right", fontSize: "70%" }}>{note.date}</p>
                    </Col>
                  </Row>
    
                  <hr />
                </Col>
                <Col>
                  <img
                    onClick={() => this.editNote(note, file)}
                    style={{ float: "right", cursor: "pointer" }}
                    src={Note}
                  />
                </Col>
              </Row>
            );
            notes.push(fileNotes);
            console.log("indexNotes" + index);
          });
    
          const sharedUsers = [];
          file.sharedUsers.forEach((mail) => {
            const share = (
              <div>
                <a href={"mailto:" + mail}>{mail}</a> <br />
              </div>
            );
            sharedUsers.push(share);
          });
          const hoverButtonsAction = [
            {
              text: "Delete",
              value: "delete",
              icon: Delete,
              border: "none",
              txtColor: "gray",
              fun: toggleDeleteDialog,
            },
            {
              text: "Duplication",
              value: "copy",
              icon: Copy,
              border: "groove  1px",
              txtColor: "DeepSkyBlue",
              fun: this.copyFile,
            },
            {
              text: "Move To",
              value: "move",
              icon: Move,
              border: "none",
              color: "purple",
              txtColor: "HotPink",
              fun: this.moveTo,
            },
            {
              text: "Download",
              value: "download",
              icon: Download,
              border: "none",
              txtColor: "gray",
              fun: this.download,
            },
            {
              text: "Print",
              value: "print",
              icon: Print,
              border: "groove  1px",
              txtColor: "gray",
              fun: this.printFile,
            },
            {
              text: "Share",
              value: "share",
              icon: Share,
              border: "none",
              txtColor: "gray",
              fun: this.toggleDialog,
            },
            {
              text: "Get Link",
              value: "link",
              icon: Link,
              border: "none",
              txtColor: "gray",
              fun: this.toggleGetLink,
            },
    
            // {text:"Embed",value:"embed",icon:Embed,border:'none',txtColor:'gray',fun:this.copyEmbed}
          ];
          const hoverButtonsActionViews = hoverButtonsAction.map((button) => {
            return (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip>
                    <span>{button.text}</span>
                  </Tooltip>
                }
              >
                <img
                  variant="light"
                  style={{
                    color: "#8181A5",
                    backgroundColor: "#FFFFFF",
                    cursor: "pointer",
                    border: "none",
                    textAlign: "left",
                    padding: "10px",
                  }}
                  onClick={() => button.fun()}
                  src={button.icon}
                />
              </OverlayTrigger>
            );
          });
    
          if (
            file.name.toLowerCase().split(".")[1] == "png" ||
            file.name.toLowerCase().split(".")[1] == "jpg" ||
            file.name.toLowerCase().split(".")[1] == "jpeg"
          ) {
            preFile = (
              <div
                style={{
                  height: "150px",
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  backgroundColor: "#EFF0F2",
                  marginBottom: "0",
                }}
              >
                <img
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    margin: "auto",
                  }}
                  ref={this.imgRef}
                  src={file.url}
                />
              </div>
            );
          } else {
            preFile = (
              <div style={{ maxHeight: "250px", width: "100%" }}>
                <iframe
                  src={file.url}
                  style={{ width: "50%", height: "50%" }}
                  autoplay="0"
                  autostart="0"
                  allowfullscreen
                  ref={this.imgRef}
                  muted
                ></iframe>
              </div>
            );
          }
          var fileUrl = (
            <Container
              fluid
              style={{
                width: "95%",
                color: "#8181A5",
                display: "block",
                overFlow: "scroll",
              }}
            >
              <Row style={{ textAlign: "center", marginTop: "0.5%" }}>
                <Col>{hoverButtonsActionViews}</Col>
              </Row>
              <hr />
              <Row className="justify-content-md-center">
                <Col
                  style={{
                    width: "98%",
    
                    textAlign: "center",
                  }}
                >
                  {preFile}
                </Col>
              </Row>
    
              <div>
                <Row className="justify-content-md-center">
                  <Col md={7}>
                    <p style={{ fontWeight: "bold", margin: "4%" }}>
                      {file.name.split("__")[1].substr(0, 15)}
                    </p>
                  </Col>
                  <Col md={4}>{folderButton} </Col>
                </Row>
                <Row
                  className="justify-content-md-center"
                  style={{ marginTop: "1%" }}
                >
                  <Col
                    md={10}
                    style={{
                      marginRight: "0px",
                      padding: "0",
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    <textarea
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: "#F6F6FA",
                        fontSize: "60%",
                        resize: "none",
                        float: "right",
                      }}
                      ref={this.textAreaLinkRef}
                      value={file.url}
                    ></textarea>
                  </Col>
                  <Col style={{ padding: "0" }}>
                    <Button
                      variant="primary"
                      onClick={this.getLink}
                      style={{
                        borderRadius: "0 8px 8px 0 ",
                        float: "left",
                        margin: "0",
                      }}
                    >
                      <img src={LinkW} />
                    </Button>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={5}>
                    {" "}
                    <p style={{ marginBottom: "0" }}>
                      Date Created{" "}
                      <p style={{ color: "#363839", display: "inline" }}>
                        {file.dateCreated.split("T")[0].substr(2)}
                      </p>
                    </p>{" "}
                  </Col>
                  <Col md={5}>
                    {" "}
                    <p style={{ float: "right", marginBottom: "1%" }}>
                      Size{" "}
                      <p style={{ color: "#363839", display: "inline" }}>
                        {" "}
                        {(file.size * 1024).toPrecision(4) + " KB"}
                      </p>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    {" "}
                    <p>
                      Shared With{" "}
                      <p style={{ color: "#363839", display: "inline" }}>
                        {sharedUsers}
                      </p>
                    </p>
                  </Col>
                  <Col md={6}>
                    {" "}
                    <p style={{ float: "right" }}>
                      Format{" "}
                      <p style={{ color: "#363839", display: "inline" }}>
                        {file.name.toLowerCase().split(".")[1]}
                      </p>
                    </p>
                  </Col>
                </Row>
                <Row className="justify-content-between">
                  <Col>Notes</Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <hr />
                    {notes}
                    <Row>
                      <Col style={{ position: "relative" }}>
                        <textarea
                          placeholder="Add your note here..."
                          ref={this.textAreaNoteRef}
                          style={{
                            width: "100%",
                            height: "100px",
                            resize: "none",
                            border: "none",
                            outline: "0.2px solid #8181A5",
                            display: "block",
                          }}
                          onKeyPress={(e) => {
                            this.saveNotes(e);
                          }}
                        />
                        <Button
                          onClick={() => this.saveNotes("save")}
                          style={{
                            color: "#8181A5",
                            padding: "0.5%",
                            float: "right",
                            position: "absolute",
                            bottom: "30%",
                            right: "5%",
                          }}
                          variant="outline-dark"
                        >
                          save +
                        </Button>
                        <hr />
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Container>
          );
    
          setFilePreview(fileUrl);
        } else {
            setFilePreview(<p style={{ margin: "0", color: "#75798E" }}>no Preview Available</p>)
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
        if (files) {
          var sortFilesByDate = files.slice().reverse();
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
                      marginTop: "0"
                    }}
                  >
                    <img
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        height: "100%",
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
                      marginTop: "0"
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
              if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif"){
                fileIcon = ImageIcon
              }
              else if(fileType === "ai" ||
                      fileType === "docx" ||
                      fileType === "xls" ||
                      fileType === "psd" ||
                      fileType === "pptx"){
                    fileIcon = FileIcon
              }
              else if(fileType === "pdf"){
                  fileIcon = PdfIcon;
              }  
              else if(fileType === "mp3"){
                fileIcon = AudioIcon;
             }   
             else if(fileType === "mp4"){
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
                    margin: "10px"
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
                      <img src={fileIcon} 
                        style={{ width: "12px", marginLeft: "7px", marginRight: "3px" }}></img>
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
        // if (folders && inFolder == true) 
        // {
        //   folders.forEach((folder) => {
        //     var folderImg = <img src={Folder} />;
        //     if (folder.name && folder.date) {
        //       const row = {
        //         id: "folder " + folder.name,
        //         all: folderImg,
        //         name: folder.name,
        //         date: folder.date.split("T")[0].substr(2),
        //         "file size": folder.size.toPrecision(4).toString() + " KB",
        //       };
        //       const gridCard = (
        //         <Card
        //           className="gridCard"
        //           onClick={() =>
        //             findFile(null, null, null, "folder/" + folder.name)
        //           }
        //           style={{
        //             width: "200px",
        //             height: "185px",
        //             overflow: "hidden",
        //             padding: "0",
        //             margin: "10px"
        //           }}
        //         >
        //           <Card.Body style={{ padding: "1%" }}>
        //             <Card.Text
        //               style={{
        //                 height: "130px",
        //                 textAlign: "center",
        //                 alignItems: "center",
        //                 display: "flex",
        //                 cursor: "pointer",
        //                 width: "100%",
        //                 margin: "0",
        //                 backgroundColor: "#EFF0F2",
        //               }}
        //             >
        //               <img
        //                 style={{
        //                   display: "block",
        //                   maxWidth: "95%",
        //                   maxHeight: "95%",
        //                   margin: "auto",
        //                 }}
        //                 src={FileCard}
        //               />
        //             </Card.Text>
        //             <Card.Title>
        //               <p style={{ fontSize: "85%" }}>{folder.name}</p>
        //             </Card.Title>
        //           </Card.Body>
        //         </Card>
        //       );
        //       tmpRows.push(row);
        //       tmpGrid.push(gridCard);
        //     }
        //   });
        // }
        setView(tmpRows);
        setGrid(tmpGrid);
      } 
    

    if(isLoadFiles === true){
        return <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <img src={Loader} />
      </div>
    }
    if(files.length === 0){
        return <NoFiles/>
    }
    return (
        <div className="files">
            <p>My files</p>
            <GridDispaly files={ files } grid={ grid } 
            currentPage={ currentPage } cardsPerPage={ cardsPerPage } showGrid={ showGrid }/>
            <ListDispaly showGrid={ showGrid } findFile={ findFile } view={ view }/>
            <PageNumbers grid={ grid } cardsPerPage={ cardsPerPage } currentPage={ currentPage } setCurrentPage={ setCurrentPage } showGrid={ showGrid } />
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        files: state.data.files,
        isLoadFiles: state.data.isLoadFiles,
        folders: state.data.folders,
        isLoadFolders: state.data.isLoadFolders
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loadFolders: () => dispatch(actions.loadFolders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
