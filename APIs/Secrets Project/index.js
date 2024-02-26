import axios from "axios";
import express from "express";

const app = express();
const port = 8000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const result = response.data;
    res
      .status(200)
      .render("index.ejs", { secret: result.secret, user: result.username });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
