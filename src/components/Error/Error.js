import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import Logo from "../../assets/leader.svg";
import Angel from "../../assets/angel.svg";

import { USER_NAME } from "../../utility/constants";

const Error = () => {
  return (
    <div>
      <Container fluid style={{ height: "100vh" }}>
        <Container fluid style={{ height: "calc(100vh - 90px)" }}>
          <Row>
            <Col style={{ margin: "20px 0px 0px 20px" }}>
              <img src={Logo} />
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ textAlign: "center", alignItems: "center" }}>
              <Row>
                <Col style={{ color: "#A6A4B1" }}>
                  <h3>Sorry… the page is not found</h3>
                </Col>
              </Row>

              <Row>
                <Col style={{ color: "#29B4FD", padding: "0px" }}>
                  <h1 style={{ margin: "0px", paddingBottom: "0" }}>Error</h1>
                  <h1
                    style={{
                      fontSize: "200px",
                      margin: "0px",
                      paddingBottom: "0",
                    }}
                  >
                    404
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col style={{ color: "#29B4FD" }}>
                  <Link to={`/${USER_NAME}`}>
                    <Button
                      style={{ backgroundColor: "#A6A4B1", color: "#FFFFFF" }}
                    >
                      Return to home page
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col md={5} style={{ height: "80%", padding: "0" }}>
              <img src={Angel} style={{ height: "70%", width: "70%" }} />
            </Col>
          </Row>
        </Container>
        <Row style={{ marginBottom: "5px" }}>
          <Col id="footer404" style={{ height: "90px" }}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error;
