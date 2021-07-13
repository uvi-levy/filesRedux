import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
  Container,
} from "react-bootstrap";

import Grid from "../../../../assets/grid-white.svg";
import GridBlack from "../../../../assets/grid-black.svg";
import List from "../../../../assets/list-solid.svg";
import ListBlack from "../../../../assets/list-black.svg";

import "./displayButtons.css";
import actions from "../../../../redux/actions";

const DisplayButtons = ({ setDisplayPreview }) => {
  const showGrid = useSelector((state) => state.data.showGrid);
  const dispatch = useDispatch();

  useEffect(() => {
    let url = window.location;
    console.log("is trash", url.pathname.includes("trash"));
    if (url.pathname.includes("trash")) dispatch(actions.setShowGrid(false));
    else dispatch(actions.setShowGrid(true));
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
              onClick={() => {
                setDisplayPreview(false);
                dispatch(actions.setShowGrid(!showGrid));
              }}
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
                setDisplayPreview(false);
                dispatch(actions.setShowGrid(!showGrid));
              }}
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
