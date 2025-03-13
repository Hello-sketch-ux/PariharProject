import React from 'react';
import "./Heading.css"

const Heading = ({content , underline , color}) => {
  return (
    <div className='heading-wrapper'>
        <div className={`${color==="green" ? "green" : "black"} heading`}>
            {content}
            {
                underline ?
                (
                    <div className='underline-design'></div>
                )
                :
                (
                    <div></div>
                )
            } 
        </div>
    </div>
  )
}

export default Heading