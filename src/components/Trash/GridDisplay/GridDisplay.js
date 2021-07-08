import React, { useState } from "react";

import Grid from "../../Grid/Grid";

const GridDisplay = ({ grid }) => {
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
      <Grid
        renderCards={renderTodos}
        grid={grid}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default GridDisplay;
