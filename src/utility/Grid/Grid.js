import React from "react";
import { useSelector } from "react-redux";

import PageNumbers from "../PageNumbers/PageNumbers";

const Grid = ({ renderCards, grid, currentPage, setCurrentPage }) => {
  const showGrid = useSelector((state) => state.data.showGrid);

  return (
    <>
      <div
        style={{
          padding: "0",
          display: showGrid ? "block" : "none",
          paddingBottom: "20px",
          height: "inherit",
        }}
      >
        <div
          style={{
            marginTop: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "right",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {renderCards}
        </div>
        <PageNumbers
          grid={grid}
          cardsPerPage={12}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Grid;
