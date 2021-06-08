import React from 'react'
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import FileG from "../../../assets/files-new.png";
import ImgG from "../../../assets/image-new.png";
import AdiuoG from "../../../assets/audio-new.png";
import VideoG from "../../../assets/video-new.png";
import FolderG from "../../../assets/folders-new.png";
import Trash from "../../../assets/trash.png";

import "./filterButtons.css";

const FilterButtons = ({ filteredFilesByType, folders, filteredFiles }) => {

  let { foldersLength, all, doc, img, video, audio } = 0;
  if (filteredFilesByType.length) {
    doc = filteredFilesByType[3].others.length;
    img = filteredFilesByType[0].img.length;
    video = filteredFilesByType[2].video.length;
    audio = filteredFilesByType[1].audio.length;
    all = doc + img + video + audio;
  }


  // useEffect(() => {
  //   if (folders) foldersLength = folders.length;
  // }, [folders])


  if (folders) foldersLength = folders.length;

  const buttonsViews = [];
  const buttons = [
    { text: "All", value: "all", num: all },
    {
      text: "Folder",
      value: "folder",
      icon: FolderG,
      num: foldersLength,
    },
    {
      text: "Files",
      value: "file",
      icon: FileG,
      num: doc, 
    },
    {
      text: "Image",
      value: "img",
      icon: ImgG,
      num: img,
    },
    {
      text: "Adiuo",
      value: "audio",
      icon: AdiuoG,
      num: audio,
    },
    {
      text: "Video",
      value: "video",
      icon: VideoG,
      num: video,
    },
    {
      text: "Trash",
      value: "trash",
      icon: Trash,
    },
  ];
  buttons.forEach((Button) => {
    console.log(Button);
    if(Button.num) Button.num=Button.num.toString()
    const button = (
        <button
          className="btn btn-outline-secondary filter-btn"
          id={Button.value}
          style={{
           
          }}
          onClick={() => {
            filteredFiles(Button.value);
          }}
        >
          <img style={{ marginRight: "5%", marginBottom: "4%" }} src={Button.icon} />
          {Button.text} {Button.num}
        </button>
    );
    buttonsViews.push(button);
  });

    return (
        <div>
            <Col>
              <Row className="justify-content-md-flex-end">
                {buttonsViews}
              </Row>
            </Col>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    filteredFilesByType: state.data.filteredFilesByType,
    folders: state.data.folders
  }
}

export default connect(mapStateToProps)(FilterButtons)
