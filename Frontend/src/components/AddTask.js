import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../slices/tasksSlice";
import {useDispatch} from 'react-redux'

const AddTask = () => {

    const dispatch = useDispatch()

    const [input_text,setTitle] = useState('')
    const [translated_text,setDescription] = useState('')


    const addTask = (e) => {
        e.preventDefault()
        console.log({input_text,translated_text})
        dispatch(addTaskToServer({input_text,translated_text}))
        setTitle('')
        setDescription('')
    }
  return (
    <section className="my-5">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Task Title" value={input_text}
         onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Task Description" value={translated_text}
        onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
      <div className="text-end">
        <Button variant="primary" type="submit" onClick={(e) =>addTask(e)}>
          Add Task
        </Button>
      </div>
    </Form>
    </section>
  );
};

export default AddTask;