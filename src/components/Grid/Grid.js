import React from "react";
import { CardDeck } from "react-bootstrap";

import PageNumbers from "../PageNumbers/PageNumbers";

const Grid = ({ showGrid, renderCards, grid, currentPage, setCurrentPage }) => {
  return (
    <>
      <div
        style={{
          padding: "0",
          display: showGrid ? "block" : "none",
          paddingBottom: "20px",
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
          showGrid={showGrid}
        />
      </div>
    </>
  );
};

export default Grid;
