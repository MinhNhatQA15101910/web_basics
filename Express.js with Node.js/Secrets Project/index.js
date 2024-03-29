import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var isAuthorized = false;

function validatePassword(req, res, next) {
  var password = req.body["password"];
  if (password === "ILoveProgramming") {
    isAuthorized = true;
  } else {
    isAuthorized = false;
  }
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(validatePassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
