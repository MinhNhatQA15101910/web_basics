import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Hocsinhgioi3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUser;
db.query(
  "SELECT * FROM users WHERE id = (SELECT MIN(id) FROM users)",
  (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      currentUser = res.rows[0];
    }
  }
);

let error = "";

async function checkVisited(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [userId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  // Get all users
  var queryResult = await db.query("SELECT * FROM users");
  var users = queryResult.rows;

  const countries = await checkVisited(currentUser.id);
  if (error !== "") {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      user: currentUser,
      color: currentUser.color,
      error: error,
    });
  } else {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      user: currentUser,
      color: currentUser.color,
    });
  }
});

app.post("/add", async (req, res) => {
  const input = req.body.country;

  try {
    var result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = $1",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      result = await db.query(
        "INSERT INTO visited_countries (user_id, country_code) VALUES ($1, $2)",
        [currentUser.id, countryCode]
      );
      error = "";
    } catch (err) {
      error = "Country has already been added, try again.";
    }
  } catch (err) {
    error = "Country name does not exist, try again.";
  }

  res.redirect("/");
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    const userId = req.body.user;

    var queryResult = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    currentUser = queryResult.rows[0];

    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name.trim();
  const color = req.body.color;

  if (name === "" || typeof color === "undefined") {
    res.render("new.ejs", { error: "Valid name and color must be entered." });
    return;
  }

  var result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *", [
    name,
    color,
  ]);

  currentUser = result.rows[0];

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
