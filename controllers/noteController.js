// Import necessary modules
const fs = require('fs'); // Module to handle file system operations
const path = require('path'); // Module to work with file paths
const { v4: uuidv4 } = require('uuid'); // Module to generate unique identifiers

// Path to the database file
const DB_PATH = path.join(__dirname, '..', 'db', 'db.json');

// Function to get all notes
const getNotes = (req, res) => {
    // Read the database file
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err); // Log error to the console
            return res.status(500).json({ message: 'Error reading the notes' }); // Send error response
        }
        res.json(JSON.parse(data)); // Parse and return the notes data
    });
};

// Function to create a new note
const createNote = (req, res) => {
    const newNote = { ...req.body, id: uuidv4() }; // Create a new note object with a unique ID

    // Read the database file
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err); // Log error to the console
            return res.status(500).json({ message: 'Error reading the notes' }); // Send error response
        }
        const notes = JSON.parse(data);
        notes.push(newNote); // Add the new note to the array

        // Write the updated notes array to the database file
        fs.writeFile(DB_PATH, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err); // Log error to the console
                return res.status(500).json({ message: 'Error writing the new note' }); // Send error response
            }
            res.json(newNote); // Return the new note
        });
    });
};

// Function to delete a note
const deleteNote = (req, res) => {
    // Read the database file
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err); // Log error to the console
            return res.status(500).json({ message: 'Error reading the notes' }); // Send error response
        }
        const notes = JSON.parse(data).filter(note => note.id !== req.params.id); // Filter out the note to be deleted

        // Write the updated notes array to the database file
        fs.writeFile(DB_PATH, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err); // Log error to the console
                return res.status(500).json({ message: 'Error deleting the note' }); // Send error response
            }
            res.json({ message: 'Note deleted successfully' }); // Confirm deletion
        });
    });
};

// Export the functions to be used by the router
module.exports = {
    getNotes,
    createNote,
    deleteNote
};
