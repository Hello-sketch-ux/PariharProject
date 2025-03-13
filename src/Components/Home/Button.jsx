import React from 'react';
import "./Button.css";

const Button = ({content}) => {
  return (
    <div className='button-wrapper'>
        <div className='button-design'>
            {content}
        </div>
    </div>
    
  )
}

export default Button