import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Hocsinhgioi3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
db.query("SELECT * FROM items", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    items = res.rows;
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  // Add new item to database
  var result = await db.query(
    "INSERT INTO items (title) VALUES ($1) RETURNING *",
    [item]
  );

  // Add newly added item to items list
  items.push(result.rows[0]);

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedItemId = req.body.updatedItemId;
  const updatedItemTitle = req.body.updatedItemTitle.trim();

  // Update item in the database
  var result = await db.query(
    "UPDATE items SET title = $1 WHERE id = $2 RETURNING *",
    [updatedItemTitle, updatedItemId]
  );

  // Update item in items list
  var updatedIndex = items.findIndex((item) => item.id == updatedItemId);
  items[updatedIndex] = result.rows[0];

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  console.log(req.body);

  const deleteItemId = req.body.deleteItemId;

  // Delete item from database
  await db.query("DELETE FROM items WHERE id = $1", [
    deleteItemId,
  ]);

  // Delete item from items list
  var deletedIndex = items.findIndex((item) => item.id == deleteItemId);
  items.splice(deletedIndex, 1);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
