import React from 'react';
import './Button.css';

// Define the type for the props
interface ButtonProps {
  content: string;
}

const Button: React.FC<ButtonProps> = ({ content }) => {
  return (
    <div className="button-wrapper">
      <div className="button-design">
        {content}
      </div>
    </div>
  );
}

export default Button;
