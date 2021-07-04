import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import actions from "../../../actions";

import NoFiles from "./NoFiles/NoFiles";

import "./files.css";

import GridDispaly from "./GridDisplay/GridDispaly";
import ListDispaly from "./ListDispaly/ListDispaly";
import PageNumbers from "../../PageNumbers/PageNumbers";
import Loader from "../../Loader/Loader";

const Files = ({
  files,
  isLoadFiles,
  showGrid,
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
  // findByTag,
  findFile,
  setLocation,
}) => {
  const [visibleDel, setVisibleDel] = useState(false);

  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [filePreview, setFilePreview] = useState(
    <p style={{ margin: "0", color: "#75798E" }}>no Preview Available</p>
  );

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

  // const toggleDeleteDialog = () => {
  //   setVisibleDel(!visibleDel);
  // }

  // const showPreFile = (file) => {
  //     if (file) {
  //       console.log("showPreFile", file);

  //       var preFile;
  //       var folderButton = (
  //         <button
  //           className="btn btn-outline-secondary folderBtn"
  //           style={{ color: "gray", border: "none" }}
  //         >
  //           <img src={Folder} /> /
  //         </button>
  //       );
  //       var p = $("p");
  //       p.attr("contenteditable", "false");
  //       p.css("border", "none ");

  //       if (file.tags != null && file.tags != "" && file.tags != []) {
  //         const folders = file.tags.split("/");
  //         console.log(folders);
  //         const folder = folders[folders.length - 1];
  //         console.log(folder);

  //         folderButton = (
  //           <button
  //             className="btn btn-outline-secondary folderBtn"
  //             style={{ color: "gray", border: "none" }}
  //             onClick={() => findByTag(folder)}
  //           >
  //             <img src={Folder} />
  //             {folder}
  //           </button>
  //         );
  //       }

  //       var notes = [];
  //       console.log(file.notes);
  //       file.notes.forEach((note, index) => {
  //         const fileNotes = (
  //           <Row key={index}>
  //             <Col md={10} style={{ color: "#363839", textAlign: "left" }}>
  //               <Row>
  //                 <Col md={5}>
  //                   <p
  //                     className="notes"
  //                     id={"note" + index}
  //                     onKeyDown={(e) =>
  //                       this.saveEditNote(e, note, note.note, file)
  //                     }
  //                   >
  //                     {note.note}
  //                   </p>
  //                 </Col>
  //                 <Col md={3}>
  //                   <p style={{ float: "right", fontSize: "75%" }}>
  //                     {note.editor}
  //                   </p>
  //                 </Col>
  //                 <Col md={5}>
  //                   <p style={{ float: "right", fontSize: "70%" }}>{note.date}</p>
  //                 </Col>
  //               </Row>

  //               <hr />
  //             </Col>
  //             <Col>
  //               <img
  //                 onClick={() => this.editNote(note, file)}
  //                 style={{ float: "right", cursor: "pointer" }}
  //                 src={Note}
  //               />
  //             </Col>
  //           </Row>
  //         );
  //         notes.push(fileNotes);
  //         console.log("indexNotes" + index);
  //       });

  //       const sharedUsers = [];
  //       file.sharedUsers.forEach((mail) => {
  //         const share = (
  //           <div>
  //             <a href={"mailto:" + mail}>{mail}</a> <br />
  //           </div>
  //         );
  //         sharedUsers.push(share);
  //       });
  //       const hoverButtonsAction = [
  //         {
  //           text: "Delete",
  //           value: "delete",
  //           icon: Delete,
  //           border: "none",
  //           txtColor: "gray",
  //           fun: toggleDeleteDialog,
  //         },
  //         {
  //           text: "Duplication",
  //           value: "copy",
  //           icon: Copy,
  //           border: "groove  1px",
  //           txtColor: "DeepSkyBlue",
  //           fun: this.copyFile,
  //         },
  //         {
  //           text: "Move To",
  //           value: "move",
  //           icon: Move,
  //           border: "none",
  //           color: "purple",
  //           txtColor: "HotPink",
  //           fun: this.moveTo,
  //         },
  //         {
  //           text: "Download",
  //           value: "download",
  //           icon: Download,
  //           border: "none",
  //           txtColor: "gray",
  //           fun: this.download,
  //         },
  //         {
  //           text: "Print",
  //           value: "print",
  //           icon: Print,
  //           border: "groove  1px",
  //           txtColor: "gray",
  //           fun: this.printFile,
  //         },
  //         {
  //           text: "Share",
  //           value: "share",
  //           icon: Share,
  //           border: "none",
  //           txtColor: "gray",
  //           fun: this.toggleDialog,
  //         },
  //         {
  //           text: "Get Link",
  //           value: "link",
  //           icon: Link,
  //           border: "none",
  //           txtColor: "gray",
  //           fun: this.toggleGetLink,
  //         },

  //         // {text:"Embed",value:"embed",icon:Embed,border:'none',txtColor:'gray',fun:this.copyEmbed}
  //       ];
  //       const hoverButtonsActionViews = hoverButtonsAction.map((button) => {
  //         return (
  //           <OverlayTrigger
  //             placement="bottom"
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={
  //               <Tooltip>
  //                 <span>{button.text}</span>
  //               </Tooltip>
  //             }
  //           >
  //             <img
  //               variant="light"
  //               style={{
  //                 color: "#8181A5",
  //                 backgroundColor: "#FFFFFF",
  //                 cursor: "pointer",
  //                 border: "none",
  //                 textAlign: "left",
  //                 padding: "10px",
  //               }}
  //               onClick={() => button.fun()}
  //               src={button.icon}
  //             />
  //           </OverlayTrigger>
  //         );
  //       });

  //       if (
  //         file.name.toLowerCase().split(".")[1] == "png" ||
  //         file.name.toLowerCase().split(".")[1] == "jpg" ||
  //         file.name.toLowerCase().split(".")[1] == "jpeg"
  //       ) {
  //         preFile = (
  //           <div
  //             style={{
  //               height: "150px",
  //               width: "100%",
  //               textAlign: "center",
  //               alignItems: "center",
  //               display: "flex",
  //               cursor: "pointer",
  //               backgroundColor: "#EFF0F2",
  //               marginBottom: "0",
  //             }}
  //           >
  //             <img
  //               style={{
  //                 display: "block",
  //                 maxWidth: "100%",
  //                 maxHeight: "100%",
  //                 margin: "auto",
  //               }}
  //               ref={this.imgRef}
  //               src={file.url}
  //             />
  //           </div>
  //         );
  //       } else {
  //         preFile = (
  //           <div style={{ maxHeight: "250px", width: "100%" }}>
  //             <iframe
  //               src={file.url}
  //               style={{ width: "50%", height: "50%" }}
  //               autoplay="0"
  //               autostart="0"
  //               allowfullscreen
  //               ref={this.imgRef}
  //               muted
  //             ></iframe>
  //           </div>
  //         );
  //       }
  //       var fileUrl = (
  //         <Container
  //           fluid
  //           style={{
  //             width: "95%",
  //             color: "#8181A5",
  //             display: "block",
  //             overFlow: "scroll",
  //           }}
  //         >
  //           <Row style={{ textAlign: "center", marginTop: "0.5%" }}>
  //             <Col>{hoverButtonsActionViews}</Col>
  //           </Row>
  //           <hr />
  //           <Row className="justify-content-md-center">
  //             <Col
  //               style={{
  //                 width: "98%",

  //                 textAlign: "center",
  //               }}
  //             >
  //               {preFile}
  //             </Col>
  //           </Row>

  //           <div>
  //             <Row className="justify-content-md-center">
  //               <Col md={7}>
  //                 <p style={{ fontWeight: "bold", margin: "4%" }}>
  //                   {file.name.split("__")[1].substr(0, 15)}
  //                 </p>
  //               </Col>
  //               <Col md={4}>{folderButton} </Col>
  //             </Row>
  //             <Row
  //               className="justify-content-md-center"
  //               style={{ marginTop: "1%" }}
  //             >
  //               <Col
  //                 md={10}
  //                 style={{
  //                   marginRight: "0px",
  //                   padding: "0",
  //                   borderRadius: "8px 0 0 8px",
  //                 }}
  //               >
  //                 <textarea
  //                   style={{
  //                     width: "100%",
  //                     height: "100%",
  //                     border: "none",
  //                     backgroundColor: "#F6F6FA",
  //                     fontSize: "60%",
  //                     resize: "none",
  //                     float: "right",
  //                   }}
  //                   ref={this.textAreaLinkRef}
  //                   value={file.url}
  //                 ></textarea>
  //               </Col>
  //               <Col style={{ padding: "0" }}>
  //                 <Button
  //                   variant="primary"
  //                   onClick={this.getLink}
  //                   style={{
  //                     borderRadius: "0 8px 8px 0 ",
  //                     float: "left",
  //                     margin: "0",
  //                   }}
  //                 >
  //                   <img src={LinkW} />
  //                 </Button>
  //               </Col>
  //             </Row>
  //             <hr />
  //             <Row>
  //               <Col md={5}>
  //                 {" "}
  //                 <p style={{ marginBottom: "0" }}>
  //                   Date Created{" "}
  //                   <p style={{ color: "#363839", display: "inline" }}>
  //                     {file.dateCreated.split("T")[0].substr(2)}
  //                   </p>
  //                 </p>{" "}
  //               </Col>
  //               <Col md={5}>
  //                 {" "}
  //                 <p style={{ float: "right", marginBottom: "1%" }}>
  //                   Size{" "}
  //                   <p style={{ color: "#363839", display: "inline" }}>
  //                     {" "}
  //                     {(file.size * 1024).toPrecision(4) + " KB"}
  //                   </p>
  //                 </p>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col md={6}>
  //                 {" "}
  //                 <p>
  //                   Shared With{" "}
  //                   <p style={{ color: "#363839", display: "inline" }}>
  //                     {sharedUsers}
  //                   </p>
  //                 </p>
  //               </Col>
  //               <Col md={6}>
  //                 {" "}
  //                 <p style={{ float: "right" }}>
  //                   Format{" "}
  //                   <p style={{ color: "#363839", display: "inline" }}>
  //                     {file.name.toLowerCase().split(".")[1]}
  //                   </p>
  //                 </p>
  //               </Col>
  //             </Row>
  //             <Row className="justify-content-between">
  //               <Col>Notes</Col>
  //             </Row>
  //             <Row>
  //               <Col style={{ textAlign: "center" }}>
  //                 <hr />
  //                 {notes}
  //                 <Row>
  //                   <Col style={{ position: "relative" }}>
  //                     <textarea
  //                       placeholder="Add your note here..."
  //                       ref={this.textAreaNoteRef}
  //                       style={{
  //                         width: "100%",
  //                         height: "100px",
  //                         resize: "none",
  //                         border: "none",
  //                         outline: "0.2px solid #8181A5",
  //                         display: "block",
  //                       }}
  //                       onKeyPress={(e) => {
  //                         this.saveNotes(e);
  //                       }}
  //                     />
  //                     <Button
  //                       onClick={() => this.saveNotes("save")}
  //                       style={{
  //                         color: "#8181A5",
  //                         padding: "0.5%",
  //                         float: "right",
  //                         position: "absolute",
  //                         bottom: "30%",
  //                         right: "5%",
  //                       }}
  //                       variant="outline-dark"
  //                     >
  //                       save +
  //                     </Button>
  //                     <hr />
  //                   </Col>
  //                 </Row>
  //                 <Row>
  //                   <Col></Col>
  //                 </Row>
  //               </Col>
  //             </Row>
  //           </div>
  //         </Container>
  //       );

  //       setFilePreview(fileUrl);
  //     } else {
  //         setFilePreview(<p style={{ margin: "0", color: "#75798E" }}>no Preview Available</p>)
  //     }
  // };

  if (isLoadFiles === true) {
    return (
      <Loader/>
    );
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
        showGrid={showGrid}
      />
      <ListDispaly showGrid={showGrid} findFile={findFile} view={view} />
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
