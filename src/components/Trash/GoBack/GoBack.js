import React from 'react'
import { useHistory, Link } from "react-router-dom";

const GoBack = () => {

    let url = window.location;
    let userName = url.pathname.split("/")[1];
    const history = useHistory();

    const goBack = () => {
        console.log("in goBack");
        console.log(userName);
        history.push("/" + userName);
    }

    return (
        <>
            <Link to={`/${userName}`} style={{textDecoration: "none"}}>
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
    )
}

export default GoBack
