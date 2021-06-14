import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import $ from "jquery";

import { Card } from "react-bootstrap";

import actions from "../../actions";

import Navbar from "../Navbar/Navbar";
import TopPattern from "./TopPattern/TopPattern";
import Folders from "./Folders/Folders";
import Files from './Files/Files';

import imgFile from "../../assets/file-solid.png";
import Img from "../../assets/image-regular.png";
import Adiuo from "../../assets/headphones-solid.png";
import Video from "../../assets/video-solid.png";
import SingleUser from "../../assets/user-solid.png";
import BigAudio from "../../assets/big-audio.png";
import BigVideo from "../../assets/big-video.png";
import BigFile from "../../assets/big-file.png";
import FileCard from "../../assets/Group.png";

import ImageIcon from "../../assets/image-icon.png";
import PdfIcon from "../../assets/pdf-icon.png";
import AudioIcon from "../../assets/audio-icon.png";
import VideoIcon from "../../assets/video-icon.png";
import FileIcon from "../../assets/file-icon.png";

import "./home.css"
import Trash from '../Trash/Trash';

const Home = ({ data, setData, setFiles, files, trashFiles, filteredFilesByType, loadFolders, setFilteredFiles, filteredFiles }) => {

    let history = useHistory();

    let url = window.location;
    let userName = url.pathname.split("/")[1];
  
    const [jwtFromCookie, setJwtFromCookie] = useState("");
    const [next, setNext] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [visibleNewFolder, setVisibleNewFolder] = useState(false);
    const [showBreadcrumb, setShowBreadcrumb] = useState(false);
    const [inFolder, setInFolder] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [grid, setGrid] = useState([]);
    const [view, setView] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [rowIndex, setRowIndex] = useState(0);
    const [folderName, setFolderName] = useState("");
    const [filter, setFilter] = useState([{}]);

    useEffect(()=>{
      let tmpJwtFromCookie;
      if (window.location.href.includes("http://localhost:3000/uvi")) {
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
    }, [files, history]);
    
    useEffect(() => {
      if(data) loadFolders()
    }, [data]);

    useEffect(() => {
      if (jwtFromCookie) loadFiles()
    }, [jwtFromCookie]);

    useEffect(() => {
      showFiles();
    }, [filteredFiles]);

    const loadFiles = () => {
      let url = window.location;
      let userName = url.pathname.split("/")[1];
      console.log("load");
      $.ajax({
        type: "GET",
        url: "https://files.codes/api/" + userName, 
        headers: { authorization: jwtFromCookie },
        error: (err) => {
          if (err.status == 401) {
            // window.location = "https://dev.accounts.codes/files/login";
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
            setFiles(validFiles);
            setFilteredFiles(validFiles)
        
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

    const showFiles = () => {
      console.log("in showFiles");
  
      var iconsClasses = {
        ai: <img src={imgFile} />,
        docx: <img src={imgFile} />,
        pdf: <img src={imgFile} />,
        xls: <img src={imgFile} />,
        psd: <img src={imgFile} />,
        pptx: <img src={imgFile} />,
        png: <img src={Img} />,
        jpg: <img src={Img} />,
        jpeg: <img src={Img} />,
        mp3: <img src={Adiuo} />,
        mp4: <img src={Video} />,
        gif: <img src={Img} />,
      };
      const tmpRows = [];
      const tmpGrid = [];
      if (filteredFiles) {
        var sortFilesByDate = filteredFiles.slice().reverse();
        console.log(sortFilesByDate);
  
        const user = <img src={SingleUser} />;
        sortFilesByDate.forEach((file) => {
          if (
            file.name &&
            file.dateCreated &&
            file.size &&
            file.name.split(".")[1] &&
            file.name.split("__")[1]
          ) {
            let filePreview;
            let viewIcon;
            if (file.type) {
              if (file.type.includes("video")) viewIcon = BigVideo;
              if (file.type.includes("audio")) viewIcon = BigAudio;
              if (file.type.includes("pdf")) viewIcon = BigFile;
              if (file.type.includes("image")) viewIcon = BigFile;
            } else {
              viewIcon = BigFile;
            }
  
            if (
              file.name.toLowerCase().split(".")[1] == "png" ||
              file.name.toLowerCase().split(".")[1] == "jpg" ||
              file.name.toLowerCase().split(".")[1] == "jpeg" //replace file.type.includes("image")
            ) {
              filePreview = (
                <Card.Text
                  style={{
                    height: "145px",
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                    backgroundColor: "#EFF0F2",
                    marginBottom: "0",
                    marginTop: "0"
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      height: "100%",
                      margin: "auto",
                    }}
                    src={file.url}
                  />
                </Card.Text>
              );
            } else {
              filePreview = (
                <Card.Text
                  style={{
                    height: "145px",
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                    backgroundColor: "#EFF0F2",
                    marginBottom: "0",
                    marginTop: "0"
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      maxHeight: "60%",
                      margin: "auto",
                    }}
                    src={viewIcon}
                  />
                </Card.Text>
              );
            }

            let fileType = file.name.toLowerCase().split(".")[1];
            let fileIcon = ImageIcon;
            if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif"){
              fileIcon = ImageIcon
            }
            else if(fileType === "ai" ||
                    fileType === "docx" ||
                    fileType === "xls" ||
                    fileType === "psd" ||
                    fileType === "pptx"){
                  fileIcon = FileIcon
            }
            else if(fileType === "pdf"){
                fileIcon = PdfIcon;
            }  
            else if(fileType === "mp3"){
              fileIcon = AudioIcon;
           }   
           else if(fileType === "mp4"){
              fileIcon = VideoIcon;
           }  
          
  
          const row = {
              id: file._id,
              all: iconsClasses[file.name.toLowerCase().split(".")[1]],
              name: file.name.split("__")[1].substr(0, 19),
              team: user,
              date: file.dateCreated.split("T")[0].substr(2),
              file: file.name.split(".")[1],
              "file size": (file.size * 1024).toPrecision(4) + " KB",
            };
            const gridCard = (
              <Card
                id={file._id}
                className="gridCard"
                onClick={() => findFile(null, null, null, file._id)}
                style={{
                  width: "200px",
                  height: "185px",
                  overflow: "hidden",
                  padding: "0",
                  margin: "10px"
                }}
              >
                <Card.Body
                  style={{ padding: "0px", cursor: "pointer", marginBottom: "0" }}
                >
                  {filePreview}
                  <Card.Title
                    style={{
                      padding: "0",
                      textAlign: "left",
                      justifyContent: "center",
                      marginTop: "3px",
                    }}
                  >
                    <img src={fileIcon} 
                      style={{ width: "12px", marginLeft: "7px", marginRight: "3px" }}></img>
                    <p
                      style={{
                        fontSize: "70%",
                        marginLeft: "1%",
                        display: "inline",
                      }}
                    >
                      {file.name.split("__")[1].substr(0, 16)}
                    </p>
                  </Card.Title>
                </Card.Body>
              </Card>
            );
  
            tmpRows.push(row);
            tmpGrid.push(gridCard);
          }
        });
      } else console.log("no files");
      // if (folders && inFolder == true) 
      // {
      //   folders.forEach((folder) => {
      //     var folderImg = <img src={Folder} />;
      //     if (folder.name && folder.date) {
      //       const row = {
      //         id: "folder " + folder.name,
      //         all: folderImg,
      //         name: folder.name,
      //         date: folder.date.split("T")[0].substr(2),
      //         "file size": folder.size.toPrecision(4).toString() + " KB",
      //       };
      //       const gridCard = (
      //         <Card
      //           className="gridCard"
      //           onClick={() =>
      //             findFile(null, null, null, "folder/" + folder.name)
      //           }
      //           style={{
      //             width: "200px",
      //             height: "185px",
      //             overflow: "hidden",
      //             padding: "0",
      //             margin: "10px"
      //           }}
      //         >
      //           <Card.Body style={{ padding: "1%" }}>
      //             <Card.Text
      //               style={{
      //                 height: "130px",
      //                 textAlign: "center",
      //                 alignItems: "center",
      //                 display: "flex",
      //                 cursor: "pointer",
      //                 width: "100%",
      //                 margin: "0",
      //                 backgroundColor: "#EFF0F2",
      //               }}
      //             >
      //               <img
      //                 style={{
      //                   display: "block",
      //                   maxWidth: "95%",
      //                   maxHeight: "95%",
      //                   margin: "auto",
      //                 }}
      //                 src={FileCard}
      //               />
      //             </Card.Text>
      //             <Card.Title>
      //               <p style={{ fontSize: "85%" }}>{folder.name}</p>
      //             </Card.Title>
      //           </Card.Body>
      //         </Card>
      //       );
      //       tmpRows.push(row);
      //       tmpGrid.push(gridCard);
      //     }
      //   });
      // }
      setView(tmpRows);
      setGrid(tmpGrid);
    } 

    const findFile = (row, isSelect, tmpRowIndex, checkBoxValue) => {
      console.log("in findFile " + isSelect);
      var cards = $(".gridCard");
      cards.css("outline", "none ");
  
      if (row) {
        if (row.id.includes("folder")) {
          console.log(row.id);
          findByTag(row.name);
        }
      }
      console.log("checkBoxValue" + checkBoxValue);
      if (typeof checkBoxValue === "string") {
        if (checkBoxValue.includes("folder")) {
          console.log(checkBoxValue.split("/")[1]);
          findByTag(checkBoxValue.split("/")[1]);
        }
      }
  
      files.forEach((file) => {
        if (row) {
          if (file._id == row.id) {
            console.log(file);
  
            if (isSelect) {
              // showPreFile(file);  //preview
  
              setSelectedFile(file);
              setRowIndex(tmpRowIndex);
            }
          }
        }
  
        if (checkBoxValue) {
          if (file._id == checkBoxValue) {
            console.log(file);
  
            var card = $("#" + checkBoxValue);
            card.css("outline", "1px solid #8181A5 ");
            // showPreFile(file);  //preview
  
            setSelectedFile(file);
            setRowIndex(tmpRowIndex);
          }
        }
      });
    }
 
    const findByTag = (folder) => {
      let url = window.location;
      let userName = url.pathname.split("/")[1];
      console.log("in findByTag");
      console.log(folder);
      setFolderName(folder);
      console.log(jwtFromCookie);
      $.ajax({
          type: "GET",
          url:
          "https://files.codes/api/" +
          userName +
          "/findByTag/" +
          folder,
          headers: { Authorization: jwtFromCookie },
          success: (data) => {
          console.log(data);
          setShowBreadcrumb(true);
          setCurrentPage(1);
          setFilter(data);
          setInFolder(false);
          },
          error: (err) => {
          alert("please try again later");
          },
      });
    };

    const changeProps = (files, showFolder, History) => {
      console.log("filesChangeProps" + files);

      setFilteredFiles(files);
      setInFolder(showFolder);
      setShowBreadcrumb(false);
      setCurrentPage(1);
    };

    return (
      <div>
          <div>
            <Switch>
              <Route exact path="/:userName">
                <>
                <Navbar changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } jwtFromCookie={ jwtFromCookie } changeProps={ changeProps } files={ files } />
                <div className="home-container">
                  <TopPattern jwtFromCookie={ jwtFromCookie } changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } setVisibleNewFolder={ setVisibleNewFolder } loadFiles={ loadFiles } />
                  <Folders/>
                  <Files setInFolder={ setInFolder } jwtFromCookie={ jwtFromCookie } setShowBreadcrumb={ setShowBreadcrumb } showGrid={ showGrid } currentPage={ currentPage } setCurrentPage={ setCurrentPage } showFiles={ showFiles } grid={ grid } view={ view } filter={ filter } findByTag={ findByTag } findFile={ findFile }/>
                </div>
                </>
              </Route>
              <Route exact path="/:userName/upload">
                <TopPattern jwtFromCookie={ jwtFromCookie } changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } setVisibleNewFolder={ setVisibleNewFolder } loadFiles={ loadFiles } />
              </Route>
              <Route exact path="/:userName/trash">
              <>
                <Navbar changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } jwtFromCookie={ jwtFromCookie } changeProps={ changeProps } files={ trashFiles }/>
                <div className="home-container">
                  <TopPattern jwtFromCookie={ jwtFromCookie } changeView={ changeView } showGrid={ showGrid } setShowGrid={ setShowGrid } setVisibleNewFolder={ setVisibleNewFolder } loadFiles={ loadFiles } />
                  <Trash changeView={ changeView } homeLoadFiles={ loadFiles } jwtFromCookie={ jwtFromCookie } showGrid={ showGrid }/>
                </div>
                </>
              </Route>
              {/* add protected route for admin */}
              {/* <Route/> add err page */}
            </Switch>
          </div>
      </div>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      files: state.data.files,
      data: state.data.data,
      filteredFiles: state.data.filteredFiles,
      trashFiles: state.data.trashFiles,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setData: (data) => dispatch(actions.setData(data)),
      setFiles: (files) => dispatch(actions.setFiles(files)),
      filteredFilesByType: () => dispatch(actions.filteredFilesByType()),
      loadFolders: () => dispatch(actions.loadFolders()),
      setFilteredFiles: (files) => dispatch(actions.setFilteredFiles(files))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
