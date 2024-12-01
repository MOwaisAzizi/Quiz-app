import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from './Error'
import Loader from './Loader'
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from './Progress'
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUETION = 20

const initialState = {
   questions: [],
   status: 'loading',
   index: 0,
   answer: null,
   points: 0,
   highscore: 0,
   secondRemaining: null,
}


function reducer(state, action) {

   const question = state.questions.at(state.index)

   switch (action.type) {
      case 'dataResived': return { ...state, questions: action.payload, status: 'ready' }
      case 'dataFailed': return { ...state, status: 'error' }
      case 'start': return { ...state, status: 'active', secondRemaining: state.questions.length * SECS_PER_QUETION }
      case 'newAnswer': return { ...state, answer: action.payload, points: action.payload === question.correctOption ? question.points + state.points : state.points }
      case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
      case 'finished': return { ...state, status: 'finish', highscore: state.highscore > state.points ? state.highscore : state.points }
      case 'restart': return { ...initialState, highscore: state.highscore, status: 'ready', questions: state.questions }
      case 'tick': return { ...state, secondRemaining: state.secondRemaining - 1, status: state.secondRemaining === 0 ? 'finish' : state.status }
      default: throw new Error('Unknown action')
   }
}

export default function App() {
   const [{ status, questions, index, answer, points, highscore, secondRemaining }, dispatch] = useReducer(reducer, initialState)

   const numQuestions = questions.length
   const maxPosiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0)

   useEffect(function () {
      fetch('http://localhost:8000/questions').then(res => res.json())
         .then(data => dispatch({ type: 'dataResived', payload: data })).catch(err => dispatch({ type: 'dataFailed' }))
   }, [])

   return (
      <div className="app">
         <Header />

         <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
            {status === 'active' &&
               <>
                  <Progress answer={answer} numQuestions={numQuestions} index={index} maxPosiblePoints={maxPosiblePoints} points={points} />
                  <Question question={questions[index]} dispatch={dispatch} answer={answer} />

                  <Footer>
                     <NextQuestion dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
                     <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
                  </Footer>
               </>
            }

            {status === 'finish' && <FinishScreen dispatch={dispatch} highscore={highscore} numQuestions={numQuestions} points={points} maxPosiblePoints={maxPosiblePoints} />}
         </Main>
      </div>
   )

}

