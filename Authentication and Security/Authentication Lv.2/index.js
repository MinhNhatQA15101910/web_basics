import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Hocsinhgioi3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("home.ejs");
});

app.get("/login", (req, res) => {
  res.status(200).render("login.ejs");
});

app.get("/register", (req, res) => {
  res.status(200).render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username.trim();
  const password = req.body.password.trim();

  // Save new user to database
  try {
    var checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rowCount > 0) {
      res.status(400).send("Email already exists. Try logging in.");
    } else {
      // Password Hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password:", err);
        } else {
          await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );

          res.status(200).render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username.trim();
  const loginPassword = req.body.password.trim();

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rowCount > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.log("Error comparing password:", err);
        } else {
          if (result) {
            res.status(200).render("secrets.ejs");
          } else {
            res.status(404).send("Incorrect Password.");
          }
        }
      });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
