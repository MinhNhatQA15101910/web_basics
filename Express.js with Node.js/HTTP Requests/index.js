import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<p>Email: dmnhat.pt@gmail.com<p>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Do Nhat</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
