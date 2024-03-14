// src/services/notesService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/notes';

const createNote = async (note) => {
  return axios.post(BASE_URL, note);
};

const getNotes = async () => {
  return axios.get(BASE_URL);
};

const updateNote = async (id, note) => {
  return axios.put(`${BASE_URL}/${id}`, note);
};

const deleteNote = async (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export { createNote, getNotes, updateNote, deleteNote };
