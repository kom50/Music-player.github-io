const load = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let doc = document.querySelector('.container');
    Object.assign(doc.style, {
        'width': (width - 12) + 'px',
        'height': (height) + 'px',
        'marginLeft': '6px',
        'justify-content': 'center',
    })
}
window.addEventListener('resize', load);

// Add Timer  next update

window.onload = () => {
    //
    load();
    let audio = document.querySelector('audio')
    let inputFile = document.getElementById('audio')

    let next = document.querySelector('.next');
    let previous = document.querySelector('.previous');
    let play = document.querySelector('.play');
    let backward = document.querySelector('.backward');
    let forward = document.querySelector('.forward');
    let shuffle = document.querySelector('.shuffle')
    let repeat = document.querySelector('.repeat')

    let songName = document.querySelector('#song-name');
    let playListBtn = document.querySelector('#play-list')

    // progress
    let progress = document.querySelector('.progress')
    let duration_label = document.querySelector('.duration')
    let currentTime_label = document.querySelector('.currentTime')

    // 
    let firstPage = document.querySelector('.inner-container:nth-child(2)');
    let songListPage = document.querySelector('.song-list-page');
    let songList = document.querySelector('.songs-list');

    let audioFiles = [],
        currentSongNo = 1,
        totalSongs, songsName = [];

    function addAudioSrc(curSongNo) {
        audio.src = audioFiles[curSongNo];
        songName.textContent = songsName[curSongNo]
    }

    inputFile.oninput = function (event) {
        let files = event.target.files;
        totalSongs = files.length;

        for (i = 0; i < totalSongs; i++) {
            audioFiles[i] = URL.createObjectURL(files[i])
            songsName[i] = files[i].name;
        }
        addAudioSrc(0);
    }

    let isPlay = true;
    play.onclick = function (event) {
        isPlay ? set_fun('images/play.png', 'pause', 'rgb(245, 200, 235)') : set_fun('images/pause.png', 'play', '#fff')
        isPlay = !isPlay;

        function set_fun(src, method, bgColor) {
            play.src = src;
            play.style.backgroundColor = bgColor;
            audio[method]() // call method
        }
    }

    previous.onclick = function (event) {
        if (isRepeat) {
            repeat_fun();
        } else if (isShuffle) {
            shuffle_fun();
        } else {
            if (currentSongNo == 0) {
                currentSongNo = totalSongs - 1;
            } else {
                currentSongNo--;
            }
            addAudioSrc(currentSongNo);
        }
    }

    next.onclick = function (event) {
        if (isRepeat) {
            repeat_fun();
        } else if (isShuffle) {
            shuffle_fun();
        } else {
            if (currentSongNo == totalSongs - 1) {
                currentSongNo = 0;
            } else {
                currentSongNo++;
            }
            addAudioSrc(currentSongNo);

            /* console.log(--currentSongNo % totalSongs);
            if (currentSongNo == 0)
                currentSongNo = totalSongs;
                 console.log(currentSongNo++ % totalSongs);
                if (currentSongNo == totalSongs)
                currentSongNo = 0; 
            */
        }
    }

    let isBackwardBtnPressed = false;
    backward.addEventListener('click', (event) => {
        isBackwardBtnPressed = true;
        audio.pause();
    })
    let isForwardBtnPressed = false;
    forward.addEventListener('click', (event) => {
        isForwardBtnPressed = true;
        audio.pause();
    })

    let isShuffle = false;
    shuffle.addEventListener('click', (event) => {
        shuffle.style.backgroundColor = !isShuffle ? 'rgb(245, 200, 235)' : '#fff';
        isShuffle = !isShuffle;
        shuffle_fun();
    })

    function shuffle_fun() {
        rand = Math.round(Math.random() * (totalSongs - 1));
        currentSongNo = rand;

        addAudioSrc(currentSongNo);
    }

    let isRepeat = false;
    repeat.addEventListener('click', (event) => {
        // 'rgb(245, 200, 235)'  'rgb(1, 200, 235)'
        repeat.style.backgroundColor = !isRepeat ? 'rgb(245, 200, 235)' : '#fff';
        isRepeat = !isRepeat;
        repeat_fun();
    })

    function repeat_fun() {
        addAudioSrc(currentSongNo);
    }

    function songsList() {
        songList.innerHTML = '' // 
        songsName.forEach((songName, index) => {
            song = document.createElement('div');
            song.className = 'song';
            song.id = index;
            song.innerHTML = (index + 1) + '. ' + songName;; /* `${index + 1}.   ${songName}`; */

            song.addEventListener('click', (event) => {
                currentSongNo = event.target.id;
                addAudioSrc(currentSongNo);
                event.stopPropagation();
            })
            songList.appendChild(song);
        })
    }
    // When double clicked on songListPage then show first page
    let count = 0;
    songListPage.addEventListener('click', (event) => {
        count += 1;
        setTimeout(() => {
            count = 0;
        }, 2000)
        if (count == 2) {
            firstPage.style.display = 'flex'
            songListPage.style.display = 'none'
        }
    }, false)

    playListBtn.onclick = (event) => {
        songsList()
        firstPage.style.display = 'none'
        songListPage.style.display = 'flex'
    }

    audio.onpause = function (event) {
        if (isBackwardBtnPressed) {
            event.target.currentTime -= 5;
            isBackwardBtnPressed = false;
            audio.play();
        }
        if (isForwardBtnPressed) {
            isForwardBtnPressed = false;
            event.target.currentTime += 5;
            audio.play();
        }
    }

    //when music end then next music is auto play
    audio.addEventListener('ended', (event) => {
        if (isRepeat) {
            repeat_fun();
        } else if (isShuffle) {
            shuffle_fun();
        } else {
            if (currentSongNo == totalSongs - 1) {
                currentSongNo = 0;
            } else {
                currentSongNo++;
            }
            addAudioSrc(currentSongNo);
        }
    })

    let duration,
        currentTime;
    audio.ontimeupdate = function (event) {
        duration = event.target.duration;
        currentTime = event.target.currentTime;

        duration_label.textContent = convertElapsedTime(duration);
        currentTime_label.textContent = convertElapsedTime(currentTime);

        // progress bar
        increment = 10 / duration;
        percent = Math.min(increment * currentTime * 10, 100);
        progress.style.width = percent + '%'
    }

    function convertElapsedTime(inputSeconds) {
        let seconds = Math.floor(inputSeconds % 60);
        if (seconds < 10)
            seconds = '0' + seconds;

        let minutes = Math.floor(inputSeconds / 60)
        return minutes + ":" + seconds;
    }

    // left menu
    leftMenuBtn = document.querySelector('.icon');
    leftPanel = document.querySelector('.left-panel');
    icon = leftMenuBtn.firstElementChild;

    let isOpen = false;
    leftMenuBtn.addEventListener('click', (event) => {
        isOpen = !isOpen;
        isOpen ? set_fun(80, 81, 'images/back.png') : set_fun(0, 0, 'images/open.png');

        function set_fun(width, left, src) {
            leftPanel.style.width = width + '%'
            leftMenuBtn.style.left = left + '%'
            icon.src = src;
        }
    })

    //When left panel is open then we click on main page then left panel is closed
    firstPage.addEventListener('click', (event) => {
        /* icon.src = 'images/open.png';
        leftPanel.style.width = '0'
        leftMenuBtn.style.left = '0' */
    })

}  // window.onload() method