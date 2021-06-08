import React from 'react'
import { connect } from "react-redux";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import "./folders.css"

const Folders = ({ folders }) => {
    if(!folders) return null;
    return (
        <>
        {/* <OverlayScrollbarsComponent
                  options={{
                    overflowBehavior: {
                      x: "hidden",
                      y: "scroll",
                    },
                    scrollbars: {
                      visibility: "auto",
                      autoHide: "leave",
                      autoHideDelay: 400,
                    },
                    className: "os-theme-thin-dark",
                  }}
                > */}
        <div className="folders">
            
            <p>My folders</p>
            {
                folders.map((folder) => folder.name && <button className="btn folder">
                    {folder.name}
                </button>)
            }
        </div>
        {/* </OverlayScrollbarsComponent> */}
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        folders: state.data.folders
    }
}
export default connect(mapStateToProps)(Folders)
