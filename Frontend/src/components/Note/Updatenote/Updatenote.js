import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from '../Nav/Nav';
import bgImage from "./update.jpeg";

function Updatenote() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/notes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.note));
    };
    fetchHandler();
  },[id]);

  //implementing the sendrequest function
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:4000/notes/${id}`, {
        //module attribute name= form input.name
        name: String(inputs.name),
        note: String(inputs.note),
        grammer: String(inputs.grammer),
        complexsentence: String(inputs.complexsentence),
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  //implementing a function what should happen when make inputs and submit
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

   //after where should navigate,url related function
   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/notedetails'),alert("Notedetails updated successfully"));
   };

  return (
    <div>
      <Nav/>
      <div className="position-relative d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}>
      
      
      <form onSubmit={handleSubmit}>
      {/* <br/><br/><br/><br/><br/> */}
      <h1 style={{marginTop:"90px"}}>Update Notes</h1>
  <div class="mb-3">
    <label for="InputName" class="form-label">Name</label>
    <input type="text" class="form-control" name="name" aria-describedby="nameHelp" onChange={handleChange} value={inputs.name}/>
    <div id="namehelp" class="form-text">Please remember the name you are able to search by this keyword</div>
  </div>
  <div class="mb-3">
    <label for="InputNote" class="form-label">Note</label>
    <textarea  name="note" class="form-control" onChange={handleChange} value={inputs.note} required/>
  </div>
  <div class="mb-3">
    <label for="InputGrammer" class="form-label">Grammer</label>
    <input type="text" class="form-control" name="grammer" onChange={handleChange} value={inputs.grammer} required/>
  </div>
  <div class="mb-3">
    <label for="InputComplexsentence" class="form-label">Complex sentence</label>
    <input type="text" class="form-control" name="complexsentence" onChange={handleChange} value={inputs.complexsentence} required/>
  </div>
  <div class="mb-3">
    <label for="InputDescription" class="form-label">Description</label>
    <input type="text" class="form-control" name="description" onChange={handleChange} value={inputs.description} required/>
  </div>
  {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  );
}

export default Updatenote;
