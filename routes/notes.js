const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const notes = require("express").Router();

// GET at /api/notes to get all current notes
notes.get("/", (req, res) =>
  fs.readFile("./db/db.json", (err, data) => {
    res.json(JSON.parse(data));
    err
      ? console.error(err)
      : console.info("\nsent current notes to /notes GET");
  })
);

// POST at /api/notes to save a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile("./db/db.json", (err, data) => {
      if (err) {
        console.error(err);
        res.error("error in saving note");
      } else {
        const db = JSON.parse(data);
        db.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(db, null, 4), (err) =>
          err
            ? console.error(err)
            : console.info(`\nnew note written to db.json`)
        );
        res.json(`new note saved to database`);
      }
    });
  } else {
    res.error("error in saving note");
  }
});

// DELETE at /api/notes/:id
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res.error("error in deleting note");
    } else {
      const db = JSON.parse(data);
      const newDb = db.filter((note) => note.id !== noteId);
      fs.writeFile("./db/db.json", JSON.stringify(newDb, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nnote deleted from db.json`)
      );
      res.json(`note deleted from database`);
    }
  });
});

module.exports = notes;
