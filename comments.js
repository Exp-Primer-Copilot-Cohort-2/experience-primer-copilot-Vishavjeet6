// Create web server
const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Import comments
const comments = require("./comments");

// Get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// Get comment by id
app.get("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
    return;
  }
  res.json(comment);
});

// Create a new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: comments.length + 1,
    content: req.body.content,
  };
  comments.push(comment);
  res.json(comment);
});

// Update a comment
app.put("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
    return;
  }
  comment.content = req.body.content;
  res.json(comment);
});

// Delete a comment
app.delete("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
    return;
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
