import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get All Notes
  const getNotes = async () => {
    //Todo : API CALL
    
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4Y2QzOWYxYmZkZTI1ZGM0M2QwYTU5In0sImlhdCI6MTY1MzM5ODI0OX0.paoT953P3y-X96k0loW8zLzPUZoRkT2pk6Sc4fj6X20",
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //Todo : API CALL
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4Y2QzOWYxYmZkZTI1ZGM0M2QwYTU5In0sImlhdCI6MTY1MzM5ODI0OX0.paoT953P3y-X96k0loW8zLzPUZoRkT2pk6Sc4fj6X20",
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json()
    console.log(json)
    console.log("Adding a new note");
    const note = {
      _id: "628dbae518c78c8b72f1a105",
      user: "628cd39f1bfde25dc43d0a59",
      title: title,
      description: description,
      tag: tag,
      date: "2022-05-25T05:13:09.109Z",
      __v: 0
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4Y2QzOWYxYmZkZTI1ZGM0M2QwYTU5In0sImlhdCI6MTY1MzM5ODI0OX0.paoT953P3y-X96k0loW8zLzPUZoRkT2pk6Sc4fj6X20",
      },
    });
    const json =  response.json();
    console.log(json);

    console.log("Deleted note with id => " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4Y2QzOWYxYmZkZTI1ZGM0M2QwYTU5In0sImlhdCI6MTY1MzM5ODI0OX0.paoT953P3y-X96k0loW8zLzPUZoRkT2pk6Sc4fj6X20",
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json()
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
    }

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
