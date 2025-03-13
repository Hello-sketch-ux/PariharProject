import React from "react";
import "./Card.css";

interface CardsProps {
    image: string;
    heading: string;
    paragraph: string;
}

const Cards: React.FC<CardsProps> = ({ image, heading, paragraph }) => {
    return (
        <div className="mainbox"> 
            <div className="cardImage">
                <img className="Logo" src={image} alt="Card" />
            </div>    
            <div className="heading">{heading}</div>  
            <div className="para"> <p>{paragraph}</p> </div>  
        </div>
    );
};

export default Cards;