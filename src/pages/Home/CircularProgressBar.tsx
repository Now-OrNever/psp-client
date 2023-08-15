import React, {useState} from 'react';
import './progressBar.css'


export const CircularProgressBar = ({solvedQuestion, totalQuestion}) => {

  const circleWidth = "200"
    const [percentage, setPercentage] = useState((solvedQuestion/totalQuestion)*100);
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffSet = dashArray - (dashArray * percentage) / 100;

    return(
      <div>
        <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
          <circle cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius} className="circle-background"/>
          <circle cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius} className="circle-progress"
          style={{strokeDasharray: dashArray, strokeDashoffset: dashOffSet}}
          transform={`rotate(-90 ${circleWidth/2} ${circleWidth/2})`}/>
          <text x="50%" y="50%" dy="0.3em" textAnchor='middle' className='circleText'>{solvedQuestion}/{totalQuestion}</text>
        </svg>
      </div>
    )   
  
    
};

  