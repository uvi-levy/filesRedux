import React from 'react'

import "./breadCrumbs.css"

const BreadCrumbs = ({ icon, header, crumbs }) => {
    return (
        <div className="bread-crumbs">
            <img className="icon" src={icon}></img>
            <h5>{ header }</h5>
            {
                crumbs &&
                <p>{ crumbs }</p>
            }
        </div>
    )
}

export default BreadCrumbs
