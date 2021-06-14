import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import Search from "./Search/Search";
import FilterButtons from "./FilterButtons/FilterButtons";
import Chart from "./Chart/Chart";

import "./navbar.css"

import { Container, Row, Col } from 'react-bootstrap';
import actions from '../../actions';

const Navbar = ({ files, filteredFilesByType, changeView, changeProps, jwtFromCookie, filteredFilesByTypeFunc }) => {

    let url = window.location;
    let userName = url.pathname.split("/")[1];

    useEffect(() => {
      filteredFilesByTypeFunc();
    }, [])

    useEffect(() => {
      console.log(filteredFilesByType);
    }, [filteredFilesByType])

    const filteredFilesFunc = (type, searchVal) => {
        let tmpFiles = [];
        tmpFiles = files;
        console.log("in filterFiles");

        let filtaredFiles=[];
        // changeView(userName); 

        console.log(tmpFiles);

        if (tmpFiles && tmpFiles.length) {
          if (type == "folder") {
            changeProps([], true); 
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
            changeProps(result, false);
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
        <div className="navbar" style={{display: "flex", alignItems: "center"}}>
          <div className="left-div">
            <Container fluid>
              <Row>
                <Col>
                  <Search filteredFiles={ filteredFilesFunc }/>
                </Col>
                <Col >
                  <Chart jwtFromCookie={ jwtFromCookie }/>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="filter-buttons">
            <FilterButtons filteredFiles={ filteredFilesFunc }/>
          </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
         filteredFilesByType: state.data.filteredFilesByType,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filteredFilesByTypeFunc: () => dispatch(actions.filteredFilesByType())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
