const express = require("express");
const NoteModel = require("./models/note.model");

const app = express();

app.use(express.json());


// CREATE - Add a new note
app.post("/notes", async (req, res) => {
  try {
    const data = req.body;

    const note = await NoteModel.create({
      title: data.title,
      description: data.description
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// READ - Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await NoteModel.find();

    res.status(200).json({
      message:"Notes fetched Successfully",
      notes:notes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// READ - Get one note
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.id);

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE - Update a note
app.put("/notes/:id", async (req, res) => {
  try {
    const data = req.body;

    const note = await NoteModel.findByIdAndUpdate(
      req.params.id,
      {
        title: data.title,
        description: data.description
      },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE - Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = app;