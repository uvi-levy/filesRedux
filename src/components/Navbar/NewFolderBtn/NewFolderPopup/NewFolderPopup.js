import React from 'react'

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import Close from "../../../../assets/close-gray.png";
import Folder from "../../../../assets/orange-folder.png";

import "./newFolderPopup.css"

const UploadPopup = ({ isOpen, setIsOpen }) => {
    
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
                <input type="text" className="form-control" placeholder="Folder name" 
                style={{ backgroundColor: "#F6F6FA", border: "none", height: "38px", color: "#8181A5" }} />
              </div>
            </Col>
            <Col sm={2} style={{ padding: "0" }}>
              <Button style={{backgroundColor: "white", borderColor: "#F4B248", color: "black"}}>
                cancel
              </Button>
            </Col>
            <Col sm={2} style={{ padding: "0" }}>
              <Button style={{backgroundColor: "#F4B248", borderColor: "#F4B248"}}>
                create
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default UploadPopup
