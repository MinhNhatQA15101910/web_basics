import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var letterCount = 0;

app.get("/", (req, res) => {
  if (letterCount === 0) {
    res.render("index.ejs");
  } else {
    res.render("index.ejs", { letterCount: letterCount });
  }
});

app.post("/submit", (req, res) => {
  letterCount =
    req.body["fName"].trim().length + req.body["lName"].trim().length;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
