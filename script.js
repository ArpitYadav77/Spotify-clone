// Selecting elements
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".curr-time");
const totalTime = document.querySelector(".tot-time");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const audio = new Audio(); // Audio element
const songTitle = document.querySelector(".song-title");

// Sample songs list
const songs = [
  {
    title: "Top 50 - Global",
    src: "assets/song1.mp3",
  },
  {
    title: "Trending Now",
    src: "assets/song2.mp3",
  },
  {
    title: "Featured Charts",
    src: "assets/song3.mp3",
  },
];

let currentSongIndex = 0;

// Function to load a song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
}

// Play/Pause Function
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    audio.pause();
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currTime.textContent = formatTime(audio.currentTime);
});

// Change song position
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Load the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Load the previous song
function prevSong() {
  currentSongIndex =
    currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Format time function
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Event Listeners
playPauseBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Load first song on page load
loadSong(currentSongIndex);


// Selecting volume elements
const volumeControl = document.getElementById("volume-control");
const muteBtn = document.getElementById("mute-btn");

// Set initial volume
audio.volume = 0.5;
volumeControl.value = audio.volume;

// Update volume when slider changes
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
  updateVolumeIcon(audio.volume);
});

// Toggle mute on button click
muteBtn.addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeControl.value = 0;
  } else {
    audio.volume = 0.5;
    volumeControl.value = 0.5;
  }
  updateVolumeIcon(audio.volume);
});

// Update volume icon
function updateVolumeIcon(volume) {
  if (volume == 0) {
    muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`; // Muted icon
  } else if (volume < 0.5) {
    muteBtn.innerHTML = `<i class="fa-solid fa-volume-low"></i>`; // Low volume icon
  } else {
    muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`; // High volume icon
  }
}
