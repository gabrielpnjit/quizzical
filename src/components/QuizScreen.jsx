import React from "react"
import { useState, useEffect } from "react"
import "./QuizScreen.css"
import Question from "./Question.jsx"
import { nanoid } from "nanoid"

export default function(props) {
    const [questions, setQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(-1);

    useEffect(() => {
        setQuestions(() => {
            const tempQuestions = []
            for (let i = 0; i < props.data.length; i++) {
                tempQuestions.push(
                    {
                        key: i,
                        id: nanoid(),
                        question: props.data[i].question,
                        choices: props.data[i].choices,
                        answer: props.data[i].correct_answer_index,
                        selectChoice: props.selectChoice,
                        selectedChoice: -1,
                        isSubmitted: false,
                        isCorrect: false
                    }
                )
            }
            return tempQuestions
        })
    }, props.data)



    const questionElements = questions.map((question, index) => (
        <Question 
            key={index}
            id={question.id}
            question={question.question}
            choices={question.choices}
            selectChoice={selectChoice}
            selectedChoice={question.selectedChoice}
            isSubmitted={question.isSubmitted}
            isCorrect={question.isCorrect}
            answer={question.answer}
        />
    ))

    function selectChoice(id, index) {
        setQuestions(prevQuestions => {
            const newQuestions = []
            for (let i = 0; i < prevQuestions.length; i++) {
                const currQuestion = prevQuestions[i];
                if (currQuestion.id == id) {
                    newQuestions.push(
                        {
                            ...currQuestion,
                            selectedChoice: index != currQuestion.selectedChoice ? index : -1
                        }
                    )
                }
                else {
                    newQuestions.push(currQuestion);
                }
            }
            return newQuestions
        })
    }

    function submitAnswers() {
        setQuestions(prevQuestions => {
            let newCorrectCount = 0;
            const tempQuestions = []
            for (let i = 0; i < questions.length; i++) {
                const currQuestion = questions[i]
                if (currQuestion.answer === currQuestion.selectedChoice) {
                    tempQuestions.push({
                        ...currQuestion,
                        isSubmitted: true,
                        isCorrect: true
                    })
                    newCorrectCount++;
                }
                else {
                    tempQuestions.push({
                        ...currQuestion,
                        isSubmitted: true,
                        isCorrect: false
                    })
                }
            }
            setCorrectCount(newCorrectCount)
            return tempQuestions;
        })
    }

    return (
        <div className="quiz-container">
            {questionElements}
            {correctCount > -1 ? 
                <div className="results-container">
                    <span className="results">You scored {correctCount}/{questions.length} correct Answers</span>
                    <button className="quiz-button" onClick={props.playAgain}>
                        Play Again
                    </button>
                </div> :
                <button className="quiz-button" onClick={submitAnswers}>
                    Check answers
                </button>   
            }
        </div>
    )
}