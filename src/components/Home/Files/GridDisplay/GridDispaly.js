import React from "react";

import Grid from "../../../Grid/Grid";

const GridDispaly = ({
  grid,
  showGrid,
  currentPage,
  setCurrentPage,
  cardsPerPage,
}) => {
  console.log("grid", grid);

  let renderCards;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCard = grid.slice(indexOfFirstCard, indexOfLastCard);

  renderCards = currentCard.map((card, index) => {
    return (
      <div md={3} sm={8} style={{ borderRadius: "12px" }} key={index}>
        {card}
      </div>
    );
  });

  return (
    <>
      <Grid
        showGrid={showGrid}
        renderCards={renderCards}
        grid={grid}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default GridDispaly;
