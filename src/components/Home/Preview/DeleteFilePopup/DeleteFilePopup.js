import React from "react";
import { connect } from "react-redux";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";

import useLoadFiles from "../../../../hooks/useLoadFiles/useLoadFiles";

import { Container, Row, Button, Modal } from "react-bootstrap";

import Close from "../../../../assets/close-gray.png";

import {
  BASE_URL,
  USER_NAME,
  MULTI_FILES_TO_ARCHIV,
} from "../../../../utility/constants";

const DeleteFilePopup = ({
  visibleDel,
  setVisibleDel,
  selectedFile,
  jwtFromCookie,
  cleanPreView,
  setShowToast,
  setDisplayPreview,
  showGrid,
}) => {
  const loadFiles = useLoadFiles();

  const hideModal = () => {
    setVisibleDel(false);
  };

  const deleteFile = () => {
    hideModal();
    console.log("in delete");
    const file = selectedFile;
    const fileId = file._id;
    console.log(fileId);

    $.ajax({
      type: "PUT",
      url: BASE_URL + USER_NAME + MULTI_FILES_TO_ARCHIV,
      headers: { Authorization: jwtFromCookie },
      data: JSON.stringify({ files: fileId }),
      dataType: "json",
      contentType: "application/json",

      success: () => {
        if (showGrid) {
          setDisplayPreview(false);
        }
        cleanPreView();
        setShowToast(true);
        loadFiles();
      },
      error: function (err) {
        alert("err");
      },
    });
  };

  return (
    <>
      <Modal
        show={visibleDel}
        onHide={hideModal}
        dialogClassName={"delete-file-modal"}
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
          <Row>
            <div style={{ margin: "auto", textAlign: "center" }}>
              <h6 style={{ width: "fit-content", display: "inline-block" }}>
                Are you sure you want to delete this file?
              </h6>

              <p
                style={{
                  width: "fit-content",
                  height: "100%",
                  border: "none",
                  backgroundColor: "#F6F6FA",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 7px",
                  display: "inline-block",
                }}
              >
                {selectedFile.name.split("__")[1]}
              </p>
            </div>
          </Row>
          <Row>
            <Button className="delete-btn" onClick={deleteFile}>
              Yes, I'm sure!
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    jwtFromCookie: state.data.jwtFromCookie,
    showGrid: state.data.showGrid,
  };
};

export default connect(mapStateToProps)(DeleteFilePopup);
