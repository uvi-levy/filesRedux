import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import ArrFilter from "../../../../assets/sort-solid.svg";
import Loader from "../../../../assets/loader.gif";

const ListDispaly = ({ showGrid, findFile, view }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [allDisplay, setAllDisplay] = useState("none");
  const [TeamDisplay, setTeamDisplay] = useState("none");
  const [noFiles, setNoFiles] = useState(
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

  const headerSortingStyle = { backgroundColor: "#D4D4F5" };

  const tableStyle = { direction: "ltr" };

  const loader = noFiles;

  const name = (
    <span>
      NAME <img style={{ height: "10px" }} src={ArrFilter} />
    </span>
  );
  const date = (
    <span>
      DATE CREATED <img style={{ height: "10px" }} src={ArrFilter} />
    </span>
  );
  const file = (
    <span>
      FILE <img style={{ height: "10px" }} src={ArrFilter} />
    </span>
  );
  const size = (
    <span>
      FILE SIZE <img style={{ height: "10px" }} src={ArrFilter} />
    </span>
  );

  const columns = [
    { dataField: "id", hidden: true, sort: true },
    {
      dataField: "all",
      text: "ALL",
      sort: true,
      align: "center",
      headerClasses: "header-class",
      style: { width: "4%", direction: "ltr" },
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
    },
    {
      dataField: "name",
      text: name,
      sort: true,
      headerAlign: "center",
      align: "center",
      headerStyle: { fontSize: "90%" },
      style: { width: "14%" },
      headerClasses: "header-class",
      headerSortingStyle,
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
      headerSortingStyle,
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
      headerSortingStyle,
    },
    {
      dataField: "file",
      text: file,
      sort: true,
      align: "center",
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
      headerSortingStyle,
    },
    {
      dataField: "file size",
      text: size,
      align: "center",
      sort: true,
      sortFunc: (a, b, order) => {
        if (a && b && a != null && b != null) {
          if (order === "asc") {
            return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
          } else {
            return Number(b.match(/(\d+)/g)[0]) - Number(a.match(/(\d+)/g)[0]);
          }
        }
      },
      headerClasses: "header-class",
      headerStyle: { fontSize: "90%" },
      style: { width: "7%" },
      headerAlign: "center",
      headerSortingStyle,
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: findFile,
    style: { backgroundColor: "#D4D4F5", color: "#9898B6" },

    selectionRenderer: ({ mode, ...rest }) => <input type={mode} {...rest} />,
    selectColumnStyle: {
      width: "2%",
      textAlign: "center",
    },
  };

  const rowEvents = {
    onClick: (e, row, RowIndex) => {
      console.log(row);
      setRowIndex(RowIndex);
    },
  };

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
      activeStyle.color = "#F4B248";
      activeStyle.borderColor = "#F4B248";
    }
    if (typeof page === "string") {
      activeStyle.backgroundColor = "white";
      activeStyle.color = "#F4B248";
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
  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className="btn-group" role="group">
      {options.map((option) => {
        const isSelect = currSizePerPage === `${option.page}`;
        return (
          <button
            key={option.text}
            type="button"
            onClick={() => onSizePerPageChange(option.page)}
            className={`btn ${isSelect ? "btn-secondary" : "btn-warning"}`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );

  const options = {
    pageButtonRenderer,
    // sizePerPageRenderer,
  };

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <div>
      {!showGrid ? (
        <ToolkitProvider
          keyField="id"
          data={view}
          columns={columns}
          selectRow={selectRow}
          rowEvents={rowEvents}
          pagination={paginationFactory(options)}
          striped
          hover
          condensed
          search
          style={tableStyle}
          defaultSorted={defaultSorted}
        >
          {(props) => (
            <BootstrapTable
              selectRow={selectRow}
              rowEvents={rowEvents}
              pagination={paginationFactory(options)}
              noDataIndication={loader}
              bordered={false}
              striped
              hover
              condensed
              search
              defaultSorted={defaultSorted}
              {...props.baseProps}
            />
          )}
        </ToolkitProvider>
      ) : null}
    </div>
  );
};

export default ListDispaly;
