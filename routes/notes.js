const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const notes = require("express").Router();

notes.get("/", (req, res) =>
  fs.readFile("./db/db.json", (err, data) => {
    res.json(JSON.parse(data));
    console.log(JSON.parse(data));
    err ? console.error(err) : console.log("\nsent current notes to /notes GET");
  })
);

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
          err ? console.error(err) : console.info(`\nnew note written to db.json`)
        );
        res.json(`new note saved to database`);
      }
    });
  } else {
    res.error("error in saving note");
  }
});

module.exports = notes;
