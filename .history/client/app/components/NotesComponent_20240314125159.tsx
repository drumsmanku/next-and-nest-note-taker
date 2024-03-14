"use client"
import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

interface Note {
  _id: string;
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
      console.log(response.data);
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
    <div className='flex flex-col h-screen w-screen '>
      <button className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8" onClick={() => setShowCreatePopup(true)}>Add Note</button>
      <div className='flex flex-col w-[50%]'>
        {showCreatePopup && (
          <div className='flex flex-col w-[80%] border-2 rounded-lg  bg-yellow-400 px-20 py-10'>
            <input
              type="text"
              placeholder="Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className='mb-4 border-2 rounded-md pl-3'
            />
            <textarea
              className='mb-4 border-2 rounded-md pl-3'
              placeholder="Description"
              value={newNoteDescription}
              onChange={(e) => setNewNoteDescription(e.target.value)}
            />
            <button className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8" onClick={handleAddNote}>Save</button>
            <button className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8" onClick={() => setShowCreatePopup(false)}>Cancel</button>
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
        <ul className='flex'>
          {notes.map((note) => (
            <li className='border-2 p-10 rounded-md mr-5 mt-5' key={note._id}>
              <div>
                <strong>{note.title}</strong>
                <p>{note.description}</p>
              </div>
              <button className="px-4 mr-5 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8" onClick={() => {
            
                setEditNoteId(note._id);
                setEditNoteTitle(note.title);
                setEditNoteDescription(note.description);
                setShowEditPopup(true);
              }}>Edit</button>
              <button className="px-4  py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8" onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      
      
    </div>
  );
};

export default NotesComponent;
