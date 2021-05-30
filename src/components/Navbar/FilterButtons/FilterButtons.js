import React from 'react'
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import FileG from "../../../assets/file.png";
import ImgG from "../../../assets/img.png";
import AdiuoG from "../../../assets/audio.png";
import VideoG from "../../../assets/video.png";
import FolderG from "../../../assets/folder.png";
import Trash from "../../../assets/trash.png";

const FilterButtons = ({ filteredFilesByType, folders, filteredFiles }) => {

  let { foldersLength, all, doc, img, video, audio } = 0;
  if (filteredFilesByType.length) {
    doc = filteredFilesByType[3].others.length;
    img = filteredFilesByType[0].img.length;
    video = filteredFilesByType[2].video.length;
    audio = filteredFilesByType[1].audio.length;
    all = doc + img + video + audio;
  }

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
      text: "Document",
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
    const button = (
      <Col style={{ padding: "0", margin: "0.5%" }}>
        <button
          className="btn btn-outline-secondary"
          id={Button.value}
          style={{
            fontSize: "70%",
            width: "100%",
            margin: "0",
            height: "30px",
          }}
          onClick={() => {
            filteredFiles(Button.value);
          }}
        >
          <img style={{ marginRight: "5%" }} src={Button.icon} />
          {Button.text} {Button.num}
        </button>
      </Col>
    );
    buttonsViews.push(button);
  });

    return (
        <div>
            <Col>
              <Row className="justify-content-md-flex-end">
                {" "}
                {/* <Chart /> */}
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
