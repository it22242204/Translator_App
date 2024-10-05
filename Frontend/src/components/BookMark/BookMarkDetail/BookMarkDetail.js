import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './BookMarkDetail.css';

function BookMarkDetail(props) {
  const { _id, name, originalText, translatedText, dateCreated } = props.bookmark;
  
  // delete handler
  const history = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this bookmark?");

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/BookMark/${_id}`);
        window.alert("Bookmark Deleted Successfully");
        history("/bookmarkdetails");
        window.location.reload();
      } catch (error) {
        console.error("Error in bookmark delete:", error);
      }
    }
  };

  return (
    <div style={{ alignItems: 'center' }}>
      <div className="card" style={{ width: '34rem' }}>
        <div className="card-body">
          <h5 className="card-title">Bookmark Display</h5>
          <h2>Name: {name}</h2>
          <h2>Original Text: {originalText}</h2>
          <h2>Translated Text: {translatedText}</h2>
          <h2>Date Created: {new Date(dateCreated).toLocaleDateString()}</h2>
          <br />
          <Link to={`/updatebookmark/${_id}`} className='btn btn-primary no-print'>Update</Link>
          <button onClick={deleteHandler}className='btn btn-danger no-print' >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BookMarkDetail;
