import "./footer.css";
import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="container">
            <div className="tagCont">
                <a href="#" className="tags">PRIVACY POLICY</a>
                <a href="#" className="tags">TERMS AND CONDITIONS</a>
            </div>
            <h3 className="heading">PARIHAR INDIA</h3>
            <p className="copyright">Copyright &copy; 2024 Parihar India - All Rights Reserved.</p>
        </div>
    );
};

export default Footer;