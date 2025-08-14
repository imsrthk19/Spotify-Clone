console.log("Welcome to Spotify");

// Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let volumeBar = document.getElementById('volumeBar');

let songs = [
    { songName: "Sapphire - (ft.Arijit Singh)", filePath: "songs/1.mp3", coverPath: "Sapphire-English-2025-20250623223610-500x500 cover.jpg" },
    { songName: "Apna Bana Le", filePath: "songs/2.mp3", coverPath: "ApnaBanaLe.jpg" },
    { songName: "Dhun", filePath: "songs/3.mp3", coverPath: "Dhun.jpg" },
    { songName: "Tum Hi Ho", filePath: "songs/4.mp3", coverPath: "tumhiho.jpg" },
    { songName: "Qayde Se", filePath: "songs/5.mp3", coverPath: "metroindino.jpg" },
    { songName: "Kesariya", filePath: "songs/6.mp3", coverPath: "Kesariya.jpg" },
    { songName: "Chaleya", filePath: "songs/7.mp3", coverPath: "chaleya.jpg" },
    { songName: "Soulmate", filePath: "songs/8.mp3", coverPath: "soulmate.jpg" },
    { songName: "Khairiyat (Happy)", filePath: "songs/9.mp3", coverPath: "Khairiyat(happy).jpg" },
    { songName: "Zamaana Lage", filePath: "songs/10.mp3", coverPath: "metroindino.jpg" }
];

// Update song list covers and names
Array.from(document.getElementsByClassName('songItem')).forEach((el, i) => {
    el.getElementsByTagName('img')[0].src = songs[i].coverPath;
    el.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Play selected song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updatePlayButtons();
}

// Update small play buttons
function updatePlayButtons() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
        el.classList.add('fa-play-circle');
        el.classList.remove('fa-pause-circle');
    });
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
}

// Master play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        updatePlayButtons();
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

// Seek
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Song item click
Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
    el.addEventListener('click', e => {
        let idx = parseInt(e.target.id);
        if (songIndex === idx && !audioElement.paused) {
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            updatePlayButtons();
        } else {
            playSong(idx);
        }
    });
});

// Next & Previous
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Autoplay next
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Volume control
volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value / 100;
});
