const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '..', 'db', 'db.json');

const getNotes = (req, res) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading the notes' });
        }
        res.json(JSON.parse(data));
    });
};

const createNote = (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };

    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading the notes' });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(DB_PATH, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error writing the new note' });
            }
            res.json(newNote);
        });
    });
};

const deleteNote = (req, res) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading the notes' });
        }
        const notes = JSON.parse(data).filter(note => note.id !== req.params.id);

        fs.writeFile(DB_PATH, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error deleting the note' });
            }
            res.json({ message: 'Note deleted successfully' });
        });
    });
};

module.exports = {
    getNotes,
    createNote,
    deleteNote
};
