import React from 'react'

import "./search.css";

const Search = ({ filteredFiles }) => {
    
    return (
        <input
            type="text"
            className="searchBar"
            placeholder="search"
            style={{
                border: "0.5px solid #BDBDC9",
                borderRadius: "4px",
                width: "100%",
                height: "40px",
                margin: "0",
            }}
            onChange={(e) => filteredFiles("search", e.target.value)}
        />
    )
}

export default Search
