import React, { useContext, useState } from "react";
import noteContext1 from "../context/noteContext1";

const AddNote = () => {
  const context = useContext(noteContext1);
  const { addNote } = context; 
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const clickhere = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    
    setNote({ ...note, [e.target.name]:e.target.value });
  };

  return (
    <div className="container my-3">
      <form>
        <div class="mb-3 mt-3">
          <label for="email" class="form-label">
            Title:
          </label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Enter email"
            name="title"
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">
            Description:
          </label>
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder="Enter description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="email" class="form-label">
            Tag:
          </label>
          <input
            type="text"
            class="form-control"
            id="tag"
            placeholder="Enter email"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={clickhere}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
