import React from "react";
import { useNavigate } from "react-router-dom";
import './quizstyle/QuizIntro.css';
import Headers from '../../Header/Header';

function QuizIntro(){
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/displayquiz');
    navigate('/displayquiz');
  };

  return (
    <div>
      <Headers/>
      <div className="bkimg">
        <div className="introcontainer">
          <h1>Weekly Quiz Challenge</h1>
          <p>Welcome to the Ultimate Quiz Challenge! This quiz is designed to test your knowledge and help you learn along the way. Each question has multiple-choice answers, and your goal is to select the correct one.</p>
          <ul>
            <li>Read Carefully: Each question will be displayed one at a time.</li>
            <li>Select One Answer: Choose the answer you believe is correct by clicking the radio button next to it.</li>
            <li>Unanswered Questions: Unanswered questions will be consider as wrong answers.</li>
            <li>Navigate: Use the "Next" button to proceed to the next question and the "Back" button to revisit the previous question.</li>
            <li>Finish the Quiz: Click the "Finish" button after answering all questions to see your results.</li>
            <li>Check Your Answers: Once finished, you'll see which answers were correct, along with your choices. Aim for accuracy and have fun!</li>
          </ul>
          <h4>Good luck, and let's get started!</h4>
          <button className="btn" type="button" onClick={handleStart}>Start</button>
        </div>
      </div>
    </div>
  );

};

export default QuizIntro;