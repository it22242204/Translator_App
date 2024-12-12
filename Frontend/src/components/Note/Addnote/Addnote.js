import React, { useState } from 'react';
import Nav from '../Nav/Nav';
// import './Addnote.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from "./bg2.jpeg";

function Addnote() {
  const history = useNavigate();
  const location = useLocation();

  // Destructure inputText and translatedText from location.state with default values
  const { inputText = "", translatedText = "" } = location.state || {};

  console.log("Received data:", { inputText, translatedText }); // Log received data

  const [inputs, setInputs] = useState({
    name: "",
    note: translatedText, // Set note with the translated text
    grammer: "",
    complexsentence: "",
    description: "",
  });

  //implementing a function what should happen when make inputs and submit
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //after where should navigate,url related function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      history('/notedetails');
      alert("Notes added successfully!");
    });
  };

  //implementing the sendrequest function from above
  const sendRequest = async () => {
    await axios.post("http://localhost:4000/notes", {
      name: String(inputs.name),
      note: String(inputs.note),
      grammer: String(inputs.grammer),
      complexsentence: String(inputs.complexsentence),
      description: String(inputs.description),
    }).then(res => res.data);
  };

  return (
    <div>
      <Nav />
      <div className="position-relative d-flex align-items-center justify-content-center vh-100" id='bgimg'
        style={{ backgroundImage: 'url(${bgImage})', backgroundSize: "cover" ,position:"sticky",WebkitPosition:"sticky"}}>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <br></br><br /><br /><br />
          <h1>Add Notes</h1>
          <div className="mb-3">
            <label htmlFor="InputName" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" aria-describedby="nameHelp" onChange={handleChange} value={inputs.name} />
            <div id="namehelp" className="form-text">Please remember the name you are able to search by this keyword</div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputNote" className="form-label">Note</label>
            <textarea name="note" className="form-control" onChange={handleChange} value={inputs.note} required />
          </div>
          <div className="mb-3">
            <label htmlFor="InputGrammer" className="form-label">Grammer</label>
            <input type="text" className="form-control" name="grammer" onChange={handleChange} value={inputs.grammer} required />
          </div>
          <div className="mb-3">
            <label htmlFor="InputComplexsentence" className="form-label">Complex sentence</label>
            <input type="text" className="form-control" name="complexsentence" onChange={handleChange} value={inputs.complexsentence} required />
          </div>
          <div className="mb-3">
            <label htmlFor="InputDescription" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" onChange={handleChange} value={inputs.description} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      
    </div>
  );
}

export default Addnote;