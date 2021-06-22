import React, { useState } from "react";

import PageNumbers from "../../Home/Files/PageNumbers/PageNumbers";

const GridDisplay = ({ showGrid, grid }) => {
  const [todosPerPage, setTodosPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = grid.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((todo, index) => {
    return (
      <div style={{ borderRadius: "12px" }} key={index}>
        {todo}
      </div>
    );
  });

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
          {renderTodos}
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

export default GridDisplay;
