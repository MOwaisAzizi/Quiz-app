export function Progress({ numQuestions, index, points, maxPosiblePoints, answer }) {

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>Questions <strong>{index + 1}/{numQuestions}</strong></p>
      <p >{points}/{maxPosiblePoints}</p>
    </header>
  );


}

export default Progress;
