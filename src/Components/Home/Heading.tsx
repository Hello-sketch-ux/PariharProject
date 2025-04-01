import React from 'react';
import "./Heading.css";

interface HeadingProps {
    content: string;
    underline?: boolean;
    color?: "green" | "black";
}

const Heading: React.FC<HeadingProps> = ({ content, underline = false, color = "black" }) => {
    return (
        <div className='heading-wrapper'>
            <div className={`${color === "green" ? "green" : "black"} heading`}>
                {content}
                {underline && <div className='underline-design'></div>}
            </div>
        </div>
    );
};

export default Heading;