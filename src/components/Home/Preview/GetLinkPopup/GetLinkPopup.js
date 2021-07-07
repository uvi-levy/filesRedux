import React, { useRef } from "react";

import Close from "../../../../assets/close-gray.png";
import Link from "../../../../assets/orange-link.png";
import LinkWhite from "../../../../assets/white-link.png";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GetLinkPopup = ({ visibleGetLink, setVisibleGetLink, selectedFile }) => {
  const textAreaLinkRef = useRef();

  const hideModal = () => {
    setVisibleGetLink(false);
  };

  const getLink = () => {
    console.log("in getLink");
    let file = selectedFile;
    console.log(file.url);
    textAreaLinkRef.current.value = file.url;
    textAreaLinkRef.current.select();
    textAreaLinkRef.current.setSelectionRange(0, 99999);

    document.execCommand("copy");
  };

  return (
    <>
      <Modal
        show={visibleGetLink}
        onHide={hideModal}
        dialogClassName={"get-link-modal"}
      >
        <Container>
          <Row>
            <div className="line-up"></div>
          </Row>
          <Row>
            <button className="close-btn" onClick={hideModal}>
              <img src={Close}></img>
            </button>
          </Row>
        </Container>
        <Modal.Body>
          <Row className="justify-content-start" style={{ textAlign: "left" }}>
            <Col>
              <img src={Link} className="display-inline link-img" />
              <h3
                className="display-inline"
                style={{ width: "fit-content", margin: "0" }}
              >
                Get Link
              </h3>
            </Col>
          </Row>
          <Row>
            <div
              class="d-flex flex-row"
              style={{ margin: "auto", width: "fit-content" }}
            >
              <textarea
                style={{
                  width: "400px",
                  border: "none",
                  backgroundColor: "#F6F6FA",
                  fontSize: "90%",
                  resize: "none",
                  display: "inline-block",
                }}
                ref={textAreaLinkRef}
              >
                {selectedFile.url}
              </textarea>
              <Button
                className="copy-link-btn"
                style={{ borderRadius: "7px" }}
                onClick={getLink}
              >
                <img src={LinkWhite} />
              </Button>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetLinkPopup;
