import React from "react";

import Grid from "../../../../utility/Grid/Grid";

const GridDispaly = ({ grid, currentPage, setCurrentPage, cardsPerPage }) => {
  console.log("grid", grid);

  let renderCards;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCard = grid.slice(indexOfFirstCard, indexOfLastCard);

  renderCards = currentCard.map((card, index) => {
    return (
      <div
        md={3}
        sm={8}
        style={{
          borderRadius: "12px",
          height: "100%",
          width: "20%",
          minWidth: "180px",
          maxWidth: "250px",
          margin: "10px 20px 10px 0px",
        }}
        key={index}
      >
        {card}
      </div>
    );
  });

  return (
    <>
      <Grid
        renderCards={renderCards}
        grid={grid}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default GridDispaly;
