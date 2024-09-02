import React, { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from './Error'
import Loader from './Loader'
import StartScreen from "./StartScreen";
import Question from "./Question";
// import {data} from '../data/questions.json'

const initialState = {
   questions:[],
   //loading error ready active finish
   status:'loading',
   index:0
}

function reducer(state,action){
   switch(action.type){
   case 'dataResived': return {...state, questions: action.payload, status:'ready'}
   case 'dataFailed': return {...state, status: 'error'}
   case 'start': return {...state, status: 'active'}
   default : throw new Error('Unknown action')
   }
}

export default function App(){

   const [{status,questions,index},dispatch] = useReducer(reducer,initialState)
   
   const numQuestions = questions.length
   console.log(numQuestions);
   
   console.log(questions);

   
   useEffect(function(){

fetch('http://localhost:8000/questions').then(res=>res.json())
.then(data=>dispatch({type : 'dataResived', payload:data})).catch(err=>dispatch({type : 'dataFailed'}))

// async function search(){
//    try{
//  const res = await fetch('http://localhost:8000/questions/')
//  const data = await res.json()
//  console.log('Data : ');
//  console.log(data);
// }catch(err){
//    console.log(err);
//    console.log('err');
   
// }

// }
// search()

   },[])

return(
    <div className="app">
   <Header/>
 
 {/* <Main> */}
   { status === 'loading' && <Loader/> }
   {status === 'error' && <Error/>}
   {status === 'ready' && <StartScreen numQuestions = {numQuestions} dispatch={dispatch}/>}
   {status === 'active' && <Question question = {questions[index]}/>}
 {/* </Main> */}
   
    </div>
)

}