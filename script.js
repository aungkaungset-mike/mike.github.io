const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

const songs = [
    {
        imageName: 'Twice (7)',
        audioname: 'TWICE _Alcohol-Free_ M_V(MP3_320K)',
        displayName: 'Alcohol Free',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (3)',
        audioname: 'TWICE _CRY FOR ME_ Choreography - 2(MP3_320K)',
        displayName: 'CRY FOR ME',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (2)',
        audioname: 'TWICE _MORE _ MORE_ M_V(MP3_320K)',
        displayName: 'MORE & MORE',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (4)',
        audioname: 'TWICE _LIKEY_ M_V(MP3_320K)',
        displayName: 'LIKEY LIKEY',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (5)',
        audioname: 'TWICE _SIGNAL_ M_V(MP3_320K)',
        displayName: 'SIGNAL',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (6)',
        audioname: 'TWICE _TT_ M_V(MP3_320K)',
        displayName: 'TT',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (7)',
        audioname: 'TWICE _YES or YES_ M_V(MP3_320K)',
        displayName: 'YES or YES',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (8)',
        audioname: 'TWICE _Feel Special_ M_V(MP3_320K)',
        displayName: 'Feel Special',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (9)',
        audioname: 'TWICE _I CAN_T STOP ME_ M_V(MP3_320K)',
        displayName: 'I CANT STOP ME',
        artist: 'TWICE',
    },
    {
        imageName: 'Twice (10)',
        audioname: 'TWICE _What is Love__ M_V(MP3_320K)',
        displayName: 'What is Love',
        artist: 'TWICE',
    },
]

let isPLaying = false;

function PlaySong()
{
    isPLaying = true;
    playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function PauseSong()
{
    isPLaying = false;
    playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

playButton.addEventListener ('click', () => (isPLaying ? PauseSong() : PlaySong()));

function LoadSong(song)
{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.audioname}.mp3`;
    image.src = `img/${song.imageName}.jpg`;
}

let songIndex = 0;


prevButton.addEventListener ('click', PrevSong);
nextButton.addEventListener ('click', NextSong);

function PrevSong()
{
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = songs.length -1;
    }
    LoadSong(songs[songIndex]);
    PlaySong();
}

function NextSong()
{
    songIndex++;
    if(songIndex > songs.length -1)
    {
        songIndex = 0;
    }
    LoadSong(songs[songIndex]);
    PlaySong();
}

music.addEventListener ('timeupdate', UpdateProgressBar);
progressContainer.addEventListener ('click', SetProgressBar);
music.addEventListener ('ended', NextSong);

function UpdateProgressBar(e)
{
    if(isPLaying)
    {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10)
        {
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds)
        {
            durationEl.textContent =`${durationMinutes}: ${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10)
        {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent =`${currentMinutes}: ${currentSeconds}`;
        
    }
}

function SetProgressBar(e)
{
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}


