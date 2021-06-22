import React, { useEffect } from "react";

import {
  Row,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
  Container,
} from "react-bootstrap";

import Grid from "../../../../assets/th-large-solid.png";
import GridBlack from "../../../../assets/grid-black.png";
import List from "../../../../assets/list-solid.png";
import ListBlack from "../../../../assets/list-black.png";

import "./displayButtons.css";

const DisplayButtons = ({ showGrid, setShowGrid, setDisplayPreview }) => {
  useEffect(() => {
    let url = window.location;
    console.log("is trash", url.pathname.includes("trash"));
    console.log("showGrid", showGrid);
    if (url.pathname.includes("trash")) setShowGrid(false);
    else setShowGrid(true);
  }, []);

  return (
    <Container className="display-buttons">
      <Row>
        <Col className="no-padding">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                <span>Grid</span>
              </Tooltip>
            }
          >
            <Button
              variant="outline-light"
              className="dispaly-btn"
              // style={{ paddingRight: "0" }}
              onClick={() => {
                setDisplayPreview(false);
                setShowGrid(!showGrid)}}
            >
              {!showGrid ? (
                <img style={{ height: "80%" }} src={Grid} />
              ) : (
                <img style={{ height: "80%" }} src={GridBlack} />
              )}
            </Button>
          </OverlayTrigger>
        </Col>
        <Col className="no-padding">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                <span>List</span>
              </Tooltip>
            }
          >
            <Button
              variant="outline-light"
              className="dispaly-btn"
              onClick={() => {
                setDisplayPreview(false)
                setShowGrid(!showGrid)}}
            >
              {showGrid ? (
                <img style={{ height: "80%" }} src={List} />
              ) : (
                <img style={{ height: "80%" }} src={ListBlack} />
              )}
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayButtons;
