import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import $ from "jquery";

import "./chart.css"

const Chart = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        var jwtFromCookie;
        if (window.location == "http://localhost:3000/uvi") {
        jwtFromCookie =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ1TEtTN0RQa1dzZHl3bW4xTGFSdjFnSTNSWUwyIiwiZW1haWwiOiJ1dmlAbGVhZGVyLmNvZGVzIiwiaXAiOiI4MC4xNzkuNTcuMjAxIiwiaWF0IjoxNjAzOTYyNjk3fQ.uZ4aMsxJOFlqOCoIHF3JGZZUAca-li9AahlilBbx_9o";
        } else {
        jwtFromCookie = document.cookie
            ? document.cookie
                .split(";")
                .filter((s) => s.includes("jwt"))[0]
                .split("=")
                .pop()
            : null;
        }
        var userName;
        let url = window.location;
        if (window.location == "http://localhost:3000/uvi") {
        userName = "uvi";
        } else {
        userName = url.pathname.split("/")[1];
        }
        $.ajax({
            type: "GET",
            url: "https://files.codes/api/" + userName + "/getCount",
            headers: { authorization: jwtFromCookie },
            error: (err) => {
                console.log(err);
            },
            success: (data) => {
                setCount(data.count);
            },
        });
    }, [])

    useEffect(() => {
        console.log("count = ", count.count);
    }, [count])

    return (
        <div
            className="chart"
            style={{
            height: "35px",
            textAlign: "center"
            }}
        >
            <p style={{ fontSize:'10px'}}>5/1000</p>
            <ProgressBar style={{ height: "6px",}} striped now={20} />
      </div>
    );
}

export default Chart
