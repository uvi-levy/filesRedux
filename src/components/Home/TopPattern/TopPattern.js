import React from "react";
import { connect } from "react-redux";

import DisplayButtons from "./DisplayButtons/DisplayButtons";
import NewFolderBtn from "./NewFolderBtn/NewFolderBtn";
import UploadBtn from "../../../utility/UploadBtn/UploadBtn";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import EmptyTrashBtn from "../../Trash/EmptyTrashBtn/EmptyTrashBtn";

import "./topPattern.css";

import File from "../../../assets/orange-file.svg";
import Trash from "../../../assets/trash-orange.svg";

const TopPattern = ({
  breadCrumbs,
  showBreadcrumb,
  location,
  setDisplayPreview,
}) => {
  return (
    <div className="home-top-pattern">
      <div className={location !== "trash" ? "left-div" : "left-div-trash"}>
        <BreadCrumbs
          icon={location !== "trash" ? File : Trash}
          header={location !== "trash" ? "My Files" : "Trash"}
          crumbs={location !== "trash" && breadCrumbs}
          showBreadcrumb={showBreadcrumb}
        />
      </div>

      <div className="right-div">
        <DisplayButtons setDisplayPreview={setDisplayPreview} />
        <div className="vertical-line"></div>
        {location !== "trash" ? (
          <>
            <UploadBtn isLink={true} />
            <NewFolderBtn />
          </>
        ) : (
          <EmptyTrashBtn />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: state.data.location,
  };
};
export default connect(mapStateToProps)(TopPattern);
