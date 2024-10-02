let song = {
    status: true,
    data: {
        artist: "Westlife",
        songTitle: "I Have A Dream",
        songLyrics: "I have a dream, a song to sing\nTo help me cope with anything\nIf you see the wonder (wonder) of a fairy tale\nYou can take the future even if you fail"
    }
}

const artist = document.querySelector(".artist")
artist.innerText = song.data.artist

const title = document.querySelector(".title")
title.innerText = song.data.songTitle

const lyrics = document.querySelector(".lyrics")
lyrics.innerText = song.data.songLyrics

const count = document.querySelector(".count")
count.innerText = song.data.songLyrics.split(" ").length + song.data.songLyrics.split("\n").length - 1