import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  var type = req.body["type"];
  var participants = req.body["participants"];

  var url = "https://bored-api.appbrewery.com/random";
  var isRandom = true;

  if (type !== "" && participants === "") {
    url = `https://bored-api.appbrewery.com/filter?type=${type}`;
    isRandom = false;
  } else if (type === "" && participants !== "") {
    url = `https://bored-api.appbrewery.com/filter?participants=${participants}`;
    isRandom = false;
  } else if (type !== "" && participants != "") {
    url = `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`;
    isRandom = false;
  }

  try {
    const response = await axios.get(url);
    const result = response.data;
    if (isRandom) {
      res.render("index.ejs", { data: result });
    } else {
      var randomActivity = result[Math.floor(Math.random() * result.length)];
      res.render("index.ejs", { data: randomActivity });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
