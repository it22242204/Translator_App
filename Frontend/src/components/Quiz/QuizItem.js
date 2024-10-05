import React, { useEffect, useState } from "react";
import axios from "axios";

function QuizItem({quiz,onClose}){
    const[newAnswer,setNewAnswer] = useState("");

    const handleUpdateAnswer = () => {
        axios.patch(`http://localhost:4000/Backend/quiz/updatequiz/${quizId}`)
        .then((response)=>{
            console.log("Correct Answer updated successfully",response.data);
            onClose();
        }).catch((error) =>{
            console.error("Error updating correct answer",error);
        });
    };

    return(
        <div>
            

        </div>
    )
}