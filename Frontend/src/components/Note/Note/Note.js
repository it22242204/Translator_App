import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Note.css';

function Note(props) {
    const {_id,name,note,grammer,complexsentence,description}=props.note;

    //implementing the delete function below delete handler
    const history=useNavigate();
    
    const deleteHandler=async()=>{
     const userconfirm=window.confirm("Are you sure you want to delete this note?")
     if(userconfirm){
      try{
      await axios.delete(`http://localhost:4000/notes/${_id}`)
      // .then(res=>res.data)
      // .then(()=>history("/"))
      window.alert("Bookmark Deleted Successfully");
      history("/notedetails");
      window.location.reload();
      }catch(error){
      console.log("Error in note deleting:",error);
      };
    }
      
    }
  return (
    <div style={{alignItems:'center'}}>
        {/* <br></br>
      <h1 className='u1'>Note Display</h1>
      
      <h2>ID:{_id}</h2>
      <h2>Name:{name}</h2>
      <h2>Note:{note}</h2>
      <h2>Grammer:{grammer}</h2>
      <h2>Complex Sentence:{complexsentence}</h2>
      <h2>Description:{description}</h2>
      <button className='bt'>
      <Link to={`/notedetails/${_id}`} className='bt1'>Update</Link>
      </button>
      <button>Delete</button>
      <br></br><br></br> */}
      {/* <button className='bt'>
      <Link to={`/userdetails/${_id}`} className='bt1'>Update</Link>
      </button>
      <button onClick={deleteHandler} className='bt'>Delete</button> */}
       <div className="card" style={{width: '34rem'}}>
   
   <div className="card-body" >
     <h5 className="card-title" style={{fontSize:'30px'}}>Note Display</h5>
     {/* <h2>ID:{_id}</h2> */}
      <h2 className="black-text">Name:{name}</h2>
      <h2 className="black-text">Note:{note}</h2>
      <h2 className="black-text">Grammer:{grammer}</h2>
      <h2 className="black-text">Complex Sentence:{complexsentence}</h2>
      <h2 className="black-text">Description:{description}</h2>
     {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      {/* <button className='bt'>
      <Link to={`/notedetails/${_id}`} className='btn btn-primary'>Update</Link>
      </button>
      <button  className='btn btn-primary'>Delete</button>  */}
      <button
          className="nav_btn_log"
          onClick={() => (window.location.href = `/notedetails/${_id}`)}
        >
          Update
        </button>
        <button
          className="nav_btn_regi"
          onClick={deleteHandler}
        >
          Delete
        </button>
   </div>
 </div>
    </div>
   
  );
}

export default Note;
