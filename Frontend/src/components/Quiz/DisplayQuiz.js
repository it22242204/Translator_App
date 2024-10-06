import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Quiz/quizstyle/DisplayQuiz.css';
import Nav from '../Home/NavBar/Nav';

function DisplayQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Backend/quiz/displayquiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);


  const handleAnswerChange = (quizId, answer) => {
    setUserAnswers((prev) => ({ ...prev, [quizId]: answer }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinish = () => {

    const unanswered = quizzes.some((quiz) => !userAnswers[quiz._id]);
  
  if (unanswered) {
    alert("Please answer all the questions before finishing the quiz.");
    return;
  }
  
    const calculatedScore = quizzes.reduce((acc, quiz) => {
      if (userAnswers[quiz._id] === quiz.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(calculatedScore);
    setShowResults(true);
  };
  

  if (showResults) {
    return (
      <div className="background" style={{ backgroundColor: "#FCE8E0" }}>
        <Nav/>
        <div className="container" style={{ backgroundColor: "#f9dace"}} >
        <h3>Quiz Results</h3>
        <p style={{ color: "red", fontSize: "15px" }}><strong style={{ color: "red", fontSize: "15px" }}>Total Score:</strong> {score} / {quizzes.length}</p> {/* Display score */}
        {quizzes.map((quiz, index) => (
          <div key={quiz._id} className="quiz-item">
            <p><strong style={{ color: "#4da6ff" }}>Question {index + 1}:</strong>
               <span style={{ color: "black" }}>{quiz.question}</span>
            </p>
            <p>
              <strong style={{ color: "black" }}>Your Answer:</strong>
              <span style={{ color: "black" }}> {userAnswers[quiz._id]} </span> - 
              {userAnswers[quiz._id] === quiz.correctAnswer ? (
                <span style={{ color: "green" }}> Correct</span>
              ) : (
                <span style={{ color: "red" }}> Wrong</span>
              )}
            </p>
            <p><strong  style={{ color: "black" }}>Correct Answer:</strong> 
            <span style={{ color: "black" }}>{quiz.correctAnswer}</span></p>
          </div>
        ))}
      </div>
      <br/>

      </div>
      
    );
  }
  

  if (quizzes.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <div>
      <Nav/>
       <div className="bkimg">
        <br/><br/>
       <h1>Weekly Quiz Challenge</h1>
       <h4> Question {currentQuestionIndex + 1}/{quizzes.length}</h4>
        <div className="container">
          <div className="quiz-item">
            <p style={{ color: "white"}}> {currentQuiz.question}</p>
            <div>
              {[currentQuiz.answerOne, currentQuiz.answerTwo, currentQuiz.answerThree].map((answer, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <label >
                    <input
                      type="radio"
                      name={`quiz-${currentQuiz._id}`}
                      value={answer}
                      onChange={() => handleAnswerChange(currentQuiz._id, answer)}
                      checked={userAnswers[currentQuiz._id] === answer}
                    />
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handleBack} className="btn btn-secondary">Back</button>
            )}
            {currentQuestionIndex < quizzes.length - 1 ? (
              <button onClick={handleNext} className="btn btn-primary">Next</button>
            ) : (
              <button onClick={handleFinish} className="btn btn-success">Finish</button>
            )}
          </div>
        </div>

       </div>
       
    </div>
  );
}

export default DisplayQuiz;