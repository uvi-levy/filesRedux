import React from "react";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import $ from "jquery";

import {
  BASE_URL,
  USER_NAME,
  REMOVE_MULTIPLE_FILES,
} from "../../../utility/constants";

import useLoadFiles from "../../../hooks/useLoadFiles/useLoadFiles";

import "./emptyTrashPopup.css";

const EmptyTrashPopup = ({ isOpen, setIsOpen, trashFiles, jwtFromCookie }) => {
  const loadFiles = useLoadFiles();

  const hideModal = () => {
    setIsOpen(false);
  };

  const emptyTrash = () => {
    if (!trashFiles) {
      alert("Your Trash Is Already Empty");
      return;
    }
    let files = trashFiles;
    let filesUrl = [];
    files.forEach((file) => {
      filesUrl.push(file.url);
    });
    console.log(filesUrl);
    $.ajax({
      type: "POST",
      url: BASE_URL + USER_NAME + REMOVE_MULTIPLE_FILES,
      headers: { Authorization: jwtFromCookie },
      data: { urls: filesUrl },
      success: (data) => {
        hideModal();
        loadFiles();
      },
      error: function (err) {
        alert("please try again later");
        hideModal();
      },
    });
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={hideModal}
        dialogClassName={"empty-trash-modal"}
      >
        <Container>
          <Row>
            <div className="line-up"></div>
          </Row>
          <Row>
            <Col>
              <Modal.Title>
                Are You Sure You Want To Empty The Trash?
              </Modal.Title>
            </Col>
          </Row>
        </Container>
        <Modal.Body>
          <Row className="buttons-container">
            <Col style={{ padding: "0" }}>
              <Button className="cancel-btn" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Col>
            <Col style={{ padding: "0", marginLeft: "5px" }}>
              <Button className="create-btn" onClick={emptyTrash}>
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    trashFiles: state.data.trashFiles,
    jwtFromCookie: state.data.jwtFromCookie,
  };
};

export default connect(mapStateToProps)(EmptyTrashPopup);
