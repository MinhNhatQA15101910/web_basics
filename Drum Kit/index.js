document.querySelectorAll(".drum").forEach((value) => {
  value.addEventListener("click", () => {
    var playedAudio = "./sounds/";

    switch (value.innerHTML) {
      case "w":
        playedAudio += "tom-1.mp3";
        break;
      case "a":
        playedAudio += "tom-2.mp3";
        break;
      case "s":
        playedAudio += "tom-3.mp3";
        break;
      case "d":
        playedAudio += "tom-4.mp3";
        break;
      case "j":
        playedAudio += "snare.mp3";
        break;
      case "k":
        playedAudio += "crash.mp3";
        break;
      case "l":
        playedAudio += "kick-bass.mp3";
        break;
    }

    var audio = new Audio(playedAudio);
    audio.play();
  });
});
