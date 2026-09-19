// create server

const express = require('express');

const app = express();

const notes = [];

// Middleware to read JSON request body
app.use(express.json());

// POST - Create a new note
app.post('/notes', (req, res) => {
    notes.push(req.body);

    res.status(201).json({
        message: "Note created successfully"
    });
});

// GET - Get all notes
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    });
});

// PATCH - Update note
app.patch('/notes/:id', (req, res) => {
    const id = Number(req.params.id);

    const note = notes[id];

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;

    res.status(200).json({
        message: "Note updated successfully",
        note: note
    });
});


// DELETE - Delete note
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!notes[id]) {
        return res.status(404).json({
            message: "Note not found"
        });
    }
    // delete note 
     notes.splice(id, 1);

    res.status(200).json({
        message: "Note deleted successfully"
    });
});



module.exports = app;