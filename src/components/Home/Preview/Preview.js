import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  ResponsiveEmbed,
} from "react-bootstrap";

import Link from "../../../assets/link.png";
import Share from "../../../assets/share.png";
import Print from "../../../assets/print.png";
import Download from "../../../assets/download.png";
import Copy from "../../../assets/copy.png";
import Delete from "../../../assets/delete.png";
import Move from "../../../assets/moveTo.png";
import Folder from "../../../assets/folder-solid.png";
import Note from "../../../assets/edit.svg";
import LinkW from "../../../assets/linkWhite.png";

import {
  USER_NAME,
  BASE_URL,
  SAVE_NOTES,
  EDIT_NOTES,
  MOVE_TO,
  DOWNLOAD,
} from "../../../utility/constants";

const Preview = ({ preview }) => {
  // const [visibleDel, setVisibleDel] = useState(false);
  // const [file, setFile] = useState(selectedFile);

  // const imgRef = useRef();
  // const textAreaLinkRef = useRef();
  // const textAreaNoteRef = useRef();

  // const sharedUsers = [];
  // let hoverButtonsActionViews = [];
  // let preFile;
  // let folderButton;
  // let notes = [];

  // const toggleDeleteDialog = () => {
  //   setVisibleDel(!visibleDel);
  // };

  // const saveNotes = (e) => {
  //   console.log("in saveNote");
  //   if (e.key == "Enter" || e == "save") {
  //     let note = textAreaNoteRef.current.value;
  //     let date = new Date();
  //     let dd = String(date.getDate()).padStart(2, "0");
  //     let mm = String(date.getMonth() + 1).padStart(2, "0");
  //     let yyyy = date.getFullYear();
  //     date = yyyy + "-" + mm + "-" + dd;
  //     console.log(date);
  //     let editor = file.userName;
  //     const fileId = file._id;
  //     console.log(note);
  //     console.log(fileId);
  //     $.ajax({
  //       type: "POST",
  //       url: BASE_URL + USER_NAME + SAVE_NOTES,
  //       headers: { Authorization: jwtFromCookie },
  //       data: JSON.stringify({
  //         notes: { note: note, date: date, editor: editor },
  //         fileId: fileId,
  //       }),
  //       dataType: "json",
  //       contentType: "application/json",
  //       success: (data) => {
  //         console.log("save note! ", data);
  //         loadFiles();
  //         setFile(data.data);
  //         textAreaNoteRef.current.value = "";
  //       },
  //     });
  //   }
  // };

  // const editNote = (currentNote, file) => {
  //   console.log("editNote  " + currentNote.note);
  //   const notes = file.notes;
  //   console.log(notes);
  //   let index = notes.indexOf(currentNote);
  //   let id = "note" + index;
  //   console.log(id);
  //   let text = $("#" + id);
  //   text.attr("contenteditable", "true");
  //   text.css("border", "0.2px solid #8181A5 ");
  //   text.css("outline", "none ");

  //   console.log(text);
  // };

  // const saveEditNote = (event, note, noteText, file) => {
  //   if (event.key === "Enter") {
  //     console.log("in saveEditNote", noteText);
  //     const notes = file.notes;
  //     const fileId = file._id;
  //     let index = notes.indexOf(note);
  //     let id = "note" + index;
  //     console.log(id);
  //     let text = $("#" + id);
  //     text.attr("contenteditable", "false");
  //     text.css("border", "none ");
  //     let newNote = text.text();
  //     console.log(newNote);
  //     if (newNote == "") {
  //       notes.splice(index, 1);
  //     } else {
  //       notes[index].note = newNote;
  //     }
  //     console.log(notes);

  //     $.ajax({
  //       type: "POST",
  //       url: BASE_URL + USER_NAME + EDIT_NOTES,
  //       headers: { Authorization: jwtFromCookie },
  //       data: JSON.stringify({ notes: notes, fileId: fileId }),
  //       dataType: "json",
  //       contentType: "application/json",
  //       success: (data) => {
  //         console.log("save update! ", data);
  //         loadFiles();
  //         setFile(data.data);
  //       },
  //     });
  //   }
  // };

  // const printFile = () => {
  //   console.log("in print");
  //   const file = this.state.selectedFile;
  //   let printWindow = window.open(
  //     file.url,
  //     "Print",
  //     "left=200",
  //     "top=200",
  //     "width=950",
  //     "height=500",
  //     "toolbar=0",
  //     "resizable=0"
  //   );
  //   printWindow.addEventListener(
  //     "load",
  //     function () {
  //       printWindow.print();
  //     },
  //     true
  //   );
  // };

  // const copyEmbed = () => {
  //   console.log("in copyEmbed");
  //   const file = this.state.selectedFile;
  //   const embed = (
  //     <div id="embed" style={{ width: 660, height: "auto" }}>
  //       <ResponsiveEmbed aspectRatio="16by9">
  //         <iframe src={file.url} allowfullscreen="true" />
  //       </ResponsiveEmbed>
  //     </div>
  //   );
  //   this.setState({ embed, embedView: true });
  // };

  // const exportEmbed = () => {
  //   let target = document.getElementById("embed").innerHTML;
  //   console.log(target, "@");

  //   this.textAreaRef.current.value = target;
  //   this.textAreaRef.current.select();
  //   this.textAreaRef.current.setSelectionRange(0, 99999);
  //   document.execCommand("copy");
  //   this.setState({ copied: true });
  //   // this.setCopySuccess('Copied!');
  // };

  // const moveTo = () => {
  //   console.log("in moveTo");
  //   let file = this.state.selectedFile;
  //   console.log(JSON.stringify(file));
  //   let folder = prompt("Which folder do you want to move your file to?", "");
  //   if (folder == "") {
  //     alert("sorry, invalid folder name");
  //   } else if (folder) {
  //     $.ajax({
  //       type: "PUT",
  //       url: BASE_URL + USER_NAME + MOVE_TO,
  //       headers: { Authorization: jwtFromCookie },
  //       data: JSON.stringify({ files: file, tag: folder }),
  //       dataType: "json",
  //       contentType: "application/json",

  //       success: () => {
  //         setShowBreadcrumb(false);
  //         //   this.setState({ showBreadcrumb: false, folderName: "" });
  //         alert("files update!!");
  //         loadFiles();
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         alert("ooooofff...err");
  //       },
  //     });
  //   }
  // };

  // const copyFile = () => {
  //   console.log("copy");
  //   const file = this.state.selectedFile;
  //   let jwtFromCookieFromCookie = this.props.jwtFromCookie;
  //   let copyFile = {
  //     files: {
  //       files: {
  //         name: file.name,
  //         url: file.url,
  //         size: file.size * 1024 * 1024,
  //       },
  //     },
  //   };

  //   $.ajax({
  //     url: "https://files.codes/api/" + USER_NAME + "/savedMultiFilesDB",
  //     method: "POST",
  //     headers: { authorization: this.props.jwtFromCookie },
  //     data: copyFile,
  //     success: (data) => {
  //       alert("The file was successfully duplicated");
  //       console.log("The file was successfully duplicated", data);
  //       this.props.loadFiles();
  //     },
  //   });
  // };

  // const download = () => {
  //   console.log("in down:(");
  //   const file = this.state.selectedFile;
  //   const url = file.url;
  //   console.log(file.url);

  //   fetch(BASE_URL + USER_NAME + DOWNLOAD + url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: jwtFromCookie,
  //     },
  //   })
  //     .then((resp) => resp.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.style.display = "none";
  //       a.href = url;
  //       a.download = file.name.split("__")[1];
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);

  //       alert("your file has downloaded!");
  //     })
  //     .catch(() => alert("oh no!"));
  // };

  // const toggleDialog = () => {
  //   this.setState({
  //     visible: !this.state.visible,
  //     nextShare: false,
  //   });
  // };

  // const toggleGetLink = () => {
  //   this.setState({
  //     visibleGetLink: !this.state.visibleGetLink,
  //   });
  // };

  // const getLink = () => {
  //   console.log("in getLink");
  //   let file = this.state.selectedFile;
  //   console.log(file.url);
  //   this.textAreaLinkRef.current.value = file.url;
  //   this.textAreaLinkRef.current.select();
  //   this.textAreaLinkRef.current.setSelectionRange(0, 99999);

  //   document.execCommand("copy");
  // };

  return (
    <>
      {/* <div>
          {this.state.visibleGetLink && (
            <Dialog height={150} width={550}>
              <Container>
                <Row>
                  <Col style={{ margin: "0", padding: "0" }} md={1}>
                    <Button
                      variant="light"
                      style={{ color: "#8181A5" }}
                      onClick={this.toggleGetLink}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <Row
                  className="justify-content-start"
                  style={{ textAlign: "left" }}
                >
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <img src={Link} />
                  </Col>
                  <Col md={6} style={{}}>
                    {" "}
                    <h3>Get Link</h3>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <textarea
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#F6F6FA",
                        fontSize: "90%",
                        resize: "none",
                      }}
                      ref={this.textAreaLinkRef}
                    >
                      {this.state.selectedFile.url}
                    </textarea>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="primary"
                      style={{ borderRadius: "7px" }}
                      onClick={this.getLink}
                    >
                      copy link
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Dialog>
          )}
          {this.state.visibleDel && (
            <Dialog height={230} width={580}>
              <Container>
                <Row>
                  <Col md={1}>
                    <Button
                      variant="light"
                      style={{ color: "#8181A5" }}
                      onClick={this.toggleDeleteDialog}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <Row
                  className="justify-content-start"
                  style={{ textAlign: "left", margin: "2%" }}
                >
                  <Col md={8} style={{ margin: "0" }}>
                    {" "}
                    <h6 style={{ width: "100%" }}>
                      Are you sure you want to delete this file?
                    </h6>
                  </Col>
                  <Col md={3}>
                    <p
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: "#F6F6FA",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0",
                      }}
                    >
                      {this.state.selectedFile.name.split("__")[1]}
                    </p>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col style={{ margin: "4%" }} md={2}>
                    <Button
                      variant="primary"
                      style={{ borderRadius: "7px" }}
                      onClick={this.deleteFile}
                    >
                      Yes, I'm sure!
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Dialog>
          )}
          {this.state.visibleNewFolder && (
            <Dialog height={150} width={550}>
              <Container>
                <Row>
                  <Col style={{ margin: "0", padding: "0" }} md={1}>
                    <Button
                      variant="light"
                      style={{ color: "#8181A5" }}
                      onClick={this.toggleNewFolder}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <Row
                  className="justify-content-start"
                  style={{ textAlign: "left" }}
                >
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <img src={Link} />
                  </Col>
                  <Col md={6} style={{}}>
                    {" "}
                    <h3>New Folder</h3>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <textarea
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#F6F6FA",
                        fontSize: "90%",
                        resize: "none",
                      }}
                      placeholder="Folder name"
                      ref={this.textAreaFolderRef}
                    ></textarea>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      style={{ borderRadius: "7px" }}
                      onClick={this.toggleNewFolder}
                    >
                      cancel
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="primary"
                      style={{ borderRadius: "7px" }}
                      onClick={this.newFolder}
                    >
                      create
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Dialog>
          )}
        </div>
                {this.state.embedView && (
                  <div>
                    {" "}
                    {this.state.embed}
                    <Button
                      style={{ margin: "4px" }}
                      variant="warning"
                      onClick={this.exportEmbed}
                    >
                      copy the file Inside a iFrame tag{" "}
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          {this.state.copied && (
                            <span style={{ color: "#B8860B" }}>copied!</span>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col ">
                          <textarea
                            className="bubble"
                            style={{ width: "100%" }}
                            ref={this.textAreaRef}
                          />
                          <Button
                            style={{ float: "right" }}
                            variant="dark"
                            onClick={() =>
                              this.setState({ embedView: false, copied: false })
                            }
                          >
                            x
                          </Button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col"> </div>
                      </div>
                    </div>
                  </div>
                )} */}
                {preview}
    </>
  );
};

export default Preview;
