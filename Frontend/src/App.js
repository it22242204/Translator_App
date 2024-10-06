import React from 'react';
import { Route, Routes } from 'react-router-dom';
// home page 
import Home from './home';
import './App.css';
// bookmark page
import AddBookmark from './components/BookMark/AddBookMark/AddBookMark';
import BookMarkDetails from './components/BookMark/BookMarkDetails/BookMarkDetails';
import UpdateBookmark from './components/BookMark/UpdateBookMark/UpdateBookMark';
// Quiz page
import AddQuiz from './components/Quiz/AddQuiz';
import DisplayQuiz from './components/Quiz/DisplayQuiz';
import QuizIntro from './components/Quiz/QuizIntro';
import QuizAdmin from './components/Quiz/QuizAdmin';
import AdminLogin from './components/Quiz/AdminLogin';
import ProtectedRoute from './components/Quiz/ProtectedRoute';

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
          <Route path='/AddBookMark' element={<AddBookmark/>}/>
          <Route path='/bookmarkdetails' element={<BookMarkDetails/>}/>
          <Route path="/updatebookmark/:id" element={<UpdateBookmark/>}/>

          <Route path='/addnote' element={<Addnote/>}/>
          <Route path='/notedetails' element={<Notedetails/>}/>
           <Route path="/notedetails/:id" element={<Updatenote/>}/>

          <Route path='/addnewquiz' element={<AddQuiz/>}/>
          <Route path='/displayquiz' element={<DisplayQuiz/>}/>
          <Route path='/quizintro' element={<QuizIntro/>}/>
          <Route path='/quizadmin' element={<QuizAdmin/>}/>

          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><QuizAdmin /></ProtectedRoute>} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
