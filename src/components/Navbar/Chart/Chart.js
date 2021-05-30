import React, { useEffect, useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer";
import $ from "jquery";

import "./chart.css"

const Chart = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        let jwtFromCookie;
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
        let userName;
        if (window.location == "http://localhost:3000/uvi") {
            userName = "uvi";
        } else {
            userName = localStorage.getItem("userName");
        }
        $.ajax({
            type: "GET",
            url: "https://files.codes/api/" + userName + "/getCount",
            headers: { authorization: jwtFromCookie },
            error: (err) => {
                console.log(err);
            },
            success: (data) => {
                setCount(data.count)
                
            // this.setState({ count: data.count }, () => {
            //     console.log(this.state.count.count);
            // });

            },
        });
    }, [])

    useEffect(() => {
        console.log("count = ", count.count);
    }, [count])

    return (
    <div
        style={{
          height: "35px",
        }}
        className="chart"
      >
        <ReactSpeedometer
          value={count.count}
          maxValue={2048}
          width={100}
          height={100}
          fluidWidth={false}
          valueTextFontSize={"0px"}
          segment={10}
          segmentColors={[
            "#2FAAF4",
            "#2FAAF4",
            "#0F93E3",
            "#007FCC",
            "#0064A0",
          ]}
          labelFontSize={"0"}
          ringWidth={16}
          needleHeightRatio={0.34}
          needleColor={"2E2E2E"}
        />
      </div>
    );
}

export default Chart
