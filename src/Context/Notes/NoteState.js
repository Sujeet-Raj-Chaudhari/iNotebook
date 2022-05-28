import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "628dbae418c78c8b72f1a103",
          "user": "628cd39f1bfde25dc43d0a59",
          "title": "My_Title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-05-25T05:13:08.395Z",
          "__v": 0
        },
        {
          "_id": "628dbae5189c78c8b72f1a105",
          "user": "628cd39f1bfde25dc43d0a59",
          "title": "My_Title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-05-25T05:13:09.109Z",
          "__v": 0
        },
        {
          "_id": "628dbae5184c78c8b72f1a107",
          "user": "628cd39f1bfde25dc43d0a59",
          "title": "My_Title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-05-25T05:13:09.441Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

      //Add a Note
      const addNote = (title, description, tag) =>{
        //Todo : API CALL
        console.log("Adding a new note")
        const note = {
          "_id": "628dbae418c78c8b72f1a103",
          "user": "628cd39f1bfde25dc43d0a59",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-05-25T05:13:08.395Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      
      //Delete a Node
      const deleteNote = (title, description, tag) =>{
        
      }
      
      //Edit a Note
      const editnote =() =>{

      }


      return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;