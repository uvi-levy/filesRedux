import React from 'react'
import { CardDeck } from 'react-bootstrap';

const GridDispaly = ({ grid, showGrid, currentPage, cardsPerPage }) => {
    console.log("grid", grid);

    let renderCards;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCard = grid.slice(indexOfFirstCard, indexOfLastCard);

 
    renderCards = currentCard.map((card, index) => {
    return (
        <div md={3} sm={8} style={{ borderRadius: "12px" }} key={index}>
            {card}
        </div>
        );
    });

    return (
        <>
             <div
                id="gridView"
                style={{
                paddingRight: "6%",
                paddingLeft: "0",
                display: showGrid ? "block" : "none",
                width: "100%",
                }}>
                
                <CardDeck
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                }}
                >
                {renderCards}
                </CardDeck>
            </div>
        </>
    )
}

export default GridDispaly
