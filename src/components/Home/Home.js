import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import $ from "jquery";

import actions from "../../actions";

import Navbar from "../Navbar/Navbar";
import Trash from '../Trash/Trash';

const Home = ({ setData, setFiles, files, filteredFilesByType, loadFolders }) => {

    const history = useHistory();

    let url = window.location;
    let userName = url.pathname.split("/")[1];
  
    const [jwtFromCookie, setJwtFromCookie] = useState("");
    const [filterdFiles, setFilterdFiles] = useState([{}]);
    const [next, setNext] = useState(false);
    const [noFiles, setNoFiles] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [visibleNewFolder, setVisibleNewFolder] = useState(false);
  
    useEffect(()=>{
      let tmpJwtFromCookie;
      if (window.location == "http://localhost:3000/uvi") {
        tmpJwtFromCookie =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJnS1h4ckFheVdlWE9VcWZOdGs2VllvdXRsRUwyIiwiZW1haWwiOiJ1dmlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjE5NTk4MjMzfQ.4hcZDKwWHDsfZ9gLPU1r8pvqPpYm1Dr9XZ5xJY_hqlc";
      } else {
        tmpJwtFromCookie = document.cookie
          ? document.cookie
              .split(";")
              .filter((s) => s.includes("jwt"))[0]
              .split("=")
              .pop()
          : null;}
          setJwtFromCookie(tmpJwtFromCookie)
    }, [])
  
    useEffect(() => {
      console.log("files==" + files);
      if (history) history.push("/" + userName); 
      if(files.length > 0) 
      {
        filteredFilesByType()
      }
    }, [files, history])

    useEffect(() => {
      loadFolders()
    }, [filteredFilesByType])
  
    useEffect(() => {
      if (jwtFromCookie) loadFiles()
    }, [jwtFromCookie])
  
    const loadFiles = () => {
      console.log("load");
      $.ajax({
        type: "GET",
        url: "https://files.codes/api/uvi", //+ localStorage.getItem("userName"),
        headers: { authorization: jwtFromCookie },
        error: (err) => {
          if (err.status == 401) {
            window.location = "https://accounts.codes/files/login";
          }
        },
        success: (data) => {
          console.log("*data.length*", data, typeof data);
          if (data.length > 0) {
            setData( data );
            let validFiles = data.filter(
              (file) => file.name && file.size && file.dateCreated
            );
            setNext(true);
            setFiles(validFiles)
        
          } else {
            setNext(true);
            setData("no-files")
          }
        },
      });
    }

    const changeView = (view) => {
      if (view == "list") {
        setShowGrid(false)
      }
      if (view == "grid") {
        setShowGrid(true)
      }
      if (view == "trash") {
        history.push("/" + userName + "/trash");
      }
      if (view == "upload") {
        history.push("/" + userName + "/upload");
      }
      if (view == userName) {
        history.push("/" + userName);
      }
      if (view == "newFolder") {
        setVisibleNewFolder(true)
      }
      if (view == "noFiles") {
        // this.setState({
        //   noFiles: (
        //     <div style={{ height: "50%", width: "100%" }}>
        //       <NoFiles
        //         goToUpload={() => {
        //           this.props.history.push("/" + userName + "/upload");
        //         }}
        //       />
        //     </div>
        //   ),
        // });
      }
    };

    return (
        <div>
          <Navbar changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } />
          <Trash/>
        </div>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      files: state.data.files
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setData: (data) => dispatch(actions.setData(data)),
      setFiles: (files) => dispatch(actions.setFiles(files)),
      filteredFilesByType: () => dispatch(actions.filteredFilesByType()),
      loadFolders: () => dispatch(actions.loadFolders())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
