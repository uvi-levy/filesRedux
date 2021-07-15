import React from "react";
import { useHistory, Link } from "react-router-dom";

import { USER_NAME } from "../../utility/constants";

import "./goBack.css"

const GoBack = () => {
  const history = useHistory();

  const goBack = () => {
    console.log("in goBack");
    console.log(USER_NAME);
    history.push("/" + USER_NAME);
  };

  return (
    <>
      <Link to={`/${USER_NAME}`} style={{ textDecoration: "none" }}>
        <p
          style={{
            color: "#3A405E",
            cursor: "pointer",
            textTransform: "capitalize",
            fontWeight: "bold",
            margin: "1%",
          }}
          onClick={goBack}
          className="go-back"
        >
          {" "}
          👈back
        </p>
      </Link>
    </>
  );
};

export default GoBack;
