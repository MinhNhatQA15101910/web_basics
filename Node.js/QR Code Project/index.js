import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL",
    },
  ])
  .then((answers) => {
    // Save URL to URL.txt
    fs.writeFile("URL.txt", answers.URL, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

    // Convert URL to QR image
    var qr_svg = qr.image(answers.URL, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("qr_image.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something went wrong");
    }
  });
