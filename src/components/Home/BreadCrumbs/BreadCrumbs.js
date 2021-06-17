import React from 'react'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./breadCrumbs.css"

const BreadCrumbs = ({ icon, header, crumbs, showBreadcrumb, location }) => {
    const history = useHistory();

    const url = window.location;
    const userName = url.pathname.split('/')[1];

    return (
        <div className="bread-crumbs">
            <img className="icon" src={icon}></img>
            {
                location == "trash" ? 
                <h5 style={{ marginRight: "5px" }}>{ header }</h5> : 
                <h5 style={{ marginRight: "5px", cursor: "pointer" }} onClick={ () => history.push("/" + userName)}>{ header }</h5>
            }
            
            {
                showBreadcrumb &&
                <p style={{margin: "0px"}}>{ crumbs }</p>
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        location: state.data.location
    }
}

export default connect(mapStateToProps)(BreadCrumbs)
