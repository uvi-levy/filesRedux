import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import $ from "jquery";

import { USER_NAME, GET_COUNT } from "../../../utility/constants";

import keys from "../../../config/env/keys";

import "./chart.css";

const Chart = () => {
  const jwtFromCookie = useSelector((state) => state.data.jwtFromCookie);

  const [count, setCount] = useState(0);
  const [size, setSize] = useState("M");

  useEffect(() => {
    if (jwtFromCookie) {
      $.ajax({
        type: "GET",
        url: keys.BASE_URL + USER_NAME + GET_COUNT,
        headers: { authorization: jwtFromCookie },
        error: (err) => {
          console.log(err);
        },
        success: (data) => {
          setCount(data.count.count);
        },
      });
    }
  }, [jwtFromCookie]);

  return (
    <div
      className="chart"
      style={{
        height: "35px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "10px" }}>
        {count.toFixed(2)}
        {size}/2G
      </p>
      <ProgressBar style={{ height: "6px" }} striped now={count} />
    </div>
  );
};

export default Chart;
