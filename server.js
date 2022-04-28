const express = require("express");
const path = require("path");
const app = express();
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

// express basic middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve public folder tree by default
app.use(express.static("public"));

// use apiRouter for /api
app.use('/api', apiRouter);

// send notes.html for /notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// send index.html for misc requests - comment out during testing
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/public/index.html"))
// );

// listen on port indefinitely
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
