import React, { useContext } from "react";
import noteContext1 from '../context/noteContext1'


const NoteItem = (props) => {
  const context = useContext(noteContext1);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  // const { note } = props;
  return (
    <div className="col-lg-3">
      <div class="mt-4 p-5 bg-primary text-white rounded">
        <h3>{note.title}</h3>
        <h4>{note.tag}</h4>
        <p>{note.description}</p>
        <button onClick={() => { deleteNote(note._id) }} className="btn btn-secondary mx-2">Delete</button>
        <button onClick={() => { updateNote(note) }} className="btn btn-secondary">Update</button>
      </div>
    </div>

  );
};

export default NoteItem;
