import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, json, useParams} from 'react-router-dom';
import { LinearProgressBar } from './LinearProgressBar';
import {LockOpenIcon, LockClosedIcon} from '@heroicons/react/24/outline';
import { Lock } from '../../assets/svg';

export default function Questions() {
    const [days, setDays] = useState([
    ]);

    const {id}=useParams();

    //useEffect for tell what will done when the page is load.
    useEffect(()=>{
        loadDays();
    },[]);

    const loadDays=async()=>{
        const result=await axios.get("http://localhost:8080/non/day");
        setDays(result.data);
    };


  return (
    <div className="dayContainer">
      {days.map((day) => (
        <Day day={day} />
      ))}
    </div>
  )
}


/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
const Day = ({ day }) => {
    
    const [isQuestionsVisible, setIsQuestionsVisible] = useState(false);
    const [arrowSign, setarrowSign] = useState("👇")
    const [isLocked, setIsLocked] = useState(true);
    const [questionStatusResult, setQuestionStatusResult] = useState([]);

    const handleClick = () => {
        setIsQuestionsVisible(!isQuestionsVisible);
        if(isQuestionsVisible) setarrowSign("👇");
        else setarrowSign("👆");
      };


    const userId = "User1";

  // const UserStatus = async({questionId})=>{
  //   const result=await axios.get(`http://localhost:8080/non/questionstatus/${questionId}/${userId}`);
  //   setQuestionStatusResult(result.data);
  //   return(
  //     <>
      
  //     </>
  //   );
  // }

  
  

      const questionDetail = (
        
        <div className="questionDetail mt-5">
          {day.questions.length > 0 ? (

            <table className="table border-black shadow">
                <th className='border-2 pl-3 pr-3'>Q. No.</th>
                <th className='border-2 pl-3 pr-3'>Status</th>
                <th className='border-2 text-center'>Name</th>
                <th className='border-2 pl-3 pr-3'>Link</th>
                <th className='border-2 pl-3 pr-3'>Note</th>
                <th className='border-2 text-center'>Tags</th>

                


            {day.questions.map((question, index) => (
              
                <tr className='border-2'>
                  {/* {
                  <UserStatus questionId={question.questionId}/>
                } */}
                <th className='border-2' key={question.questionId}> {index+1}</th>
                  <td className='border-2' >    </td>
                  <td className='border-2 pl-2 pr-2'>{question.questionName}</td>
                  <td className='border-2 text-center'><Link to={question.questionLink} target="blank"> 🔥 </Link></td>
                  <td className='border-2'></td>
                  <td className='border-2 pl-2 pr-2'>{question.tags.join(", ")}</td>
                </tr>
            ))}

            </table>
          ) : (
            <p>There are no questions for this day</p>
          )}
        </div>
      );
      

    return (
      <div key={day.did} className="mt-5">

        <div className="dayDetail flex bg-blue-100 text-xl text-black pt-2 pb-2 items-center flex-row">   
        
        <div className='flex basis-2/3'>    
        <h1 className='font-black ml-3'>Day {day.did}:</h1>
        <h3 className='ml-3 mr-20'>{day.topic}</h3>
        </div>

        <div className='flex place-content-end basis-1/3 ml-5 items-center '>
        <LinearProgressBar  solvedQuestion={2} totalQuestion={day.questions.length} />
        {(day.isLock && (isLocked)) ? (
          <div className='flex pl-3 pr-3' style={{height:"30px"}}> <LockClosedIcon/></div>
        ) : (
          <div className='flex pl-3 pr-3' style={{height:"30px"}}> <LockOpenIcon/></div>
        )}

        <button className='bg-blue-500 items-end mr-3' onClick={handleClick}>{arrowSign}</button>
        </div>
        
        </div> 
        
        {/* Show the question when click the above button */}
        {isQuestionsVisible && !day.isLock && questionDetail }

      </div>
    );
  };