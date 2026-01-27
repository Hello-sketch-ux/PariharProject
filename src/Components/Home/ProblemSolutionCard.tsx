import React from 'react';
import "./ProblemSolutionCard.css";

interface ProblemSolutionCardProps {
    heading: string;
    content: string;
    imageUrl: string;
    imagePosition: "left" | "right";
}

const ProblemSolutionCard: React.FC<ProblemSolutionCardProps> = ({ heading, content, imageUrl, imagePosition }) => {
    return (
        <div>
            {imagePosition === "left" ? (
                <div className='problem-solution-card'>
                    <div className='image-design'>
                        <img src={imageUrl} className="card-image" alt="Image not visible due to technical error" />
                    </div>
                    <div className='content-design'>
                        <h4 className='ProblemSolutionHeading'>{heading}</h4>
                        <p className='ProblemSolutionContent'>{content}</p>
                    </div>
                </div>
            ) : (
                <div className='problem-solution-card-right problem-solution-card'>
                    <div className='content-design'>
                        <h4 className='ProblemSolutionHeading'>{heading}</h4>
                        <p className='ProblemSolutionContent'>{content}</p>
                    </div>
                    <div className='image-design'>
                        <img src={imageUrl} className="card-image" alt="Image not visible due to technical error" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProblemSolutionCard;