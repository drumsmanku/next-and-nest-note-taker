import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

interface Note {
  id: string;
  text: string;
}

const NotesComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [editNoteText, setEditNoteText] = useState<string>('');

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
      await axios.post('http://localhost:4000/notes', { text: newNoteText });
      fetchNotes();
      setShowCreatePopup(false);
      setNewNoteText('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = async () => {
    try {
      await axios.put(`http://localhost:4000/notes/${editNoteId}`, { text: editNoteText });
      fetchNotes();
      setShowEditPopup(false);
      setEditNoteId(null);
      setEditNoteText('');
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
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <button onClick={handleAddNote}>Save</button>
          <button onClick={() => setShowCreatePopup(false)}>Cancel</button>
        </div>
      )}
      {showEditPopup && (
        <div>
          <input
            type="text"
            value={editNoteText}
            onChange={(e) => setEditNoteText(e.target.value)}
          />
          <button onClick={handleEditNote}>Save</button>
          <button onClick={() => setShowEditPopup(false)}>Cancel</button>
        </div>
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div>{note.text}</div>
            <button onClick={() => {
              setEditNoteId(note.id);
              setEditNoteText(note.text);
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
