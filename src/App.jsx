import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import StartScreen from "./components/StartScreen.jsx"
import QuizScreen from "./components/QuizScreen.jsx"
import { decode } from "html-entities"
import data from "./data.json"

function App() {
  const [inQuiz, setInQuiz] = useState(false)

  function startQuiz() {
    data.results = data.results.map(obj => {
      obj.question = decode(obj.question);
      // create array of choices and randomize them, keeping track of correct choice
      const resChoices = []; 
      const tempChoices = [obj.correct_answer, ...obj.incorrect_answers]
      const totalChoiceCount = tempChoices.length;
      for (let i = 0; i < totalChoiceCount; i++) {
        const randomIndex = Math.floor(Math.random() * tempChoices.length)
        const randomChoice = tempChoices.splice(randomIndex, 1)[0];
        if (randomChoice === obj.correct_answer) {
          obj.correct_answer_index = i;
        }
        resChoices.push(randomChoice)
      }
      obj.choices = resChoices;
      
      return obj;
    })
    setInQuiz(true);
  }

  function playAgain() {
    setInQuiz(false);
  }

  return (
    <div>
        {inQuiz ? 
          <QuizScreen data={data.results} playAgain={playAgain}/> : 
          <StartScreen handleClick={startQuiz}/>
        }
    </div>
  )
}

export default App
