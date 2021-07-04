import React from 'react'
import loader from "../../assets/loader.gif";

const Loader = () => {
    return (
        <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <img src={loader} />
      </div>
    )
}

export default Loader
