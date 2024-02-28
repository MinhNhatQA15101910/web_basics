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

let error = "";

async function isVisited(countryCode) {
  const result = await db.query(
    "SELECT * FROM visited_countries WHERE country_code = $1",
    [countryCode]
  );
  return result.rowCount > 0;
}

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((row) => countries.push(row.country_code));

  if (error !== "") {
    res.render("index.ejs", {
      countries: countries,
      total: result.rowCount,
      error: error,
    });
  } else {
    res.render("index.ejs", {
      countries: countries,
      total: result.rowCount,
    });
  }
});

app.post("/add", async (req, res) => {
  const userCountryName = req.body.country;

  const queryResult = await db.query(
    "SELECT country_code FROM countries WHERE UPPER(country_name) = UPPER($1)",
    [userCountryName]
  );

  if (queryResult.rowCount <= 0) {
    error = "Country name does not exist, try again.";
    res.redirect("/");
    return;
  }

  const countryCode = queryResult.rows[0].country_code;
  if (await isVisited(countryCode)) {
    error = "Country has already been added, try again.";
    res.redirect("/");
    return;
  }

  await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
    countryCode,
  ]);

  error = "";
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
