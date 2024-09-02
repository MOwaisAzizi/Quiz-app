function StartScreen({numQuestions,dispatch}){
    
    return (<div className="start">
   <h2>Wellcome to react quize!</h2>        
   <h2>{numQuestions} questions to test your React mastery</h2>  
   <button className="btn btn-ui" onClick={()=>dispatch({type:'start'})}>Let's Start</button>      
    </div>
    )
}

export default StartScreen