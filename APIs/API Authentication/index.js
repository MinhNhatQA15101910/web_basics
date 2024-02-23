import express from "express";
import axios from "axios";

const app = express();
const port = 8000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "dominhnhat2003";
const yourPassword = "Hocsinhgioi3";
const yourAPIKey = "18a90128-f9ec-44c0-8b01-221001f2dc85";
const yourBearerToken = "7af26450-3588-4e1c-9dbe-412dbf47684b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const url = `${API_URL}random`;

  try {
    const response = await axios.get(url);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  const url = `${API_URL}all?page=2`;

  try {
    const response = await axios.get(url, {
      auth: { username: yourUsername, password: yourPassword },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  const url = `${API_URL}filter?score=5&apiKey=${yourAPIKey}`;

  try {
    const response = await axios.get(url);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  const url = `${API_URL}secrets/42`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
