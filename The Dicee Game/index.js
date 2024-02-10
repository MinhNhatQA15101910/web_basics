var isFirstLoad = localStorage.getItem("isFirstLoad");

if (!isFirstLoad) {
  localStorage.setItem("isFirstLoad", "true");
} else {
  var dice1Value = Math.floor(Math.random() * 6 + 1);
  var dice2Value = Math.floor(Math.random() * 6 + 1);

  document
    .querySelector(".img1")
    .setAttribute("src", "./images/dice" + dice1Value + ".png");
  document
    .querySelector(".img2")
    .setAttribute("src", "./images/dice" + dice2Value + ".png");

  if (dice1Value > dice2Value) {
    document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
  } else if (dice1Value < dice2Value) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  } else {
    document.querySelector("h1").innerHTML = "Draw!";
  }
}
