import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "../Components/AddNote.js"

const Notes = () => {
  const context = useContext(noteContext);
  const { notes} = context;
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
