import React from 'react'
import { connect } from "react-redux";

import DisplayButtons from "./DisplayButtons/DisplayButtons";
import NewFolderBtn from "./NewFolderBtn/NewFolderBtn";
import UploadBtn from "./Upload/UploadBtn";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import EmptyTrashBtn from "../../Trash/EmptyTrashBtn/EmptyTrashBtn";

import "./topPattern.css"

import File from "../../../assets/orange-file.png";
import Trash from "../../../assets/trash-orange.png";

const TopPattern = ({ showGrid, setShowGrid, changeView, jwtFromCookie, setVisibleNewFolder, loadFiles, breadCrumbs, showBreadcrumb, location }) => {
    
    return (
        <div className="home-top-pattern">
           <div className={location !== "trash" ? "left-div" : "left-div-trash" }>
                <BreadCrumbs icon={ location !== "trash" ? File : Trash } header={location !== "trash" ? "My Files" : "Trash"} crumbs={location !== "trash" && breadCrumbs} showBreadcrumb={ showBreadcrumb } />
           </div>
                      
            <div className="right-div">
                <DisplayButtons showGrid={ showGrid } setShowGrid={ setShowGrid }/>
                <div className="vertical-line"></div>
                {
                    location !== "trash" ? 
                    <>
                        <UploadBtn changeView={ changeView }/>
                        <NewFolderBtn jwtFromCookie={ jwtFromCookie } changeView={ changeView } setVisibleNewFolder={ setVisibleNewFolder } loadFiles={ loadFiles }/>
                    </>
                    :
                    <EmptyTrashBtn loadFiles={ loadFiles } jwtFromCookie={ jwtFromCookie } />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        location: state.data.location
    }
}
export default connect(mapStateToProps)(TopPattern)
