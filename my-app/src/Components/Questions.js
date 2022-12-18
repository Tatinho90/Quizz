import React from "react";
import {decode} from 'html-entities';

export default function Questions(props){

 const AllAnswers= [...props.incorrectAnswers, props.correctAnswer ]
 const [reShuffled, setReshuffled]= React.useState(() => AllAnswers.sort(()=> Math.random() - 0.5 ))

//const useStyle= {
  //backgroundColor: props.answers[props.question] === props.correctAnswer && props.correctAnswer === value  ? "green" : "red"
//}

function checkStyle(value){
return {   backgroundColor:  props.correctAnswer === value  
    ? "#94D7A2" 
    :  props.answers[props.question]  === value && value!== props.correctAnswer ? "#F8BCBC"
    : "white",
    color: props.correctAnswer === value
    ? "#293264"
    : "grey",
    border: props.correctAnswer === value ? "1.5px solid green"
    : "0.25px solid grey"
 
}
}

console.log(props.answers)


 const createAnswers = reShuffled.map(value => {
 return <input 
className="questionFrame" 
key={value} 
name={props.question}
type="radio" 
id={value} 
label={decode(value)} 
value={value}
onChange={props.runThis}
style={props.gameFinished ? checkStyle(value) : {}}
>
</input>
 })
 

    return (
        <div className="question-outer">
    <h1>{decode(props.question)}</h1>
    <div className="answer-grid"> {createAnswers}</div>
    </div>
    )
}