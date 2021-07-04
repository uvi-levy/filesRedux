import React, { useEffect } from "react";
import { Toast, Container, Row, Col, Button } from "react-bootstrap";

import Close from "../../../../assets/close-gray.png";

import "./undoDelete.css";

const UndoDelete = ({ showToast, setShowToast }) => {
  const toggleShowToast = () => {
    setShowToast(!showToast);
  };

  useEffect(() => {
    setTimeout(() => {
      toggleShowToast();
    }, 3000);
  }, []);
  return (
    <>
      <Toast
        show={showToast}
        onClose={toggleShowToast}
        className="undo-delete-toast"
      >
        <Toast.Body>
          <Container>
            <Row>
              <div className="line-up"></div>
            </Row>
            <Row
              style={{
                padding: "4%",
              }}
            >
              <Col>
                <h6>Your File Has Been Deleted</h6>
              </Col>
              <Col sm={3}>
                <h6 className="inline">Undo</h6>
                <button className="close-btn inline" onClick={toggleShowToast}>
                  <img src={Close}></img>
                </button>
              </Col>
            </Row>
          </Container>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default UndoDelete;
