import Options from "./Options"

function Question({question,dispatch,answer}){
    return <div>
        <h2>{question.question}</h2>
        <Options question={question} answer = {answer} dispatch = {dispatch}/>
    </div>
}

export default Question