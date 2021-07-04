import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import $ from "jquery";

import {
  USER_NAME,
  BASE_URL,
  RECOVER_MULTI_FILES,
} from "../../../utility/constants";

import useLoadFiles from "../../../hooks/useLoadFiles/useLoadFiles";

const RestorePopup = ({ name, id, isOpen, setIsOpen, loadFiles }) => {
  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);

  const homeLoadFiles = useLoadFiles();

  const hideModal = () => {
    setIsOpen(false);
  };

  const recoveredFile = (fileId) => {
    console.log("in recoveredFile");

    hideModal();

    console.log(fileId);

    $.ajax({
      type: "PUT",
      url: BASE_URL + USER_NAME + RECOVER_MULTI_FILES,
      headers: { Authorization: jwtFromCookie },
      data: JSON.stringify({ files: fileId }),
      dataType: "json",
      contentType: "application/json",

      success: (data) => {
        loadFiles();
        homeLoadFiles();
      },
      error: function (err) {
        alert("err");
      },
    });
  };

  return (
    <div>
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
                Are you sure you want to restore file {name}?
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
              <Button
                onClick={() => recoveredFile(id)}
                style={{
                  backgroundColor: "#F4B248",
                  borderColor: "#F4B248",
                  width: "120px",
                  height: "38px",
                }}
              >
                Yes, I'm sure!
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RestorePopup;
