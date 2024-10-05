import React from 'react';
import { Route, Routes } from 'react-router-dom';
// home page 
import Home from './home';
import './App.css';
import AddBookmark from './components/BookMark/AddBookMark/AddBookMark';
import BookMarkDetails from './components/BookMark/BookMarkDetails/BookMarkDetails';
import UpdateBookmark from './components/BookMark/UpdateBookMark/UpdateBookMark';

//note pages
import Addnote from './components/Note/Addnote/Addnote';
import Notedetails from './components/Note/Notedetails/Notes';
import Updatenote from './components/Note/Updatenote/Updatenote';

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
          <Route path='/addnote' element={<Addnote/>}/>
          <Route path='/notedetails' element={<Notedetails/>}/>
          
          <Route path="/notedetails/:id" element={<Updatenote/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
