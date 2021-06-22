import React from "react";
import { connect } from "react-redux";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import "./folders.css";

const Folders = ({
  files,
  folders,
  changeProps,
  setBreadCrumbs,
  setShowBreadcrumb,
}) => {
  const handleClick = (folderName) => {
    console.log(folderName);
    let myFiles = [];
    files.forEach((file) => {
      if (file.tags == folderName + "/") myFiles.push(file);
    });
    changeProps(myFiles, null, null);
    setBreadCrumbs("/ " + folderName);
    setShowBreadcrumb(true);
  };

  if (!folders) return null;
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
        {folders.map(
          (folder) =>
            folder.name && (
              <button
                className="btn folder"
                onClick={() => handleClick(folder.name)}
              >
                {folder.name}
              </button>
            )
        )}
      </div>
      {/* </OverlayScrollbarsComponent> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    folders: state.data.folders,
    files: state.data.files,
  };
};
export default connect(mapStateToProps)(Folders);
