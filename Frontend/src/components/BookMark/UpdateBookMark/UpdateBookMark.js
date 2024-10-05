import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from '../../../Header/Header';
import "./UpdateBookMark.css";

function UpdateBookmark() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const { id } = useParams(); // Get bookmark ID from URL params

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/BookMark/${id}`);
        setInputs(response.data.bookmark); // Set bookmark data to inputs
      } catch (error) {
        console.error("Error fetching the bookmark:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:4000/BookMark/${id}`, {
        name: String(inputs.name),
        originalText: String(inputs.originalText),
        translatedText: String(inputs.translatedText),
        dateCreated: String(inputs.dateCreated),
      });
    } catch (error) {
      console.error("Error updating the bookmark:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    window.alert("Bookmark Updated Successfully!");
    history('/bookmarkdetails'); // Navigate to the bookmark details page
  };

  return (
    <div className="update-bookmark-container">
      <Header/> 
      <h1>Update Bookmark</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="InputName">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name || ""}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputOriginalText">Original Text</label>
          <textarea
            name="originalText"
            onChange={handleChange}
            value={inputs.originalText || ""}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputTranslatedText">Translated Text</label>
          <textarea
            name="translatedText"
            onChange={handleChange}
            value={inputs.translatedText || ""}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputDateCreated">Date Created</label>
          <input
            type="text"
            name="dateCreated"
            value={new Date(inputs.dateCreated).toLocaleDateString()}
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateBookmark;
