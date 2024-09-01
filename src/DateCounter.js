import { act } from "react";
import { useReducer, useState } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  function reducer(state,action){
   if(action.type === 'inc') return state+1
   if(action.type === 'dec') return state-1
   if(action.type === 'setCount') return action.payload
   if(action.type === 'reset') return action.payload
  }

  const[count,dispatch] = useReducer(reducer,1)

  const date = new Date("june 21 2024");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:'dec'});
};

  const inc = function () {
    dispatch({type:'inc'});
  };

  const defineCount = function (e) {
    dispatch({type:'setCount' , payload :Number(e.target.value)});
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type:'reset', payload:0});
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
