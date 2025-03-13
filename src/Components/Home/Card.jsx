import React from "react";
import "./card.css";

function Cards({image , heading , paragraph}){
    return(
        <div className="mainbox"> 
        
            <div className="image">
                 <img className="Logo" src={image} />
            </div>    

            <div className="heading">{heading}</div>  

            <div className="para"> <p>{paragraph}</p> </div>  
        
        
        
        
        </div>
        
    );
}

export default Cards;