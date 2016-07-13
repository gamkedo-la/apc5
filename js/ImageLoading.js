var imgBubbleMask = document.createElement("img");
var imgBg = document.createElement("img");
var iconMusicOn = document.createElement("img");
var iconMusicMuted = document.createElement("img");
var iconSoundOn = document.createElement("img");
var iconSoundMuted = document.createElement("img");

imgBubbleMask.src = "images/alpha_bubble_mask.png";
imgBg.src = "images/bg.png";

iconMusicOn.src = "images/icon-music-on.png";
iconMusicMuted.src = "images/icon-music-muted.png";
iconSoundOn.src = "images/icon-sound-on.png";
iconSoundMuted.src = "images/icon-sound-muted.png";

// var plop = new Sound('sound/pop.wav');
var plop = new Sound('sound/pop2.wav');

var music = new Audio('sound/bubbly.mp3');
music.loop = true;
