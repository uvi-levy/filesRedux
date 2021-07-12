import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import actions from "../../../redux/actions";

import NoFiles from "./NoFiles/NoFiles";

import "./files.css";

import GridDispaly from "./GridDisplay/GridDispaly";
import ListDispaly from "./ListDispaly/ListDispaly";
import Loader from "../../../utility/Loader/Loader";

const Files = ({
  files,
  isLoadFiles,
  folders,
  loadFolders,
  filteredFiles,
  setFilteredFiles,
  currentPage,
  setCurrentPage,
  showFiles,
  grid,
  view,
  filter,
  findFile,
  setLocation,
}) => {
  const [cardsPerPage, setCardsPerPage] = useState(12);

  useEffect(() => {
    loadFolders();
    showFiles();
    setFilteredFiles(files);
    setLocation("home");
  }, []);

  useEffect(() => {
    loadFolders();
  }, [files]);

  useEffect(() => {
    showFiles();
  }, [folders, filter]);

  if (isLoadFiles === true) {
    return <Loader />;
  }
  if (files.length == 0 && isLoadFiles === false) {
    return <NoFiles />;
  }

  if (filteredFiles.length == 0) {
    return (
      <>
        <p>no files were found</p>
      </>
    );
  }

  return (
    <div className="files">
      <p>My files</p>
      <GridDispaly
        files={files}
        grid={grid}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cardsPerPage={cardsPerPage}
      />
      <ListDispaly
        findFile={findFile} view={view} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.data.files,
    isLoadFiles: state.data.isLoadFiles,
    folders: state.data.folders,
    isLoadFolders: state.data.isLoadFolders,
    filteredFiles: state.data.filteredFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFolders: () => dispatch(actions.loadFolders()),
    setFilteredFiles: (files) => dispatch(actions.setFilteredFiles(files)),
    setLocation: (location) => dispatch(actions.setLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
