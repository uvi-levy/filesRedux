import React, { useRef } from "react";
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

import Link from "../../../../assets/link.png";
import Share from "../../../../assets/share.png";
import Print from "../../../../assets/print.png";
import Download from "../../../../assets/download.png";
import Copy from "../../../../assets/copy.png";
import Delete from "../../../../assets/delete.png";
import Move from "../../../../assets/moveTo.png";
import Folder from "../../../../assets/orange-folder.png";
import Note from "../../../../assets/edit.svg";
import LinkW from "../../../../assets/linkWhite.png";
import Plus from "../../../../assets/orange-plus.png";
import Close from "../../../../assets/close-gray.png";

import useLoadFiles from "../../../../hooks/useLoadFiles/useLoadFiles";

import "./filePreview.css";

import {
  USER_NAME,
  BASE_URL,
  MOVE_TO,
  DOWNLOAD,
  SAVE_NOTES,
  EDIT_NOTES,
  SAVE_MULTI_FILES_DB,
} from "../../../../utility/constants";

const FilePreview = ({
  file,
  findByTag,
  setShowBreadcrumb,
  showGrid,
  toggleDeleteDialog,
  toggleGetLink,
  toggleVisibleShare,
  setDisplayPreview,
  setIsFullScreen,
}) => {
  const imgRef = useRef();

  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);
  const loadFiles = useLoadFiles();

  const textAreaLinkRef = useRef();
  const textAreaNoteRef = useRef();

  const sharedUsers = [];
  let preFile;
  let folderButton;
  let notes = [];

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
        url: BASE_URL + USER_NAME + MOVE_TO,
        headers: { Authorization: jwtFromCookie },
        data: JSON.stringify({ files: file, tag: folder }),
        dataType: "json",
        contentType: "application/json",

        success: () => {
          setShowBreadcrumb(false);

          alert("files update!!");
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

    fetch(BASE_URL + USER_NAME + DOWNLOAD + url, {
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

        alert("your file has downloaded!");
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

  const saveNotes = (e) => {
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
      date = yyyy + "-" + mm + "-" + dd;
      console.log(date);
      let editor = file.userName;
      const fileId = file._id;
      let uId = localStorage.getItem("uId");
      console.log(note);
      console.log(fileId);
      $.ajax({
        type: "POST",
        url: BASE_URL + USER_NAME + SAVE_NOTES,
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
        url: BASE_URL + USER_NAME + EDIT_NOTES,
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
      url: BASE_URL + USER_NAME + SAVE_MULTI_FILES_DB,
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
    <button
      className="btn btn-outline-secondary folderBtn"
      style={{ color: "gray", border: "none" }}
    >
      <img src={Folder} /> /
    </button>
  );

  let p = $("p");
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
          allowfullscreen
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
        {showGrid && (
          <Row>
            <div
              className="file-preview-close-btn"
              onClick={() => setDisplayPreview(false)}
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
            style={{ width: "98%", margin: "auto", marginTop: "1%" }}
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
                ref={textAreaLinkRef}
                value={file.url}
              ></textarea>
            </Col>
            <Col style={{ padding: "0" }}>
              <Button
                onClick={getLink}
                style={{
                  borderRadius: "0 8px 8px 0 ",
                  borderColor: "#F4B248",
                  float: "left",
                  margin: "0",
                  backgroundColor: "#F4B248",
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
                  {/* <Button
                    onClick={() => saveNotes("save")}
                    style={{
                      color: "#8181A5",
                      padding: "0.5%",
                      float: "right",
                      position: "absolute",
                      bottom: "30%",
                      right: "5%",
                    }}
                    letiant="outline-dark"
                  >
                    save +
                  </Button> */}
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
              <Row>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default FilePreview;
