import React from 'react'

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import Close from "../../../assets/close-gray.png";

import "./emptyTrashPopup.css"

const EmptyTrashPopup = ({ isOpen, setIsOpen }) => {
    
      const hideModal = () => {
        setIsOpen(false);
      };

    return (  
     <>
      <Modal show={isOpen} onHide={hideModal} dialogClassName={"empty-trash-modal"}>
          <Container>
          <Row>
              <div className="line-up">
              </div>
            </Row>
            <Row>
              <Col>
                <Modal.Title>Are You Sure You Want To Empty The Trash?</Modal.Title>
              </Col>
            </Row>
          </Container>
        <Modal.Body>
          <Row className="buttons-container">
            <Col style={{ padding: "0" }}>
              <Button className="cancel-btn" 
              onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col style={{ padding: "0", marginLeft: "5px" }}>
              <Button className="create-btn">
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default EmptyTrashPopup
