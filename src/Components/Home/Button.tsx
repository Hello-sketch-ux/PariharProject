import React from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom"


// Define the type for the props
interface ButtonProps {
  content: string;
  path: string;
}

const Button: React.FC<ButtonProps> = ({ content, path }) => {
const navigate = useNavigate();

  return (
    <div className="button-wrapper">
      <div className="button-design" onClick={() => navigate(`/${path}`)}>
        {content}
      </div>
    </div>
  );
}

export default Button;
