import React from 'react'
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import $ from "jquery"

import "./emptyTrashPopup.css"

const EmptyTrashPopup = ({ isOpen, setIsOpen, trashFiles, loadFiles, jwtFromCookie }) => {
    
    const hideModal = () => {
      setIsOpen(false);
    };

    const emptyTrash = () => {
      if(!trashFiles){
        alert('Your Trash Is Already Empty');
        return;
      }
      let url = window.location;
      let userName = url.pathname.split("/")[1];
      let files = trashFiles;
      let filesUrl = [];
      files.forEach((file) => {
        filesUrl.push(file.url);
      })
      console.log(filesUrl);
      // return;
      $.ajax({
        type: "POST",
        url:
          "https://files.codes/api/" +
          userName +
          "/removeMultipleFiles",
        headers: { Authorization: jwtFromCookie },
        data: { urls: filesUrl },
        success: (data) => {
          hideModal();
          loadFiles()
        },
        error: function (err) {
          alert("please try again later");
          hideModal();
        },
      });
    }

    return (  
     <>
      <Modal show={isOpen} onHide={hideModal} dialogClassName={"empty-trash-modal"}>
          <Container>
          <Row>
              <div className="line-up">
              </div>
            </Row>
            <Row>
              <Col>
                <Modal.Title>Are You Sure You Want To Empty The Trash?</Modal.Title>
              </Col>
            </Row>
          </Container>
        <Modal.Body>
          <Row className="buttons-container">
            <Col style={{ padding: "0" }}>
              <Button className="cancel-btn" 
              onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col style={{ padding: "0", marginLeft: "5px" }}>
              <Button className="create-btn" onClick={ emptyTrash }>
                Delete
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
    trashFiles: state.data.trashFiles
  }
}

export default connect(mapStateToProps)(EmptyTrashPopup)
