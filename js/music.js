
// fetching require details from html page
const image = document.querySelector(".img-div img");  // fetching img from img-div 
const songname = document.querySelector(".img-div-down h1");  // fetching h1 from img-div-down
const artist =  document.querySelector(".img-div-down h3");    // fetching h3 from img-div-down
const playmusic = document.querySelector(".fa-play"); // play and pause icon
const audio = document.querySelector("#audio");   // audio
const progressarea =  document.querySelector(".progress-area") //progress area
const progressbar = document.querySelector(".progress-bar"); 
const content  = document.querySelector(".content");
const prevbutton = document.querySelector(".fa-step-backward");
const nextbutton = document.querySelector(".fa-step-forward");
const mute = document.querySelector(".fa-volume-up");
const reload = document.querySelector(".fa-redo-alt");
const bgimg = document.querySelector(".img img");
const audiovolume = document.getElementById("range");
const shuffle = document.querySelector(".fa-random");


// taking array index 0  and storing into a varable
let musicindex = 0;
// on page load
window.addEventListener("load", () => {
    loadsong(musicindex);
});

function loadsong(num) {
        songname.innerText = playlist[num].name;
        artist.innerText = playlist[num].artist;
        image.src= `imgs/${playlist[num].img}.jpg`;
        audio.src = `songs/${playlist[num].src}.mp3`;
        bgimg.src = `imgs/${playlist[num].img}.jpg`;
}

// assign click atteribute to play-pause button
playmusic.addEventListener("click", function() {
    const paused = content.classList.contains("paused");
    paused ? pausesong() : playsong();
   
});
  
// play song
function playsong() {
          content.classList.add("paused");
          playmusic.classList.add("fa-pause"); // we are changing an icon of play to pause by removing below
          playmusic.classList.remove("fa-play");
        //   console.log(playmusic.classList);
          audio.play();
}

// pause song
function pausesong() {
          content.classList.remove("paused");
         playmusic.classList.add("fa-play");  // we are changing an icon of pause to play by removing down
         playmusic.classList.remove("fa-pause");
          audio.pause();
}

// updating time on song play
audio.addEventListener("timeupdate", (e)=>{
        const currentTime = e.target.currentTime;   //getting playing song currentTime
        const duration = e.target.duration;  //getting playing song total duration
        let progressWidth = (currentTime / duration) * 100;
        progressbar.style.width = `${progressWidth}%`; // increses the progress bar width depend on song play

let musicCurrentTime = document.querySelector(".current-time");
let musicDuartion = document.querySelector(".max-duration");
audio.addEventListener("loadeddata", ()=>{
// update song total duration
        let mainAdDuration = audio.duration;  // getting audion duration time
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
        }
musicDuartion.innerText = `${totalMin}:${totalSec}`;
});

// update playing song current time
let currentMin = Math.floor(currentTime / 60);
let currentSec = Math.floor(currentTime % 60);
if(currentSec < 10){ //if sec is less than 10 then add 0 before it
currentSec = `0${currentSec}`;
}
musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// assign click attribute to next button icon
nextbutton.addEventListener("click", () => {
    nextmusic(); //onclick next icon button nextmusic function will  call
});

function nextmusic() {
     musicindex++;  // increasing array index by 1 onclick of next button icon
    //  musicindex > playlist.length  ?  musicindex = 0 : musicindex = musicindex;  
    if(musicindex >= playlist.length) {  
        musicindex = 0;    // if array length is greater than the stored length of array index set to 0
    } else {
        musicindex = musicindex;      // not greater than array length than play current song
    }
     loadsong(musicindex);
     playsong();  // calling playsong function  to play song after next button icon is clicked
}


// assign click attribute to prev button icon
prevbutton.addEventListener("click", () => {
    prevmusic();   //onclick nprev icon button prevmusic function will  call
});

function prevmusic() {
    musicindex--;   // decreasing array index by 1 onclick of next button icon
    //  musicindex < 0 ?  musicindex = playlist.length : musicindex = musicindex;
    if(musicindex < 0) {
        musicindex = playlist.length;   // if array length is less than 0 than the stored length of array index set to last index
    } else {
        musicindex = musicindex;
    }
    loadsong(musicindex);
     playsong();    // calling playsong function  to play song after prev button icon is clicked
}


// move pregress bar when we click on that
progressarea.addEventListener("click",(e) => {
    let progresswidth = progressarea.clientWidth;  // getting progress bar width
    let offsetx = e.offsetX;
    let songduration = audio.duration;  // getting song duration time
    audio.currentTime = (offsetx / progresswidth) * songduration;
});


//muting the song on click
mute.addEventListener("click", () => {
    const muted = content.classList.contains("mute");  // check that content class as a class of mute
          muted ? unmutesong() : mutesong();  // its same as if function... if mute class there than unmutesong function is called if mute class not there mutesong function will called
      
});


//muting the song
function mutesong() {
    content.classList.add("mute");
    mute.classList.add("fa-volume-mute"); // changing icon on mute
    mute.classList.remove("fa-volume-up");
    audio.muted = true;  // we will  set audio  element muted true
    audiovolume.value = 0;         
}

//unmute the song by  setting audio element muted to false
function unmutesong() {
    content.classList.remove("mute");
    mute.classList.remove("fa-volume-mute");
    mute.classList.add("fa-volume-up");
    audio.muted = false;
    audiovolume.value = 99;   
}

// replay the song on click of replay icon
reload.addEventListener("click", () => {
    audio.load();  // load function will set  current song to play from frst
    progressbar.style.width = '0%';  
    playsong();
});

// after song ended we will call next music function to increase array index by 1
audio.addEventListener("ended", () => {
    nextmusic();
});

// playlist display
const section = document.querySelector(".section");
// setting for loop to loop to full array
for(let i=0; i<playlist.length; i++) {
  let divtags = `<div>
                   <img src="imgs/${playlist[i].img}.jpg">
                  <h3>${playlist[i].name}</h3>
                  <p>${playlist[i].artist}</p>
                  <audio src="songs/${playlist[i].src}.mp3"></audio>
                  <div class="div"><i class="fas fa-play-circle" div-index=${i} title="play"></i></div>
                </div>`;
    section.insertAdjacentHTML("beforeend", divtags);  // we will nest the divtags inside of div section class before it ends
}

//we set play song on click of song list
const alldivtags = document.querySelectorAll(".div i");
// another for loop for setting onclick attribute to play icon
for(let j=0;j<playlist.length;j++) {
    alldivtags[j].setAttribute("onclick", "clicked(this)");

}
// clicking on icon... that song will be played
function clicked(element) {
    let divindex = element.getAttribute("div-index");
    musicindex = divindex;
    loadsong(musicindex);
    playsong();
   
}

// volume change on change of range
audiovolume.setAttribute("onchange","changefun()");
function changefun() {
    const trackvolume = audiovolume.value;
    // console.log(trackvolume);
    audio.volume = trackvolume / 100;
    if(trackvolume == 0) {
        mute.classList.add("fa-volume-mute"); // changing icon on mute
        mute.classList.remove("fa-volume-up");
    } else {
        mute.classList.remove("fa-volume-mute"); // changing icon on mute
        mute.classList.add("fa-volume-up");
    }
}

shuffle.addEventListener("click", () => {
    musicindex = Math.floor(Math.random() * playlist.length);
    loadsong(musicindex);
    playsong();
})


window.onscroll = function() {
    scrolltop();
}
 
// const playcontent = document.querySelector(".img-div-down");
const sectionhead = document.querySelector(".section-head");
const sticky = progressarea.offsetTop;
function scrolltop() {
    if(window.pageYOffset >= sticky) {
        section.classList.add("section-anime");
    } else  {
        section.classList.remove("section-anime");
    }

}


