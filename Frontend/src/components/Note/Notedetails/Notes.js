import React,{useState,useEffect,useRef} from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Note from "../Note/Note";
import {useReactToPrint} from "react-to-print";
import './Notes.css';
import bgimg from "./bg3.jpeg";
import Notepic from "./notepic.jpg";
// import Notepic2 from "./notepic2.jpg";

const URL="http://localhost:4000/notes";

const fetchHandler=async()=>{
  return await axios.get(URL).then((res) => res.data);
}
function Notes() {
    const [notes,setNotes]=useState([]);
    useEffect(()=>{
        console.log("abc")
        fetchHandler().then((data)=>{
        console.log("data",data)
        setNotes(data.Notes)
      })
      .catch((e) => console.log(e));
    },[])

 //implementing the downloading report function
 const componentRef=useRef(null);
 const handleprint=useReactToPrint({contentRef: componentRef,
  documentTitle:"Notes Report",
  onAfterPrint:()=>alert("Notes Report Succcessfully Download!"),
 }
  
 )

//  const printHandler = async () => {
//   try {
//     await handleprint();
//   } catch (error) {
//     console.error("Error during printing:", error);
//   }
// };

  //implementing the search functions
  const [searchQuery,setSearchQuery]=useState("");
  const [noResults,setNoResults]=useState(false);

  const handlesearch=()=>{
    fetchHandler().then((data)=>{
      //data.Notes is an array of user objects.This filters the notes based on the search query.
      const filteredNotes=data.Notes.filter((note)=>
        //object.values(note).some((field)=>...):This checks if any notes fields match the search query.
      // Object.values(note).some((field)=>
      // field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      // )
      note.name.toString().toLowerCase().includes(searchQuery.toLowerCase())
     
    )
      // setUsers(filteredUsers): This updates the Users state with the filtered list of notes
      setNotes(filteredNotes);
      setNoResults(filteredNotes.length === 0)
    })
  }

  return (
    <div>
      <Nav/>
       <div className="bgimg"
      style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover" ,position:"sticky",WebkitPosition:"sticky", 
      MozPosition:"sticky"}}> 
      <h1 className='hed1'>Note Details Display Page</h1>
      <input className="search" onChange={(e) => setSearchQuery(e.target.value)}
             type='text'
             name='search'
             placeholder='search user details'
             style={{width:'230px', marginLeft: '35px' }}></input>

       <button className="searchbtn" onClick={handlesearch}>Search</button>
       <p className='theme1'>Keep your translations organized and enriched with personal insights. This section allows you to delete, edit, and manage notes for each translated text. 
       Simply click on a note to edit or delete it, and use the 'Add New Note' button to expand your collection. Stay organized and make the most out of your bilingual experience with our seamless note management system.
       </p>
       <div>
        <img src={Notepic} alt="note_pic" className="notepic" />
        
      </div>
      {/* <div>
      <img src={Notepic2} alt="note_pic" className="notepic2" />
      </div> */}
     
      <div className="notes-container">
      {noResults ?(
          <div>
            <p>No Notes Found</p>
            </div>
        ):(
      <div ref={componentRef}>
      {/* The key prop is used to uniquely identify each item in the list (using the index i). */}
      {notes && notes.map((note,i) => {
        console.log("userxyz",note)
          return (
           <div key={i}>
                <Note note={note}/>
                {/* the name note should be equiavelent to the name=props.note (Note component)*/}
            </div>
        )})}
       
       </div>
       )}
        <button className="btn btn-primary" id='downloadreport' onClick={()=>{
         
           handleprint();
        }}>Download Report</button>
        </div> 
    </div>
    </div>
    
  )
}

export default Notes;
