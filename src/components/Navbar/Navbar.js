import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

// import actions from "../../actions";

import Search from "./Search/Search";
import DisplayButtons from "./DisplayButtons/DisplayButtons";
import UploadBtn from "./Upload/UploadBtn";
import FilterButtons from "./FilterButtons/FilterButtons";
import NewFolderBtn from "./NewFolderBtn/NewFolderBtn";
import Chart from "./Chart/Chart";

const Navbar = ({ files, filteredFilesByType, changeView, changeProps, showGrid, setShowGrid }) => {

    let url = window.location;
    let userName = url.pathname.split("/")[1];
    
    useEffect(() => {
        console.log(filteredFilesByType);
    }, [filteredFilesByType])

    const filteredFiles = (type, searchVal) => {
        const tmpFiles = files;
        console.log("in filterFiles");
        let filtaredFiles=[];
        changeView(userName); 

        console.log(tmpFiles);

        if (tmpFiles && tmpFiles.length) {
          if (type == "folder") {
            changeProps([], true); //add
          }
          if (type == "search") {
            console.log("in searchInFiles");
            const value = searchVal;
            console.log(value);
            let result = [];
            tmpFiles.forEach((file) => {
              if (file.name.toLowerCase().includes(value)) {
                result.push(file);
              }
            });
            // changeProps(result, false);
          }
          if (type == "img") {
            filtaredFiles =  filteredFilesByType[0].img;
    
            console.log("img" + filtaredFiles);
            changeProps(filtaredFiles, false);
          }
          if (type == "audio") {
             filtaredFiles = filteredFilesByType[1].audio;
            console.log(filtaredFiles, false);
    
            changeProps(filtaredFiles);
          }
          if (type == "video") {
            filtaredFiles = filteredFilesByType[2].video;
            console.log(filtaredFiles);
    
            changeProps(filtaredFiles, false);
          }
          if (type == "file") {
            filtaredFiles = filteredFilesByType[3].others;
            console.log(filtaredFiles);
    
            changeProps(filtaredFiles, false);
          }
          if (type == "all") {
            changeProps(tmpFiles, true);
            changeView(userName);
          }
        }
        if(filtaredFiles.length < 1) {
            console.log("no files")
            changeView("noFiles")
        }
        if (type == "trash") {
            console.log("trash");
            changeView("trash");
        }
      }

    return (
        <div>
          <Search filteredFiles={ filteredFiles }/>
          <DisplayButtons showGrid={ showGrid } setShowGrid={ setShowGrid }/>
          <UploadBtn changeView={ changeView }/>
          <FilterButtons filteredFiles={ filteredFiles }/>
          <NewFolderBtn changeView={ changeView }/>
          <Chart/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
         files: state.data.files,
         filteredFilesByType: state.data.filteredFilesByType
    }
}

export default connect(mapStateToProps)(Navbar)
