import express from "express";

const app = express();
const port = 3000;

var dayName = "";
var dayWork = "";

function getDayActivity(req, res, next) {
  const d = new Date();
  let day = d.getDay();

  if (day === 0 || day === 6) {
    dayName = "the weekend";
    dayWork = "have fun";
  } else {
    dayName = "a weekday";
    dayWork = "work hard";
  }

  next();
}

app.use(getDayActivity);

app.get("/", (req, res) => {
  console.log(dayName);
  console.log(dayWork);
  res.render("index.ejs", {
    dayName: dayName,
    dayWork: dayWork,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
