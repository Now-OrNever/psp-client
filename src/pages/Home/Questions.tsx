import axios from 'axios';
import React, { useEffect, useState, Suspense, lazy } from 'react'
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
    const [solvedQuestion, setSolvedQuestion] = useState(0);

    const handleClick = () => {
        setIsQuestionsVisible(!isQuestionsVisible);
        if(isQuestionsVisible) setarrowSign("👇");
        else setarrowSign("👆");
      };

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
                  <UserQuestionDetail question={question} index={index} solvedQuestion = {solvedQuestion} setSolvedQuestion={setSolvedQuestion}/>

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
        <LinearProgressBar  solvedQuestion={solvedQuestion} totalQuestion={day.questions.length} />
        {(day.isLock && (isLocked)) ? (
          <div className='flex pl-3 pr-3' style={{height:"30px"}}> <LockClosedIcon/></div>
        ) : (
          <div className='flex pl-3 pr-3' style={{height:"30px"}}> <LockOpenIcon/></div>
        )}

        <button className='bg-blue-500 items-end mr-3' onClick={handleClick}>{arrowSign}</button>
        </div>
        
        </div> 
        
        <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <h1>Loading ...</h1>
          {/* <CircularProgress /> */}
        </div>
      }
    >
        {/* Show the question when click the above button */}
        {isQuestionsVisible && !day.isLock && questionDetail }

        </Suspense>

      </div>
    );
  };

 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

const UserQuestionDetail = ({question, index, solvedQuestion, setSolvedQuestion}) =>{
  // questionId, setUserStatus, setUserNote
  const [userStatus, setUserStatus] = useState("");
  const [userNote, setUserNote] = useState("");
  const qID=question.questionId;
  // 

  const userId ="User1";
  const {id}=useParams();

  //useEffect for tell what will done when the page is load.
  useEffect(()=>{
      loadDays();
  },[]);



  const loadDays=async()=>{
      const result=await axios.get(`http://localhost:8080/non/questionstatus/${question.questionId}/${userId}`);
      setUserStatus(result.data.status);
      setUserNote(result.data.note);
      if(userStatus==="Done"){
        console.log(solvedQuestion);
          setSolvedQuestion( solvedQuestion => solvedQuestion + 1 );
        }
  };

  const handleChange = async(event) => {
    setUserStatus(event.target.value);

    const newQuestionStatus = {
      status: event.target.value,
      qID,
      userId,
    };

    fetch(`http://localhost:8080/non/questionstatus/statusUpdate/${question.questionId}/${userId}`, {
      method: "PUT",
      body: JSON.stringify(newQuestionStatus),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    };

    const handleNoteChange = async(event) => {
      setUserNote(event.target.value);
  
      const newQuestionStatus = {
        status: event.target.value,
        qID,
        userId,
      };
  
      fetch(`http://localhost:8080/non/questionstatus/noteUpdate/${question.questionId}/${userId}`, {
        method: "PUT",
        body: JSON.stringify(newQuestionStatus),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      };

  return(
    <>
                  <th className='border-2' key={question.questionId}>{index+1}</th>
                  <td className='border-2'>
                      <select name="" value={userStatus} onChange={(e)=> handleChange(e)} >
                        <option value="Revisit">Revisit</option>
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                      </select>
               
                  </td>
                  <td className='border-2 pl-2 pr-2'>{question.questionName}</td>
                  <td className='border-2 text-center'><Link to={question.questionLink} target="blank"> 🔥 </Link></td>
                  <td className='border-2'>
                    <input type='text' value={userNote} onChange={(e)=> handleNoteChange(e)}></input>
                  </td>
                  <td className='border-2 pl-2 pr-2'>{question.tags.join(", ")}</td>

    </>
  )
}