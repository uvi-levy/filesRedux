import React, { useRef, useState } from 'react'
import $ from "jquery";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import Close from "../../../../../assets/close-gray.png";
import Folder from "../../../../../assets/orange-folder.png";

import "./newFolderPopup.css"
import actions from '../../../../../actions';

const UploadPopup = ({ isOpen, setIsOpen, jwtFromCookie, setVisibleNewFolder, folders, loadFiles }) => {

  const textAreaFolderRef = useRef("");
  const [foldersFiles, setFoldersFiles] = useState([]);

  const newFolder = () => {
    console.log("in newFolder");
    const folder = textAreaFolderRef.current.value;
    if(!folder){
      alert("Please enter folder name")
      return;
    }
    console.log(folder);
    let newFolder = true;
    folders.forEach((obj) => {
      if (obj.name == folder) {
        newFolder = false;
      }
    });
    if (newFolder == true) {
      let url = window.location;
      let userName = url.pathname.split("/")[1];
      let myFile = new FormData();
      myFile.append("tags", folder);
      $.ajax({
        type: "POST",
        url:
          "https://files.codes/api/" +
          userName +
          "/createNewFolder",
        headers: { Authorization: jwtFromCookie },
        data: myFile,
        processData: false,
        contentType: false,
        success: (data) => {
          alert("new folder created!");
          setVisibleNewFolder(false)
          console.log(data);
          hideModal();
          loadFiles()
        },
        error: function (err) {
          alert("please try again later");
          hideModal();
        },
      });
    } else {
      alert(
        `This folder: ${folder} - already exists, Use "move to" to transfer files to it`
      );
    }
  }
    
  const hideModal = () => {
    setIsOpen(false);
  };

    return (  
     <>
      <Modal show={isOpen} onHide={hideModal} dialogClassName={"new-folder-modal"}>
          <Container>
            <Row>
              <div className="line-up">
              </div>
            </Row>
            <Row>
              <button className="close-btn" onClick={hideModal}>
                <img src={Close}></img>
              </button>
            </Row>
            <Row>
              <Col sm={2} style={{ paddingLeft: "12%", paddingTop: "0.7%" }}>
                <img src={Folder}></img>
              </Col>
              <Col sm={10}>
                <Modal.Title>New Folder</Modal.Title>
              </Col>
            </Row>
          </Container>
        <Modal.Body>
          <Row>
            <Col sm={6} style={{ marginLeft: "8.5%" }}>
              <div className="input">
                <input type="text" className="form-control" placeholder="Folder name" ref={ textAreaFolderRef }
                style={{ backgroundColor: "#F6F6FA", border: "none", height: "38px", color: "#8181A5" }} />
              </div>
            </Col>
            <Col sm={2} style={{ padding: "0" }}>
              <Button onClick={hideModal} style={{backgroundColor: "white", borderColor: "#F4B248", color: "black"}}>
                cancel
              </Button>
            </Col>
            <Col sm={2} style={{ padding: "0" }}>
              <Button style={{backgroundColor: "#F4B248", borderColor: "#F4B248"}} onClick={newFolder}>
                create
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
    )
}

const mapStateToProps = (state) => {
  return {
    folders: state.data.folders
  }
}
export default connect(mapStateToProps)(UploadPopup)
