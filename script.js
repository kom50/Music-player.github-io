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

window.onload = () => {
    //
    load();

    audio = document.querySelector('audio')
    files = document.getElementById('audio')

    next = document.querySelector('.next');
    previous = document.querySelector('.previous');
    play = document.querySelector('.play');
    songName = document.querySelector('#song-name');

    shuffle = document.querySelector('.shuffle')
    repeat = document.querySelector('.repeat')
    // 
    firstPage = document.querySelector('.inner-container:first-child');
    songListPage = document.querySelector('.song-list-page');
    songList = document.querySelector('.songs-list');

    //  animation
    let roundCircle = document.querySelector('.round-circle');

    let audioFiles = [],
        songNumber = 0,
        totalSongs = 0, songsName = [];

    files.oninput = function (event) {
        let files = event.target.files;
        totalSongs = files.length;

        for (i = 0; i < totalSongs; i++) {
            audioFiles[i] = URL.createObjectURL(files[i])
            songsName[i] = files[i].name;
        }
        audio.src = audioFiles[0];
        songName.textContent = songsName[0]
    }

    let isPlay = true;
    play.onclick = function (event) {
        if (isPlay) {
            isPlay = false;
            play.src = 'photos/play1.png'
            audio.pause()
        } else {
            isPlay = true;
            play.src = 'photos/pause1.png'
            audio.play()
        }
    }

    previous.onclick = function (event) {
        if (songNumber == 0) {
            songNumber = totalSongs - 1;
        } else {
            songNumber--;
        }
        audio.src = audioFiles[songNumber];
        songName.textContent = songsName[songNumber]
    }

    next.onclick = function (event) {
        if (songNumber == totalSongs - 1) {
            songNumber = 0;
        } else {
            songNumber++;
        }
        audio.src = audioFiles[songNumber];
        songName.textContent = songsName[songNumber]
    }

    shuffle.addEventListener('click', (event) => {
        rand = Math.round(Math.random() * (totalSongs - 1));
        songNumber = rand;
        audio.src = audioFiles[songNumber];
        songName.textContent = songsName[songNumber]
    })

    function songsList() {
        songsName.forEach((songName, index) => {
            song = document.createElement('div');
            song.className = 'song';
            song.id = index;
            song.innerHTML = `  ${index + 1}.   ${songName}`;

            song.addEventListener('click', (event) => {
                songNumber = event.target.id;
                audio.src = audioFiles[songNumber];
                songName.textContent = songsName[songNumber]
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
            //  songList.
            firstPage.style.display = 'flex'
            songListPage.style.display = 'none'
        }
    }, false)

    let onces = true;
    roundCircle.onclick = (event) => {
        if (totalSongs != 0) {
            if (onces) {
                songsList()
                ones = false;
            }
            firstPage.style.display = 'none'
            songListPage.style.display = 'flex'
        }
    }
} // window.onload() method













/* const load = () => {
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

window.addEventListener('load', load);
window.addEventListener('resize', load); */