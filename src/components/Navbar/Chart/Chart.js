import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import $ from "jquery";

import "./chart.css"

const Chart = ({ jwtFromCookie }) => {

    let url = window.location;
    let userName = url.pathname.split("/")[1];

    const [count, setCount] = useState(0);
    const [size, setSize] = useState("M");

    useEffect(() => {
      if(jwtFromCookie){
      $.ajax({
        type: "GET",
        url: "https://files.codes/api/" + userName + "/getCount",
        headers: { authorization: jwtFromCookie },
        error: (err) => {
          console.log(err);
        },
        success: (data) => {
          setCount(data.count.count);
        },
      });
    }
    }, [jwtFromCookie])

    return (
        <div
            className="chart"
            style={{
            height: "35px",
            textAlign: "center"
            }}
        >
            <p style={{ fontSize:'10px'}}>{count.toFixed(2)}{size}/2G</p>
            <ProgressBar style={{ height: "6px",}} striped now={count} />
      </div>
    );
}

export default Chart
