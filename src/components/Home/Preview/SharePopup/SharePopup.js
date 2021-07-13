import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";

import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";

import Share from "../../../../assets/share.svg";
import Close from "../../../../assets/close-gray.svg";

import {
  USER_NAME,
  SHARE_BASE_URL,
  CREATE_PERMISSION,
} from "../../../../utility/constants";

const SharePopup = ({ toggleVisibleShare, file, visibleShare }) => {
  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);

  const eMailInput = useRef();

  const [sharedEmail, setSharedEmail] = useState("");

  const nextInShare = () => {
    console.log("nextInShare");
    const validateEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const validate = () => {
      const $result = $("#result");
      const email = $("#eMailInput").val();
      $result.text("");

      if (validateEmail(email)) {
        setSharedEmail(email);
      } else {
        console.log("not valid");
      }
      return false;
    };

    $("#eMailInput").on("keyup", validate);
  };

  const shareFile = (permission) => {
    console.log("in shareFile");
    if (!file) {
      alert("please check file");
    } else {
      console.log(sharedEmail);
      if (!sharedEmail || sharedEmail == "") {
        alert("Invalid email address");
      } else {
        console.log(permission);
        let fileId = file._id;
        toggleVisibleShare();
        $.ajax({
          type: "POST",
          url: SHARE_BASE_URL + USER_NAME + CREATE_PERMISSION,
          headers: { Authorization: jwtFromCookie },
          data: JSON.stringify({
            applicationName: "files",
            sharedEmail: sharedEmail,
            objectId: fileId,
            permission: permission,
          }),
          contentType: "application/json",

          success: (data) => {
            console.log(data);

            alert("file shared succesfuly");
          },
          error: (err) => {
            console.log("error,try again later");
          },
        });
      }
    }
  };

  return (
    <>
      <Modal
        show={visibleShare}
        onHide={toggleVisibleShare}
        dialogClassName={"share-modal"}
      >
        <Container>
          <Row>
            <div className="line-up"></div>
          </Row>
          <Row>
            <button className="close-btn" onClick={toggleVisibleShare}>
              <img src={Close}></img>
            </button>
          </Row>
        </Container>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col
                md={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img style={{ marginLeft: "70%" }} src={Share} />
              </Col>
              <Col md={9} style={{ padding: "0" }}>
                <h5>Share with people and groups</h5>
              </Col>
            </Row>
            <Form>
              <Form.Row className="justify-content-md-center">
                {/* <Col
                  md={10}
                  style={{
                    height: "40px",
                    backgroundColor: "#EFEFEF",
                    marginTop: "6%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    borderBottom: "1px solid #5E81F4",
                  }}
                > */}
                <Form.Control
                  type="email"
                  autocomplete="on"
                  onKeyDown={(e) => nextInShare(e)}
                  placeholder="Add pepole and groups"
                  ref={eMailInput}
                  id="eMailInput"
                  style={{
                    backgroundColor: "#EFEFEF",
                    outline: "none",
                    border: "none",
                    width: "80%",
                    margin: "3% auto",
                  }}
                />
                {/* </Col> */}
              </Form.Row>

              <Form.Row style={{ margin: "5% 5% 3% 20%" }}>
                {/* <Col style={{ display: "flex", alignItems: "center" }}> */}
                <h5
                  style={{
                    width: "fit-content",
                    marginRight: "0",
                    // marginLeft: "35%",
                    display: "inline-block",
                  }}
                >
                  share:
                </h5>
                {/* </Col> */}
                {/* <Col md={7} style={{ justifyContent: "space-between" }}> */}
                <Button
                  style={{
                    backgroundColor: "#F4B248",
                    color: "white",
                    margin: "3%",
                    border: "none",
                  }}
                  onClick={() => shareFile("public")}
                >
                  public
                </Button>
                <Button
                  style={{
                    backgroundColor: "#F4B248",
                    color: "white",
                    margin: "3%",
                    border: "none",
                  }}
                  onClick={() => shareFile("private")}
                >
                  private
                </Button>
                {/* </Col> */}
              </Form.Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SharePopup;
