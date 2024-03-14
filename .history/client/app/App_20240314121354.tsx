// src/App.js
import React, { useEffect, useState } from 'react';
import { createNote, getNotes, updateNote, deleteNote } from './services/notesService';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await getNotes();
    setNotes(response.data);
  };

  const handleAddNote = async () => {
    await createNote({ content: newNote });
    setNewNote('');
    fetchNotes();
  };

  const handleEditNote = async (id) => {
    const updatedContent = prompt('Edit note');
    if (updatedContent) {
      await updateNote(id, { content: updatedContent });
      fetchNotes();
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div className="App">
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button onClick={handleAddNote}>Add Note</button>
      {notes.map((note) => (
        <div key={note.id}>
          {note.content}
          <button onClick={() => handleEditNote(note.id)}>Edit</button>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
