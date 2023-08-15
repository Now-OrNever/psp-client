import NavBar from "../Navbar";
import React, {Suspense, lazy, useState } from 'react';
const Questions = lazy(()=>import('./Questions'));
import {CircularProgressBar} from "./CircularProgressBar";



export default function Home() {

  const[markForRevision, setMarkForRevision] = useState(0);
  const[solvedQuestion, setSolvedQuestion] = useState(10);
  const[totalQuestion, setTotalQuestion] = useState(100);

  return (
    <>
    <NavBar/>
    <div className="font-semibold text-purple-600 h-screen pl-10 flex " >
      

      {/* \\\\\\\\\\\ HERE are all the QUESTIONS \\\\\\\\\\\\\\\ */}

      <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <h1>Loading ...</h1>
          {/* <CircularProgress /> */}
        </div>
      }
    >
      <div className="questionList pr-10" style={{width:"80%"}}>
        <Questions />
      </div>
      </Suspense>


      {/* \\\\\\\\\\\\It is the quick summary of user performance\\\\\\\\\\\\\ */}
      <div className="quickSummary  justify-content-center pt-3 pl-2 pr-2 pb-1 mt-5 shadow-lg">
        <div className="questionSolved" >
          <CircularProgressBar solvedQuestion={solvedQuestion} totalQuestion={totalQuestion}/>
        </div>
        <div className="forRevision font-semibold text-blue-900 text-1xl pl-2 text-center">
          Mark for revision: {markForRevision}
          <table className="ml-9 mt-3">
            <tr>
              <th className="text-right">Your Score : </th>
              <td  className="text-left">238</td>
            </tr>
            <tr>
              <th className="text-right">Your Rank : </th>
            <td className="text-left">20</td>
            </tr>
          </table>
        </div>
      </div>


    </div>
    </>
  );
}
