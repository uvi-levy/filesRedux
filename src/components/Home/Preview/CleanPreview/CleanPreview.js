import React from "react";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";

const CleanPreview = () => {
  const showGrid = useSelector((state) => state.data.showGrid);
  return (
    <>
      <Container
        className={
          showGrid ? "pre-file on-grid-display" : "pre-file on-list-display"
        }
      >
        <p
          style={{
            margin: "0",
            color: "#75798E",
            textAlign: "center",
            margin: "auto",
            marginTop: "100%",
            color: "#75798E",
          }}
        >
          no Preview Available
        </p>
      </Container>
    </>
  );
};

export default CleanPreview;
