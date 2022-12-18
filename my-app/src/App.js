import './App.css';
import top from "./Pictures/top.png"
import bottom from "./Pictures/bottom.png"
import React from "react"
import Questions from "./Components/Questions.js"

function App() {
const [started, setStarted] = React.useState(false);
const [fiveQuestion, setFiveQuestion] = React.useState([]);
const [answers, setAnswers] = React.useState({});
const [rightAnswers, setRightAnswers] = React.useState(0) ;
const [gameFinished, setFinished] = React.useState(false);
const [numberOfGames, setNumberOfGames] = React.useState(0)

const answerStyle={
  color: rightAnswers > 3 ? "green" : rightAnswers > 1? "orange" : "red"
}

React.useEffect( ()=> {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then(res => res.json())
  .then(data => setFiveQuestion(data.results))
}
,[numberOfGames])

function getResponses(event){
  if(!gameFinished){
  const {name, value, type, checked} = event.target;
  setAnswers(prev => {
    return {
      ...prev,
    [name]:value
    }
  })}
}

console.log(answers)

const createValues= fiveQuestion.map(value =>  {
  return <Questions 
  key={value.question}
  question={value.question}
  correctAnswer={value.correct_answer}
  incorrectAnswers={value.incorrect_answers}
  runThis={getResponses}
  answers={answers}
  gameFinished = {gameFinished}
  />
} )

function changeView(){
  setStarted(prev => !prev)
}


function checkAnswers(){
  setFinished(true)
  let counter= 0;
  for (let x=0; x<fiveQuestion.length; x++){
    let question= fiveQuestion[x].question;
    if (fiveQuestion[x].correct_answer === answers[question]){
counter+=1;
    }
  }
  setRightAnswers(counter)
}

function restartGame(){
  setAnswers(prev => {})
  setFinished(false);
  setNumberOfGames(prev => prev + 1)
}


console.log(fiveQuestion)
  return (
    <div className="App">
              <img src={top} className="top-right" />
              <img src={bottom} className="bottom-left" />

{    started === false?
  <div className="firstScreen">
<h1>Lö Quizz</h1>
<h2>Remember: education is important but big biceps are importanter</h2>
<button className="startButton" onClick={changeView}>Start Quizz</button>
      </div>
                :
      <div className="secondScreen">
       {createValues}
       <div class="flex-button">
       {gameFinished && <h2 className="answers">You scored <a style={answerStyle}>{rightAnswers}</a> correct answers</h2> }
       {!gameFinished && <button className="checker"  onClick={checkAnswers}>Check Answers</button>}
       {gameFinished && <button className="checker"  onClick={restartGame}>New Game</button>}

       </div>
      
        </div>
      }
      
    </div>
  );
}

export default App;
