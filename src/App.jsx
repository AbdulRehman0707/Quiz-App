import "./index.css";
import React, { useState } from "react";
import question from "./data/questions.json";

export const App = () => {
  let [currentQIndex, setCurrentQIndex] = useState(0);
  let [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  let [score, setScore] = useState(0);

  const Restart = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
  };

  const onOptionSelected = (index) => {
    setSelectedOptionIndex(index);
    if (index === question[currentQIndex].correctOptionIndex) {
      setScore(score + 1); // Increment score if the selected option is correct
    }
  };

  const nextQuestion = () => {
    setCurrentQIndex((prevIndex) => prevIndex + 1);
    setSelectedOptionIndex(null);
  };

  if (currentQIndex === question.length) {
    return (
      <div className="quiz-container">
        <h1>Online Quiz</h1>
        <h3>Quiz Finished!</h3>
        <p>Your score: {score} / {question.length}</p>
        <div className="restart-section">
          <button onClick={Restart} className="next-button">
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Online Quiz</h1>
      <div className="question-section">
        <div className="question-text">{question[currentQIndex]?.statement}</div>
        {question[currentQIndex]?.img && (
          <img
            src={question[currentQIndex]?.img}
            alt="question visual"
            className="question-image"
          />
        )}
      </div>

      <div className="options-container">
        {question[currentQIndex]?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelected(index)}
              className={
      selectedOptionIndex !== null
        ? index === question[currentQIndex].correctOptionIndex
          ? "correct" // Correct answer is green
          : selectedOptionIndex === index
          ? "incorrect" // Incorrect clicked answer is red
          : "inactive" // Other options are grey
        : "" // Default state
    }
            disabled={selectedOptionIndex !== null} // Disable buttons once an option is selected
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={nextQuestion}
        className="next-button"
        disabled={selectedOptionIndex === null} // Disable "Next" button until an option is selected
      >
        Go to next question
      </button>
    </div>
  );
};
