import { useEffect, useState } from "react"


export default function Timer({ dispatch, secondRemaining }) {
  // const[time,setTime] = useState(500)

  // const min = time/60
  // const sec = time % 60

  //   useEffect(function(){
  //    const timer = setTimeout(function(){
  //           setTime(time=>time-1)
  //       },1000)
  //       if(time===0) clearTimeout(timer)

  //   },[time])

  const min = parseInt(secondRemaining / 60)
  const sec = secondRemaining % 60

  useEffect(function () {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000);

    //after unmount or before rerender
    return () => clearInterval(id)
  }, [])

  return <div className="timer" >{min < 10 && '0'}{min} : {sec < 10 && '0'}{sec}</div >


}
