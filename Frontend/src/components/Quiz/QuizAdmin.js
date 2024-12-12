import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './quizstyle/QuizAdmin.css'; // Ensure you create and style this CSS file accordingly
import Nav from "../Home/NavBar/Nav";

function QuizAdmin() {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuizId, setEditQuizId] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Backend/quiz/displayquiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/Backend/quiz/deletequiz/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleUpdateAnswer = async (quizId) => {
    try {
      await axios.patch(`http://localhost:4000/Backend/quiz/updatequiz/${quizId}`, {
        correctanswer: newAnswer,
      });
      setQuizzes(quizzes.map(quiz => quiz._id === quizId ? { ...quiz, correctAnswer: newAnswer } : quiz));
      setEditQuizId(null); // Close the edit mode after updating
      setNewAnswer(""); // Reset the new answer state
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  const startEditing = (quizId) => {
    setEditQuizId(quizId);
  };

  return (
    <div className="background" style={{ backgroundColor: "#FCE8E0" }}>
      <Nav/>
      <button className="add-button" onClick={() => navigate("/addnewquiz")}>Add Questions</button>
      <h2 className="quiztopic">Implemented Quizzes</h2>
      <div>
        {quizzes.map((quiz, index) => (
          <div key={quiz._id} className="container" style={{ backgroundColor: "white"}}>
            <button className="delete-button" onClick={() => handleDelete(quiz._id)}>x</button>
            <p style={{ color: "#0056ab", fontSize: "20px" }}>
              <strong>Question {index + 1}:</strong> {quiz.question}
            </p>
            <ul>
              <li style={{ fontSize: "18px" }}>{quiz.answerOne}</li>
              <li style={{ fontSize: "18px" }}>{quiz.answerTwo}</li>
              <li style={{ fontSize: "18px" }}>{quiz.answerThree}</li>
            </ul>
            <p style={{ fontSize: "18px" }}>
              <strong style={{ color: "red" }}>Correct Answer:</strong> {quiz.correctAnswer}
            </p>

            {editQuizId === quiz._id ? (
              <div>
                <select
                  className="select-dropdown"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                >
                  <option value="">Select the correct answer</option>
                  <option value={quiz.answerOne}>{quiz.answerOne}</option>
                  <option value={quiz.answerTwo}>{quiz.answerTwo}</option>
                  <option value={quiz.answerThree}>{quiz.answerThree}</option>
                </select>
                <button className="save-button" onClick={() => handleUpdateAnswer(quiz._id)}>Save</button>
                <button className="cancel-button" onClick={() => setEditQuizId(null)}>Cancel</button>
              </div>
            ) : (
              <button className="update-button" onClick={() => startEditing(quiz._id)}>Update</button>
            )}
          </div>
        ))}
      </div>
      <br/>
    </div>
  );
}

export default QuizAdmin;