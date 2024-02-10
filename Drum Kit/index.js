document.querySelectorAll(".drum").forEach((value) => {
  value.addEventListener("click", () => {
    playSound(value.innerHTML);
  });
});

document.addEventListener("keydown", (event) => {
  playSound(event.key);
});

function playSound(key) {
  var src = "./sounds/";

  switch (key) {
    case "w":
      src += "tom-1.mp3";
      break;
    case "a":
      src += "tom-2.mp3";
      break;
    case "s":
      src += "tom-3.mp3";
      break;
    case "d":
      src += "tom-4.mp3";
      break;
    case "j":
      src += "snare.mp3";
      break;
    case "k":
      src += "crash.mp3";
      break;
    case "l":
      src += "kick-bass.mp3";
      break;
    default:
      src = "";
  }

  if (src.length !== 0) {
    var audio = new Audio(src);
    audio.play();
  }
}
