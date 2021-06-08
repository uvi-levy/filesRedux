import React from 'react'

import DisplayButtons from "./DisplayButtons/DisplayButtons";
import NewFolderBtn from "./NewFolderBtn/NewFolderBtn";
import UploadBtn from "./Upload/UploadBtn";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import EmptyTrashBtn from "../../Trash/EmptyTrashBtn/EmptyTrashBtn";

import "./topPattern.css"

import File from "../../../assets/orange-file.png";
import Trash from "../../../assets/trash-orange.png";

const TopPattern = ({ showGrid, setShowGrid, changeView, jwtFromCookie, setVisibleNewFolder, loadFiles }) => {
    let url = window.location;
    let location = url.pathname.split("/")[2];
    console.log(location);
    return (
        <div className="home-top-pattern">
           <div className={location !== "trash" ? "left-div" : "left-div-trash" }>
                <BreadCrumbs icon={ location !== "trash" ? File : Trash } header={location !== "trash" ? "My Files" : "Trash"} crumbs={location !== "trash" && null} />
           </div>
                      
            <div className="right-div">
                <DisplayButtons showGrid={ showGrid } setShowGrid={ setShowGrid }/>
                <div className="vertical-line"></div>
                {
                    location !== "trash" ? 
                    <>
                        <UploadBtn/>
                        <NewFolderBtn jwtFromCookie={ jwtFromCookie } changeView={ changeView } setVisibleNewFolder={ setVisibleNewFolder } loadFiles={ loadFiles }/>
                    </>
                    :
                    <EmptyTrashBtn/>
                }
            </div>
        </div>
    )
}

export default TopPattern
