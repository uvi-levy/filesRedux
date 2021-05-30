import React, { useState } from 'react'

import AddFolder from "../../../assets/addFolderBtn.png";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./newFolderBtn.css"

import NewFolderPopup from "./NewFolderPopup/NewFolderPopup";

const NewFolder = ({ changeView }) => {

  const [isOpen, setIsOpen] = useState(false);

    return (
      <>
          {/* <Button className="add-new-folder-btn">
              <img src={addFolder} style={{
                  padding: "0",
                  borderRadius: "25%",
                  borderColor: "#F4B248"
              }}></img>
          </Button> */}

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
            className="newFolder"
            onClick={() => {
              setIsOpen(true);
              changeView("newFolder")
            }}
          >
              <img src={AddFolder}></img>
          </button>
        </OverlayTrigger>
        <NewFolderPopup isOpen={ isOpen } setIsOpen={ setIsOpen } />
      </>
    )
}

export default NewFolder
