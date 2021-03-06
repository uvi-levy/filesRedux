import React, { useState } from "react";

import "./preview.css";

import DeleteFilePopup from "./DeleteFilePopup/DeleteFilePopup";
import GetLinkPopup from "./GetLinkPopup/GetLinkPopup";
import FilePreview from "./FilePreview/FilePreview";
import SharePopup from "./SharePopup/SharePopup";
import CleanPreview from "./CleanPreview/CleanPreview";

const Preview = ({
  file,
  setFile,
  findByTag,
  setShowBreadcrumb,
  setPreview,
  setShowToast,
  setDisplayPreview,
  setIsFullScreen,
}) => {
  const [visibleDel, setVisibleDel] = useState(false);
  const [visibleGetLink, setVisibleGetLink] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);

  const toggleDeleteDialog = () => {
    setVisibleDel(!visibleDel);
  };

  const toggleGetLink = () => {
    setVisibleGetLink(!visibleGetLink);
  };

  const toggleVisibleShare = () => {
    setVisibleShare(!visibleShare);
  };

  const cleanPreView = () => {
    setPreview(<CleanPreview />);
  };

  return (
    <>
      {visibleGetLink && (
        <GetLinkPopup
          visibleGetLink={visibleGetLink}
          setVisibleGetLink={setVisibleGetLink}
          selectedFile={file}
        />
      )}
      {visibleDel && (
        <DeleteFilePopup
          visibleDel={visibleDel}
          setVisibleDel={setVisibleDel}
          selectedFile={file}
          cleanPreView={cleanPreView}
          setShowToast={setShowToast}
          setDisplayPreview={setDisplayPreview}
        />
      )}
      {visibleShare && (
        <SharePopup
          toggleVisibleShare={toggleVisibleShare}
          file={file}
          visibleShare={visibleShare}
        />
      )}
      <FilePreview
        selectedFile={file}
        setSelectedFile={setFile}
        findByTag={findByTag}
        setShowBreadcrumb={setShowBreadcrumb}
        toggleGetLink={toggleGetLink}
        toggleDeleteDialog={toggleDeleteDialog}
        toggleVisibleShare={toggleVisibleShare}
        setDisplayPreview={setDisplayPreview}
        setIsFullScreen={setIsFullScreen}
      />
    </>
  );
};

export default Preview;
