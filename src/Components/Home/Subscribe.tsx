import React from "react";
import "./subscribe.css";

const Subscribe: React.FC = () => {
    return (
        <div className="image">
            <div className="subscribeHeading"> Subscribe</div>
            <div className="p"> 
                <p>Get 10% off your first purchase when you sign up for our newsletter!</p>
            </div>
            <div className="input">
                <div className="email-container">
                    <input type="email" placeholder="Email" className="email" />
                </div>
                <div>
                    <button className="button">SIGN UP</button>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;