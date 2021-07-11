import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./pageNumbers.css";

const PageNumbers = ({ grid, cardsPerPage, currentPage, setCurrentPage }) => {
  const [upperPageBound, setUpperPageBound] = useState(3);
  const [lowerPageBound, setLowerPageBound] = useState(0);
  const [pageBound, setPageBound] = useState(3);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
  const [isNextBtnActive, setIsNextBtnActive] = useState("");

  const showGrid = useSelector((state) => state.data.showGrid);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const setPrevAndNextBtnClass = (listid) => {
    // if(currentPage == 1){
    //     setIsPrevBtnActive("d")
    // }
    let totalPage = Math.ceil(grid.length / cardsPerPage);
    setIsNextBtnActive("disabled");
    setIsPrevBtnActive("disabled");
    if (totalPage === listid && totalPage > 1) {
      setIsPrevBtnActive("");
    } else if (listid === 1 && totalPage > 1) {
      setIsNextBtnActive("");
    } else if (totalPage > 1) {
      setIsNextBtnActive("");
      setIsPrevBtnActive("");
    }
    //my addition
    // else if(currentPage === 1){
    //     setIsPrevBtnActive("disable")
    // }
  };

  const btnIncrementClick = () => {
    setUpperPageBound(upperPageBound + pageBound);
    setLowerPageBound(lowerPageBound + pageBound);

    let listid = upperPageBound + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnDecrementClick = () => {
    setUpperPageBound(upperPageBound - pageBound);
    setLowerPageBound(lowerPageBound - pageBound);

    let listid = upperPageBound - pageBound;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnPrevClick = () => {
    if ((currentPage - 1) % pageBound === 0) {
      setUpperPageBound(upperPageBound - pageBound);
      setLowerPageBound(lowerPageBound - pageBound);
    }
    let listid = currentPage - 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnNextClick = () => {
    if (currentPage + 1 > upperPageBound) {
      setUpperPageBound(upperPageBound + pageBound);
      setLowerPageBound(lowerPageBound + pageBound);
    }
    let listid = currentPage + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid + 1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(grid.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number === 1 && currentPage === 1) {
      return (
        <button
          className="btn btn-outline-secondary btn-active"
          onClick={handleClick}
          style={{ margin: "8px 16px 8px 0" }}
          key={number}
          id={number}
        >
          {number}
        </button>
      );
    } else if (number < upperPageBound + 1 && number > lowerPageBound) {
      return (
        <button
          className={
            number == currentPage
              ? "btn btn-outline-secondary btn-active"
              : "btn btn-outline-secondary"
          }
          style={{ margin: "8px 16px 8px 0" }}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </button>
      );
    }
  });

  let pageIncrementBtn = null;
  if (pageNumbers.length > upperPageBound) {
    pageIncrementBtn = (
      <button
        className="btn btn-outline-secondary"
        onClick={btnIncrementClick}
        style={{ margin: "8px 16px 8px 0" }}
      >
        &#8811;
      </button>
    );
  }
  let pageDecrementBtn = null;
  if (lowerPageBound >= 1) {
    pageDecrementBtn = (
      <button
        className="btn btn-outline-secondary"
        onClick={btnDecrementClick}
        style={{ margin: "8px 16px 8px 0" }}
      >
        &#8810;{" "}
      </button>
    );
  }
  let renderPrevBtn = null;
  if (isPrevBtnActive === "disabled") {
    renderPrevBtn = (
      <button
        disabled
        className={"btn btn-outline-secondary " + isPrevBtnActive}
        style={{ margin: "8px 16px 8px 0", color: "#F4B248" }}
      >
        {" "}
        &#60;{" "}
      </button>
    );
  } else {
    renderPrevBtn = (
      <button
        className={"btn btn-outline-secondary " + isPrevBtnActive}
        onClick={btnPrevClick}
        style={{ margin: "8px 16px 8px 0" }}
      >
        &#60;
      </button>
    );
  }
  let renderNextBtn = null;
  if (isNextBtnActive === "disabled") {
    renderNextBtn = (
      <button
        disabled
        className={"btn btn-outline-secondary " + isNextBtnActive}
        style={{ margin: "8px 16px 8px 0" }}
      >
        <span id="btnNext">&#62; </span>
      </button>
    );
  } else {
    renderNextBtn = (
      <button
        className={"btn btn-outline-secondary  " + isNextBtnActive}
        onClick={btnNextClick}
        style={{ margin: "8px 16px 8px 0" }}
      >
        {" "}
        &#62;
      </button>
    );
  }

  return (
    <>
      {showGrid ? (
        <div style={{ marginTop: "20px" }} className="page-numbers">
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </div>
      ) : null}
    </>
  );
};

export default PageNumbers;
