// console.log("Let's start JavaScript");

// let Btn = document.querySelector("#playSongs");

let currentSong = new Audio();

let songs;


function secondsToMinutesSeconds(seconds) {
    // Ensure the input is a non-negative integer

    // console.log(seconds);

    if (seconds < 0 || isNaN(seconds)) {

        // console.log(seconds);
        // throw new Error('Input must be a non-negative integer.');
        return "00:00";
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds with leading zeros to ensure two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Return the formatted string
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
// console.log(secondsToMinutesSeconds(12));    // Outputs: "00:12"
// console.log(secondsToMinutesSeconds(75));    // Outputs: "01:15"
// console.log(secondsToMinutesSeconds(3600));  // Outputs: "60:00"
// console.log(secondsToMinutesSeconds(12345)); // Outputs: "205:45"





async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/Songs");
    let response = await a.text();
    // console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(as);

    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        // console.log(element);
        if (element.href.endsWith(".mp3")) {
            songs.push(element.title.split("/songs/")[0]);
            //    console.log(element.title.split("/songs/")[0]);

        }
    }

    // console.log(songs);


    return songs;


}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track);

    currentSong.src = "/songs/" + track;

    if (!pause) {

        currentSong.play();

        play.src = "pause.svg";

    }



    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    // document.querySelector(".duration").innerHTML = "00:00/00:00";
    
}


async function main() {

    songs = await getSongs();

    playMusic(songs[0], true)

    // console.log(songs);


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for (const song of songs) {
        // console.log(song);

        songUL.innerHTML = songUL.innerHTML + ` <li><img src="musicBtn.svg" alt="" />
                                                       <div class="info">
                                                         <div>${song.replaceAll("%20", " ")}</div>
                                                         <div></div>
                                                       </div>
                                                       <div class="playnow">
                                                         <span>Play Now</span>
                                                         <img src="play.svg" alt="" />
                                                       </div>
                                                     </li>`;

    }


    // var audio = new Audio(songs[1]);
    // Btn.addEventListener("click", () => {
    //     audio.play();
    // });


    // Attach an eventListner to every song


    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {

            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());

        })






    })


    //  Attach an eventListner to play, previous and next song

    play.addEventListener("click", () => {

        if (currentSong.paused) {

            currentSong.play();
            play.src = "pause.svg";

        }

        else {
            currentSong.pause();
            play.src = "play.svg";
        }

    })


    // Listen for timeUpdate event

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime,currentSong.duration);

        document.querySelector(".duration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;

        // console.log(currentSong.currentTime);


        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    })

    // Add EventListner to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })


    // Add event Listener to hamburger

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    // Add event Listener to Close button

    document.querySelector(".closeBtn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })

    // Add Event Listener to previous song

    document.querySelector(".pre").addEventListener("click", () => {
        console.log('previous was clicked');
        // console.log(currentSong);


        let index = songs.indexOf(currentSong.outerHTML.toString().split("/songs/")[1].split('"></audio>')[0])

        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }

        if ((index <= 0)) {
            playMusic(songs[songs.length - 1])
        }

        // let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        // console.log(index);


        // console.log(songs.indexOf(currentSong));

    })


    // Add Event Listener to next song

    document.querySelector(".next").addEventListener("click", () => {
        console.log('next was clicked');


        // let index = songs.indexOf(currentSong)

        let index = songs.indexOf(currentSong.outerHTML.toString().split("/songs/")[1].split('"></audio>')[0])

        if ((index + 1) < songs.length) {

            playMusic(songs[index + 1])

        }


        if ((index + 1) == songs.length) {

            playMusic(songs[0])
        }

        // console.log(songs[0], currentSong.outerHTML.toString().split("/songs/")[1].split('"></audio>')[0]);

        // console.log(songs, index);



        // console.log(songs.indexOf(currentSong));



        // .indexOf(currentSong.src.split("/songs/")[0]))
        // songs.push(element.title.split("/songs/")[0]);

        // let index = songs.indexof(currentSong.src.split("/").slice(-1)[0])


        // console.log(songs, index);
        // if ((index + 1) > length) {

        //     playMusic(songs[index + 1])

        // }

        // let index=songs[0];
        // console.log(currentSong);



    })


}

main();


