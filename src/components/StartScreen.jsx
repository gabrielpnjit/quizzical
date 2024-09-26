import React from "react"
import "./StartScreen.css"

export default function StartScreen(props) {
    return (
    <div className="start-screen">
        <h1 className="quizzical-title">Quizzical</h1>
        <h2 className="quizzical-desc">Test your trivia skills!</h2>
        <button className="start-quiz" onClick={props.handleClick}>Start Quiz</button>
    </div>
    )

}