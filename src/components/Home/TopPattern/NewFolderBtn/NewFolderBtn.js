import React, { useState } from "react";

import AddFolder from "../../../../assets/add-folder-orange.png";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./newFolderBtn.css";

import NewFolderPopup from "./NewFolderPopup/NewFolderPopup";

const NewFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip>
            <span>create new folder</span>
          </Tooltip>
        }
      >
        <button
          className="btn new-folder-btn"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={AddFolder}></img>
        </button>
      </OverlayTrigger>
      <NewFolderPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default NewFolder;
