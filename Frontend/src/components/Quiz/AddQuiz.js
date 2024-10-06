import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './quizstyle/AddQuiz.css';
import Nav from "../Home/NavBar/Nav";

function AddQuiz(){

    const[question,setQuestion] = useState("");
    const[answerone,setFirst] = useState("");
    const[answertwo,setSecond] = useState("");
    const[answerthree,setThird] = useState("");
    const[correctanswer,setCorrect] = useState("");
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    


    const fetchQuizzes = async () => {
        try {
          const response = await axios.get("http://localhost:4000/Backend/quiz/displayquiz");
          setQuizzes(response.data);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      };

      useEffect(() => {
        fetchQuizzes();
      }, []);
      


    const handleSubmit = async(event)=>{
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:4000/Backend/quiz/addquiz/",{
                question,
                answerone,
                answertwo,
                answerthree,
                correctanswer,
            });
    
            console.log("Question added", response.data);

            setQuestion("");
            setFirst("");
            setSecond("");
            setThird("");
            setCorrect("");

            fetchQuizzes();
            
    
        }catch(error){
            console.error("Error adding question",error);
        }
    };

    const goback=()=>{
        navigate("/quizadmin");
    };


    return(
        <div style={{ backgroundColor: "#FCE8E0" }}>
            <Nav/>
        <div className="container"  style={{ backgroundColor: "#f9dace"}} >
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <button className="delete-button" onClick={goback}>x</button>
                    <label htmlFor="question">Question</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="question" 
                    value={question}
                    placeholder="Enter the question"
                    onChange={(e)=>{
                        setQuestion(e.target.value);
                    }}
                    required
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="answerone">Answer One</label>
                    <input type="text" 
                    className="form-control" 
                    id="answerone" 
                    value={answerone}
                    placeholder="Enter the first answer"
                    onChange={(e)=>{
                        setFirst(e.target.value);
                    }}
                    required
                    />
                </div>

                <br/>

                <div className="form-group">
                    <label htmlFor="answertwo">Answer Two</label>
                    <input type="text" 
                    className="form-control" 
                    id="answertwo" 
                    value={answertwo}
                    placeholder="Enter the second answer"
                    onChange={(e)=>{
                        setSecond(e.target.value);
                    }}
                    required
                    />
                </div>

                <br/>

                <div className="form-group">
                    <label htmlFor="answerthree">Answer Three</label>
                    <input type="text" 
                    className="form-control" 
                    id="answerthree" 
                    value={answerthree}
                    placeholder="Enter the third answer"
                    onChange={(e)=>{
                        setThird(e.target.value);
                    }}
                    required
                    />
                </div>

                <br/>

                <div className="form-group">
                    <label htmlFor="correctanswer">Correct Answer</label>
                    <select
                    className="form-control" 
                    id="correctanswer"
                    value={correctanswer} 
                    
                    onChange={(e)=>{
                        setCorrect(e.target.value);
                    }}
                    required>
                        <option value="">Select the correct answer</option>
                        <option value={answerone}>{answerone}</option>
                        <option value={answertwo}>{answertwo}</option>
                        <option value={answerthree}>{answerthree}</option>
                    </select>
                    
                </div>

                <br/>

                <button type="submit" className="btn-submit">Submit</button>

            </form>

            

        </div>

            <br/>

        </div>
    )
}

export default AddQuiz;