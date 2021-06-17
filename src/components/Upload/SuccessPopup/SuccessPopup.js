import React from 'react';

import Modal from "react-bootstrap/Modal";

import Success from "../../../assets/success-upload.png";

import "./successPopup.css"

const SuccessPopup = ({ isOpen, setIsOpen }) => {

    const hideModal = () => {
        setIsOpen(false);
      };

    return (
        <div>
            <Modal show={isOpen} onHide={hideModal} dialogClassName={"success-upload-modal"}>
                <Modal.Body>
                    <img src={Success} className="success-img"/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SuccessPopup
