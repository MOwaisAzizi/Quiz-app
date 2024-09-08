
function FinishScreen({ maxPosiblePoints, points, highscore, dispatch }) {
    console.log(maxPosiblePoints);

    const percentage = Math.ceil((points / maxPosiblePoints) * 100)
    let emoji;
    if (percentage === 100) emoji = '🥇'
    if (percentage >= 80 && percentage < 100) emoji = '🥈'
    if (percentage >= 50 && percentage < 80) emoji = '🥉'
    if (percentage <= 50 && percentage >= 0) emoji = '🤣'

    return <div>
        <p className="result">
            {emoji} You scored {points} out of {maxPosiblePoints} ( {percentage}% )
        </p>

        <p className="highscore">
            (Highscore : {highscore} points)
        </p>

        <button className="btn btn-ui finish-btn" onClick={() => dispatch({ type: 'restart' })}>Restart quiz</button>
    </div>

}

export default FinishScreen;
