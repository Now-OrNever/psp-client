import {useState} from 'react';


export const LinearProgressBar = ({solvedQuestion, totalQuestion}) => {

    const [value, setValue] = useState(((solvedQuestion/totalQuestion)*100));
  
    return (
      <div className="bg-blue-200 rounded-full dark:bg-gray-700" style={{width:"400px", height:"20px"}}>
      <div className="bg-blue-900 text-xs text-blue-100 text-center p-0.5 rounded-full" style={{
  width: `${value}%`,}}>{solvedQuestion}/{totalQuestion}</div>
    </div>
    );
  };

  