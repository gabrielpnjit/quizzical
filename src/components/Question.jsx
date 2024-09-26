import React from "react"
import "./Question.css"

export default function Question(props) {
    const choices = []
    for (let choiceIndex = 0; choiceIndex < props.choices.length; choiceIndex++) {
        let classes = "choice"
        if (props.isSubmitted) {
            if (choiceIndex === props.selectedChoice && !props.isCorrect) {
                classes += " inactive wrong";
            }
            else if (choiceIndex === props.answer) {
                classes += " inactive correct";
            }
            else {
                classes += " inactive"
            }
        }
        else if (choiceIndex == props.selectedChoice) {
            classes += " selected"
        }

        choices.push(
            <button 
                className={classes}
                key={choiceIndex}
                onClick={() => props.selectChoice(props.id, choiceIndex)}
            >
                {props.choices[choiceIndex]}
            </button>
        )
    }
    return (
        <div className="question-container">
            <h2 className="question">{props.question}</h2>
            <ul className="choices-list">
                {choices}
            </ul>
        </div>
    )
}