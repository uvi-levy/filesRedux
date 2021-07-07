import React from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import useRecoverdFile from "../../../hooks/useRecoverdFile/useRecoverdFile";

const RestorePopup = ({ name, id, isOpen, setIsOpen, loadFiles }) => {
  const recoveredFile = useRecoverdFile();

  const hideModal = () => {
    setIsOpen(false);
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
                onClick={() => recoveredFile(id, hideModal, loadFiles)}
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
