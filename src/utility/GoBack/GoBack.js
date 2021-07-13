import React from "react";
import { useHistory, Link } from "react-router-dom";

import { USER_NAME } from "../../utility/constants";

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
            fontSize: "18px",
            margin: "1%",
          }}
          onClick={goBack}
        >
          {" "}
          👈back
        </p>
      </Link>
    </>
  );
};

export default GoBack;
