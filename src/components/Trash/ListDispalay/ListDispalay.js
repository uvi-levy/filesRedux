import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  OverlayTrigger,
} from "react-bootstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";

import Copy from "../../../assets/copy.png";
import Delete from "../../../assets/delete.png";
import ArrFilter from "../../../assets/sort-solid.svg";
import ArrDown from "../../../assets/angle-down-solid.svg";
import Loader from "../../../assets/loader.gif";
import FileIcon from "../../../assets/file-solid.png";
import Img from "../../../assets/image-regular.png";
import Adiuo from "../../../assets/headphones-solid.png";
import Video from "../../../assets/video-solid.png";
import Users from "../../../assets/user-friends-solid.png";
import User from "../../../assets/user-solid.png";

const ListDispalay = ({
  view,
  allDisplay,
  setAllDisplay,
  setTeamDisplay,
  TeamDisplay,
  showGrid,
}) => {
  const [row, setRow] = useState({});

  const hoverCard = () => {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <span>
          ALL <img style={{ width: "8%" }} src={ArrDown} />
        </span>
      </OverlayTrigger>
    );
  };

  const hoverCardTeam = () => {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popoverTeam}>
        <span>
          TEAM <img style={{ width: "8%" }} src={ArrDown} />
        </span>
      </OverlayTrigger>
    );
  };

  const Name = (
    <span>
      NAME <img style={{ width: "3%" }} src={ArrFilter} />
    </span>
  );
  const date = (
    <span>
      DATE CREATED <img style={{ width: "3%" }} src={ArrFilter} />
    </span>
  );
  const File = (
    <span>
      FILE <img style={{ width: "6%" }} src={ArrFilter} />
    </span>
  );
  const size = (
    <span>
      FILE SIZE <img style={{ width: "6%" }} src={ArrFilter} />
    </span>
  );

  const columns = [
    {
      dataField: "all",
      text: "ALL",
      sort: true,
      align: "center",
      headerClasses: "header-class",
      style: { width: "7%", direction: "ltr" },
      headerStyle: { fontSize: "90%" },
      headerEvents: {
        onMouseEnter: (e, column, columnIndex) => {
          setAllDisplay("block");
        },
        onMouseLeave: (e, column, columnIndex) => {
          setAllDisplay("none");
        },
      },
      headerAlign: "center",
      headerFormatter: hoverCard,
    },
    {
      dataField: "name",
      text: Name,
      sort: true,
      headerAlign: "center",
      align: "center",
      headerStyle: { fontSize: "90%" },
      style: { width: "14%" },
      headerClasses: "header-class",
    },
    {
      dataField: "date",
      text: date,
      align: "center",
      sort: true,
      style: { width: "14%" },
      headerAlign: "center",
      headerStyle: { fontSize: "90%" },
      headerClasses: "header-class",
    },
    {
      dataField: "team",
      text: "ALL TEAM",
      align: "center",
      sort: true,
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
      headerEvents: {
        onMouseEnter: (e, column, columnIndex) => {
          setTeamDisplay("block");
        },
        onMouseLeave: (e, column, columnIndex) => {
          setTeamDisplay("none");
        },
      },
      headerAlign: "center",
      headerFormatter: hoverCardTeam,
    },
    {
      dataField: "file",
      text: File,
      sort: true,
      align: "center",
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
    },
    {
      dataField: "file size",
      text: size,
      align: "center",
      sort: true,
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
    },
    {
      dataField: "recovered",
      text: "",
      align: "center",
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    // onSelect:this.findFile,
    style: { backgroundColor: "#D4D4F5", color: "#9898B6" },

    selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
      <div>
        <div style={{ display: "inline" }}>
          <input
            disabled
            type="checkbox"
            ref={(input) => {
              if (input) input.indeterminate = indeterminate;
            }}
            {...rest}
          />
        </div>
        <OverlayTrigger trigger="click" placement="top" overlay={checkpopover}>
          <button
            style={{
              borderStyle: "none",
              outline: "none",
              width: "25%",
              background: "none",
            }}
          >
            <img style={{ borderStyle: "none" }} src={ArrDown} />
          </button>
        </OverlayTrigger>
      </div>
    ),
    selectionRenderer: ({ mode, ...rest }) => <input type={mode} {...rest} />,
    selectColumnStyle: {
      width: "5%",
    },
  };

  const rowStyle = { zIndex: "90" };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log("row" + row + "ind" + rowIndex);
      console.log(row.id);
      setRow(row);
    },
  };

  const tableStyle = { direction: "ltr" };

  const checkpopover = (
    <ButtonGroup
      style={{ display: "block", opacity: "0.7", width: "10%" }}
      vertical
    >
      <div>
        <img
          style={{ margin: "5%" }}
          src={Delete}
          // onClick={deleteFile}
        />
        <img style={{ margin: "5%" }} src={Copy} />
        {/* <img style={{ margin: "5%" }} src={Copy} onClick={copyFile} />  this is the original*/}
      </div>
    </ButtonGroup>
  );

  const hoverButtons = [
    {
      text: " File ",
      value: "file",
      icon: FileIcon,
      color: "#FFF4AD",
      txtColor: "DarkRed",
    },
    {
      text: "Image",
      value: "img",
      icon: Img,
      color: "blue",
      txtColor: "DeepSkyBlue",
    },
    {
      text: "Adiuo",
      value: "adiuo",
      icon: Adiuo,
      color: "#DFD2FB",
      txtColor: "#6226EF",
    },
    {
      text: "Video",
      value: "video",
      icon: Video,
      color: "#FEB8EB",
      txtColor: "#E411AC",
    },
  ];

  const hoverButtonsViews = hoverButtons.map((button) => {
    return (
      <Button
        className="rounded-0 font-weight-bold"
        style={{
          backgroundColor: button.color,
          color: button.txtColor,
          borderStyle: "none",
          textAlign: "left",
        }}
        onClick={() => {
          // filterFiles(button.value);
        }}
      >
        <img style={{ marginRight: "6%" }} src={button.icon} />
        {button.text}
      </Button>
    );
  });

  const pageButtonRenderer = ({ page, active, onPageChange }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange(page);
    };
    const activeStyle = {};
    if (active) {
      activeStyle.backgroundColor = "#F4B248";
      activeStyle.borderColor = "#F4B248";
      activeStyle.color = "white";
    } else {
      activeStyle.backgroundColor = "white";
      activeStyle.color = "black";
    }
    if (typeof page === "string") {
      activeStyle.backgroundColor = "white";
      activeStyle.color = "black";
    }
    return (
      <li className="page-item" style={{ padding: "1%" }}>
        <button
          className="btn btn-outline-secondary"
          onClick={handleClick}
          style={activeStyle}
        >
          {page}
        </button>
      </li>
    );
  };

  const options = {
    pageButtonRenderer,
  };

  const loader = (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <img src={Loader} />
    </div>
  );

  const hoverButtonsTeam = [
    {
      text: " Team ",
      value: "team",
      icon: Users,
      color: "CornflowerBlue",
      txtColor: "DarkCyan",
    },
    {
      text: "Manager",
      value: "manager",
      icon: User,
      color: "gray",
      txtColor: "DeepSkyBlue",
    },
  ];

  const popover = (
    <ButtonGroup
      style={{ display: allDisplay, opacity: "0.7", width: "10%" }}
      vertical
    >
      <div>{hoverButtonsViews}</div>
    </ButtonGroup>
  );

  const hoverButtonsTeamsViews = hoverButtonsTeam.map((button) => {
    return (
      <Button
        className="rounded-0 font-weight-bold"
        style={{
          backgroundColor: button.color,
          color: button.txtColor,
          borderStyle: "none",
        }}
        onClick={() => {
          // filterFilesByUser(button.value);
        }}
      >
        <img style={{}} src={button.icon} />
        {button.text}
      </Button>
    );
  });

  const popoverTeam = (
    <ButtonGroup
      style={{
        display: TeamDisplay,
        opacity: "0.7",
        width: "10%",
      }}
      vertical
    >
      <div>{hoverButtonsTeamsViews}</div>
    </ButtonGroup>
  );

  return (
    <>
      <ToolkitProvider
        keyField="id"
        data={view}
        columns={columns}
        selectRow={selectRow}
        rowStyle={rowStyle}
        rowEvents={rowEvents}
        pagination={paginationFactory(options)}
        striped
        hover
        condensed
        search
        style={tableStyle}
      >
        {(props) => (
          <div>
            <Container fluid>
              <Row>
                <Col
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    margin: "15px 0",
                  }}
                >
                  <Col
                    style={{
                      display: !showGrid ? "block" : "none",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Col
                      style={{
                        width: "80%",
                        margin: "10%",
                        marginTop: "3%",
                      }}
                    >
                      <BootstrapTable
                        selectRow={selectRow}
                        rowStyle={rowStyle}
                        rowEvents={rowEvents}
                        pagination={paginationFactory(options)}
                        noDataIndication={loader}
                        bordered={false}
                        striped
                        hover
                        condensed
                        search
                        {...props.baseProps}
                      />
                    </Col>
                  </Col>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </ToolkitProvider>
    </>
  );
};

export default ListDispalay;
