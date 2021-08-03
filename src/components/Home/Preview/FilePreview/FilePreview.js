import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";

import $ from "jquery";

import Link from "../../../../assets/link.svg";
import Share from "../../../../assets/share.svg";
import Print from "../../../../assets/print.svg";
import Download from "../../../../assets/download.svg";
import Copy from "../../../../assets/copy.svg";
import Delete from "../../../../assets/delete.svg";
import Move from "../../../../assets/moveTo.svg";
import Folder from "../../../../assets/orange-folder.svg";
import Note from "../../../../assets/edit.svg";
import LinkW from "../../../../assets/linkWhite.svg";
import Plus from "../../../../assets/orange-plus.svg";
import Close from "../../../../assets/close-gray.svg";

import useLoadFiles from "../../../../utility/cutomHooks/useLoadFiles/useLoadFiles";
import usePostUpdatedFile from "../../../../utility/cutomHooks/usePostUpdatedFile/usePostUpdatedFile";

import PrevNextFile from "../PrevNextFile/PrevNextFile";

import "./filePreview.css";

import keys from "../../../../config/env/keys";

import {
  BASE_URL,
  USER_NAME,
  MOVE_TO,
  DOWNLOAD,
  SAVE_NOTES,
  EDIT_NOTES,
  SAVE_MULTI_FILES_DB,
} from "../../../../utility/constants";

const FilePreview = ({
  selectedFile,
  setSelectedFile,
  findByTag,
  setShowBreadcrumb,
  toggleDeleteDialog,
  toggleGetLink,
  toggleVisibleShare,
  setDisplayPreview,
  setIsFullScreen,
}) => {
  const imgRef = useRef();

  const { jwtFromCookie, showGrid, files } = useSelector((state) => {
    return {
      jwtFromCookie: state.data.jwtFromCookie,
      showGrid: state.data.showGrid,
      files: state.data.files,
    };
  });

  const loadFiles = useLoadFiles();
  const getUpdatedFile = usePostUpdatedFile();

  const [file, setFile] = useState(selectedFile);

  const textAreaLinkRef = useRef();
  const textAreaNoteRef = useRef();

  const sharedUsers = [];
  let preFile;
  let folderButton;
  let notes = [];

  let timer = null;
  let timer2 = null;
  let timer3 = null;

  useEffect(() => {
    let card = document.getElementsByClassName("on-grid-display")[0];
    if (card) {
      timer = setTimeout(() => {
        card.classList.add("show-grid-view");
      }, 100);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    setFile(getUpdatedFile(file));
  }, [files]);

  const full = () => {
    console.log("in full");
    let elem = imgRef.current;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const moveTo = () => {
    console.log("in moveTo");
    console.log(JSON.stringify(file));
    let folder = prompt("Which folder do you want to move your file to?", "");
    if (folder == "") {
      alert("sorry, invalid folder name");
    } else if (folder) {
      $.ajax({
        type: "PUT",
        url: keys.BASE_URL + USER_NAME + MOVE_TO,
        headers: { Authorization: jwtFromCookie },
        data: JSON.stringify({ files: file, tag: folder }),
        dataType: "json",
        contentType: "application/json",

        success: () => {
          setShowBreadcrumb(false);

          loadFiles();
        },
        error: (err) => {
          console.log(err);
          alert("ooooofff...err");
        },
      });
    }
  };

  const download = () => {
    console.log("in down:(");
    const url = file.url;
    console.log(file.url);

    fetch(keys.BASE_URL + USER_NAME + DOWNLOAD + url, {
      // fetch(BASE_URL + USER_NAME + DOWNLOAD + url, {
      method: "GET",
      headers: {
        Authorization: jwtFromCookie,
      },
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = file.name.split("__")[1];
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("oh no!"));
  };

  const printFile = () => {
    console.log("in print");
    let printWindow = window.open(
      file.url,
      "Print",
      "left=200",
      "top=200",
      "width=950",
      "height=500",
      "toolbar=0",
      "resizable=0"
    );
    printWindow.addEventListener(
      "load",
      function () {
        printWindow.print();
      },
      true
    );
  };

  const saveNotes = async (e) => {
    console.log("in saveNote");
    if (e.key == "Enter" || e == "save") {
      let note = textAreaNoteRef.current.value;
      if (!note) {
        alert("Note must have a content");
        return;
      }
      let date = new Date();
      let dd = String(date.getDate()).padStart(2, "0");
      let mm = String(date.getMonth() + 1).padStart(2, "0");
      let yyyy = date.getFullYear();
      date = yyyy + "/" + mm + "/" + dd;
      console.log(date);
      let editor = file.userName;
      const fileId = file._id;
      let uId = localStorage.getItem("uId");
      console.log(note);
      console.log(fileId);
      $.ajax({
        type: "POST",
        url: keys.BASE_URL + USER_NAME + SAVE_NOTES,
        headers: { Authorization: jwtFromCookie },
        data: JSON.stringify({
          notes: { note: note, date: date, editor: editor },
          fileId: fileId,
        }),
        dataType: "json",
        contentType: "application/json",
        success: (data) => {
          console.log("save note! ", data);
          loadFiles();
          //   this.showPreFile(data.data);
          textAreaNoteRef.current.value = "";
        },
      });
    }
  };

  const editNote = (currentNote, file) => {
    console.log("editNote  " + currentNote.note);
    const notes = file.notes;
    console.log(notes);
    let index = notes.indexOf(currentNote);
    let id = "note" + index;
    console.log(id);
    let text = $("#" + id);
    text.attr("contenteditable", "true");
    text.css("border", "0.2px solid #8181A5 ");
    text.css("outline", "none ");

    console.log(text);
  };

  const saveEditNote = (event, note, noteText, file) => {
    if (event.key === "Enter") {
      console.log("in saveEditNote", noteText);

      let notes = file.notes;
      const fileId = file._id;
      let index = notes.indexOf(note);
      let id = "note" + index;
      console.log(id);
      let text = $("#" + id);
      text.attr("contenteditable", "false");
      text.css("border", "none ");
      let newNote = text.text();
      console.log(newNote);
      if (newNote == "") {
        notes = notes.filter((note, i) => index != i);
      } else {
        notes = notes.map((note, i) => {
          if (i == index) return { ...note, note: newNote };
          else return note;
        });
        notes[index].note = newNote;
      }
      console.log(notes);

      $.ajax({
        type: "POST",
        url: keys.BASE_URL + USER_NAME + EDIT_NOTES,
        headers: { Authorization: jwtFromCookie },
        data: JSON.stringify({ notes: notes, fileId: fileId }),
        dataType: "json",
        contentType: "application/json",
        success: (data) => {
          console.log("save update! ", data);
          loadFiles();
          //   this.showPreFile(data.data);
        },
      });
    }
  };

  const getLink = () => {
    console.log("in getLink");
    console.log(file.url);
    textAreaLinkRef.current.value = file.url;
    textAreaLinkRef.current.select();
    textAreaLinkRef.current.setSelectionRange(0, 99999);

    document.execCommand("copy");
  };

  const copyFile = () => {
    console.log("copy");
    let copyFile = {
      files: {
        files: {
          name: file.name,
          url: file.url,
          size: file.size * 1024 * 1024,
        },
      },
    };

    $.ajax({
      url: keys.BASE_URL + USER_NAME + SAVE_MULTI_FILES_DB,
      method: "POST",
      headers: { authorization: jwtFromCookie },
      data: copyFile,
      success: (data) => {
        alert("The file was successfully duplicated");
        console.log("The file was successfully duplicated", data);
        loadFiles();
      },
    });
  };

  console.log(file);
  folderButton = (
    <button className="btn folderBtn">
      <img src={Folder} /> /
    </button>
  );

  let p = $("p");
  p.attr("contenteditable", "false");
  p.css("border", "none ");

  if (
    file.tags != null &&
    file.tags != "" &&
    file.tags != [] &&
    file.tags != "/"
  ) {
    const folders = file.tags.split("/");
    console.log(folders);
    const folder = folders[folders.length - 2];
    console.log(folder);

    folderButton = (
      <button
        className="btn folderBtn"
        onClick={() => {
          document
            .getElementsByClassName("on-grid-display")[0]
            .classList.remove("show-grid-view");
          timer2 = setTimeout(() => {
            setDisplayPreview(false);
          }, 300);
          findByTag(folder);
        }}
      >
        <img src={Folder} />
        {" " + folder}
      </button>
    );
  }

  console.log(file.notes);
  file.notes.forEach((note, index) => {
    const fileNotes = (
      <Row key={index}>
        <Col
          md={10}
          style={{ color: "#363839", textAlign: "left", width: "80%" }}
        >
          <Row>
            <Col md={5}>
              <p
                className="notes"
                id={"note" + index}
                onKeyDown={(e) => saveEditNote(e, note, note.note, file)}
              >
                {note.note}
              </p>
            </Col>
            <Col md={3}>
              <p style={{ float: "right", fontSize: "75%" }}>{note.editor}</p>
            </Col>
            <Col md={5}>
              <p style={{ float: "right", fontSize: "70%" }}>{note.date}</p>
            </Col>
          </Row>

          <hr />
        </Col>
        <Col>
          <img
            onClick={() => editNote(note, file)}
            style={{ float: "right", cursor: "pointer" }}
            src={Note}
          />
        </Col>
      </Row>
    );
    notes.push(fileNotes);
    console.log("indexNotes" + index);
  });

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
      fun: copyFile,
    },
    {
      text: "Move To",
      value: "move",
      icon: Move,
      border: "none",
      color: "purple",
      txtColor: "HotPink",
      fun: moveTo,
    },
    {
      text: "Download",
      value: "download",
      icon: Download,
      border: "none",
      txtColor: "gray",
      fun: download,
    },
    {
      text: "Print",
      value: "print",
      icon: Print,
      border: "groove  1px",
      txtColor: "gray",
      fun: printFile,
    },
    {
      text: "Share",
      value: "share",
      icon: Share,
      border: "none",
      txtColor: "gray",
      fun: toggleVisibleShare,
    },
    {
      text: "Get Link",
      value: "link",
      icon: Link,
      border: "none",
      txtColor: "gray",
      fun: toggleGetLink,
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
          letiant="light"
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
        onClick={() => {
          setIsFullScreen(true);
          setDisplayPreview(false);
        }}
        style={{
          height: "150px",

          width: "100%",
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
          backgroundColor: "#EFF0F2",
          borderRadius: "11px 11px 0 0",
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
          ref={imgRef}
          src={file.url}
        />
      </div>
    );
  } else {
    preFile = (
      <div
        style={{ maxHeight: "250px", width: "100%" }}
        onClick={() => {
          setDisplayPreview(false);
          setIsFullScreen(true);
        }}
      >
        <iframe
          src={file.url}
          style={{ width: "50%", height: "50%" }}
          autoplay="0"
          autostart="0"
          allow="fullscreen"
          ref={imgRef}
          muted
        ></iframe>
      </div>
    );
  }

  return (
    <>
      <Container
        className={
          showGrid ? "pre-file on-grid-display" : "pre-file on-list-display"
        }
        fluid
      >
        <div>
          {showGrid && (
            <Row>
              <div
                className="file-preview-close-btn"
                onClick={() => {
                  document
                    .getElementsByClassName("on-grid-display")[0]
                    .classList.remove("show-grid-view");
                  timer3 = setTimeout(() => {
                    setDisplayPreview(false);
                  }, 300);
                }}
              >
                <img src={Close} />
              </div>
            </Row>
          )}
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
            <Row className="justify-content-md-center" style={{ padding: "0" }}>
              <Col md={7}>
                <p style={{ fontWeight: "bold", margin: "4% 0" }}>
                  {file.name.split("__")[1].substr(0, 15)}
                </p>
              </Col>
              <Col md={5}>{folderButton}</Col>
            </Row>
            <Row
              className="justify-content-md-center"
              style={{ width: "100%", margin: "auto", marginTop: "1%" }}
            >
              <textarea
                className="file-url"
                ref={textAreaLinkRef}
                value={file.url}
              ></textarea>
              <Button
                onClick={getLink}
                style={{
                  borderRadius: "0 8px 8px 0 ",
                  borderColor: "#F4B248",
                  float: "left",
                  margin: "0",
                  backgroundColor: "#F4B248",
                  width: "50px",
                  height: "38px",
                }}
              >
                <img src={LinkW} />
              </Button>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                {" "}
                <p style={{ marginBottom: "0" }}>
                  Date Created{" "}
                  <p
                    style={{
                      color: "#363839",
                      display: "inline",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.dateCreated.split("T")[0].substr(2)}
                  </p>
                </p>{" "}
              </Col>
              <Col md={6}>
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
                      ref={textAreaNoteRef}
                      style={{
                        width: "100%",
                        height: "100px",
                        resize: "none",
                        border: "none",
                        outline: "0.2px solid #8181A5",
                        display: "block",
                      }}
                      onKeyPress={(e) => {
                        saveNotes(e);
                      }}
                    />
                    <button
                      className="save_note_btn"
                      onClick={() => saveNotes("save")}
                    >
                      <p>Add note</p>
                      <img src={Plus} />
                    </button>
                    <hr />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <>
          <PrevNextFile
            selectedFile={file}
            setSelectedFile={setSelectedFile}
            setFile={setFile}
          />
        </>
      </Container>
    </>
  );
};

export default FilePreview;
