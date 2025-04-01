import React from "react";
import "./Card.css";

interface CardsProps {
    image: string;
    heading: string;
    paragraph: string;
}

const Cards: React.FC<CardsProps> = ({ image, heading, paragraph }) => {
    return (
        <div className="card">
            <div className="cardImage">
                <img className="Logo" src={image} alt="Card" />
            </div>    
            <h3 className="cardHeading">{heading}</h3>  
            <p className="cardParagraph">{paragraph}</p>  
        </div>
    );
};

export default Cards;
