const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '..', 'db', 'db.json');

// Funciones getNotes, createNote, deleteNote

module.exports = {
    getNotes,
    createNote,
    deleteNote
};
