const express = require("express");
const path = require("path");
const app = express();
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

// express basic middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use public
app.use(express.static("public"));

// send notes.html for /notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// listen on port indefinitely
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
