import React from 'react';
import { Route, Routes } from 'react-router-dom';
// home page 
import Home from './home';
import './App.css';
import AddBookmark from './components/BookMark/AddBookMark/AddBookMark';
import BookMarkDetails from './components/BookMark/BookMarkDetails/BookMarkDetails';
import UpdateBookmark from './components/BookMark/UpdateBookMark/UpdateBookMark';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home/>}/>
          <Route path='/AddBookMark' element={<AddBookmark/>}/>
          <Route path='/bookmarkdetails' element={<BookMarkDetails/>}/>
          <Route path="/updatebookmark/:id" element={<UpdateBookmark/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
