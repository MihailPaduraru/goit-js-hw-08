import Player from "@vimeo/player";
import throttle from "lodash.throttle";

// Selectați elementul iframe
const iframe = document.querySelector("#vimeo-player");

// Inițializați player-ul Vimeo
const player = new Player(iframe);

// Definiți o funcție pentru a salva timpul curent de redare în spațiul de stocare local
function saveCurrentTime(time) {
  localStorage.setItem("videoplayer-current-time", time);
}

// Actualizați spațiul de stocare local nu mai mult de o dată pe secundă folosind lodash.throttle
const throttledSaveTime = throttle(saveCurrentTime, 1000);

// Ascultați evenimentul timeupdate pentru a urmări timpul de redare
player.on("timeupdate", (event) => {
  const currentTime = event.seconds;
  throttledSaveTime(currentTime);
});

// Verificați dacă există un timp de redare salvat în spațiul de stocare local și setați-l ca timpul curent al videoclipului
const savedTime = localStorage.getItem("videoplayer-current-time");
if (savedTime) {
  player.setCurrentTime(savedTime);
}
