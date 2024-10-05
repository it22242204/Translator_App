import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import BookMarkDetail from '../BookMarkDetail/BookMarkDetail';
import Header from '../../../Header/Header';
import './BookMarkDetails.css';


const URL = 'http://localhost:4000/BookMark';

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function BookMarkDetails() {
  const [BookMarks, setBookmarks] = useState([]);
  const componentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      setBookmarks(data?.bookmarks || []);
    });
  }, []);

  const handlePrint = useReactToPrint({ 
    // content: () => componentsRef.current,
    contentRef: componentsRef,
    documentTitle: 'BookMark Details',
    onAfterPrint: () => alert('PDF Downloaded'),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [noResult, setNoResult] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filterBookmarks = BookMarks.filter((bookmark) =>
        Object.values(bookmark).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBookmarks(filterBookmarks);
      setNoResult(filterBookmarks.length === 0);
    });
  };

  return (
    <div className="bookmark-container">
       {/* Navbar is fixed at the top */}
      <Header />
      <div className="content">
        <h1 className="heading">BookMark Details</h1>
        <div className="search-container">
          <div className="search-area">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search Bookmark Details"
              className="search-bar"
            />
            <button className="btn-search" onClick={handleSearch}>Search</button>
          </div>
          <button className="btn no-print" onClick={handlePrint}>
            Download Report
          </button>
        </div>
        {noResult ? (
          <div>
            <p>No Bookmark Found</p>
          </div>
        ) : (
          <div ref={componentsRef} className="bookmark-list">
            {BookMarks &&
              BookMarks.map((bookmark, i) => (
                <div key={i}>
                  <BookMarkDetail bookmark={bookmark} />
                </div>
              ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default BookMarkDetails;
