import React, { useState, useEffect } from 'react';
import Header from '../../../Header/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AddBookMark.css'; 

function AddBookmark() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure inputText and translatedText from location.state with default values
  const { inputText = "", translatedText = "" } = location.state || {};

  console.log("Received data:", { inputText, translatedText }); // Log received data

  const [inputs, setInputs] = useState({
    name: "",
    originalText: inputText, // Set originalText from the incoming prop
    translatedText: translatedText, // Set translatedText from the incoming prop
    dateCreated: new Date().toISOString(), // Current date in ISO format
  });

  // Log the initial state of inputs
  useEffect(() => {
    console.log("Initial inputs state:", inputs);
  }, [inputs]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("Updated inputs state:", { ...inputs, [e.target.name]: e.target.value }); // Log updated state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("Bookmark added successfully!");
      navigate('/bookmarkdetails');
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert("There was an error adding the bookmark.");
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:4000/BookMark", {
      name: String(inputs.name),
      originalText: String(inputs.originalText),
      translatedText: String(inputs.translatedText),
      dateCreated: String(inputs.dateCreated),
    });
    console.log("Bookmark data sent to server:", {
      name: inputs.name,
      originalText: inputs.originalText,
      translatedText: inputs.translatedText,
      dateCreated: inputs.dateCreated,
    }); // Log data sent to the server
  };

  return (
    <div className='add-bookmark-container'>
      <Header />
      <div className='add-bookmark-content'>
        <h1 className='bk_h1'>Add Bookmark</h1>
        <form onSubmit={handleSubmit}>
          <div className='bk_m'>
            <label htmlFor="InputName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          </div>
          <div className='bk_m'>
            <label htmlFor="InputOriginalText" className="form-label">Original Text</label>
            <textarea
              name="originalText"
              className="form-control"
              onChange={handleChange}
              value={inputs.originalText} // Display originalText
              required
              readOnly
            />
          </div>
          <div className='bk_m'>
            <label htmlFor="InputTranslatedText" className="form-label">Translated Text</label>
            <textarea
              name="translatedText"
              className="form-control"
              onChange={handleChange}
              value={inputs.translatedText} // Display translatedText
              required
              readOnly
            />
          </div>
          <div className='bk_m'>
            <label htmlFor="InputDateCreated" className="form-label">Date Created</label>
            <input
              type="text"
              className="form-control"
              name="dateCreated"
              value={new Date(inputs.dateCreated).toLocaleDateString()} // Display formatted date
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddBookmark;
