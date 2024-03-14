"use client"
import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

interface Note {
  id: string;
  title: string;
  description: string;
}

const NotesComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteDescription, setNewNoteDescription] = useState<string>('');
  const [editNoteTitle, setEditNoteTitle] = useState<string>('');
  const [editNoteDescription, setEditNoteDescription] = useState<string>('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>('http://localhost:4000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      await axios.post('http://localhost:4000/notes', {
        title: newNoteTitle,
        description: newNoteDescription
      });
      fetchNotes();
      setShowCreatePopup(false);
      setNewNoteTitle('');
      setNewNoteDescription('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = async () => {
    try {
      await axios.put(`http://localhost:4000/notes/${editNoteId}`, {
        title: editNoteTitle,
        description: editNoteDescription
      });
      fetchNotes();
      setShowEditPopup(false);
      setEditNoteId(null);
      setEditNoteTitle('');
      setEditNoteDescription('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${noteId}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowCreatePopup(true)}>Add Note</button>
      {showCreatePopup && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newNoteDescription}
            onChange={(e) => setNewNoteDescription(e.target.value)}
          />
          <button onClick={handleAddNote}>Save</button>
          <button onClick={() => setShowCreatePopup(false)}>Cancel</button>
        </div>
      )}
      {showEditPopup && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={editNoteTitle}
            onChange={(e) => setEditNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={editNoteDescription}
            onChange={(e) => setEditNoteDescription(e.target.value)}
          />
          <button onClick={handleEditNote}>Save</button>
          <button onClick={() => setShowEditPopup(false)}>Cancel</button>
        </div>
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div>
              <strong>{note.title}</strong>
              <p>{note.description}</p>
            </div>
            <button onClick={() => {
              setEditNoteId(note.id);
              setEditNoteTitle(note.title);
              setEditNoteDescription(note.description);
              setShowEditPopup(true);
            }}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesComponent;
