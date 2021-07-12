import React, { useEffect } from "react";
import { Toast, Container, Row, Col } from "react-bootstrap";

import Close from "../../../../assets/close-gray.png";

import useRecoverdFile from "../../../../utility/cutomHooks/useRecoverdFile/useRecoverdFile";

import "./undoDelete.css";

const UndoDelete = ({ showToast, setShowToast, selectedFile }) => {
  const recoveredFile = useRecoverdFile();

  useEffect(() => {
    setTimeout(() => {
      setShowToast(!showToast);
    }, 3000);
  }, []);
  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
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
              <Col sm={3} style={{ padding: "0" }}>
                <h6
                  className="inline undo-text"
                  onClick={() => recoveredFile(selectedFile._id)}
                >
                  Undo
                </h6>
                <button
                  className="close-btn inline"
                  onClick={() => setShowToast(false)}
                >
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
