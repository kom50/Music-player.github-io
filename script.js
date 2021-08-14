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



// Add Timer 
window.onload = () => {
    //
    load();

    let audio = document.querySelector('audio')
    let files = document.getElementById('audio')

    let next = document.querySelector('.next');
    let previous = document.querySelector('.previous');
    let play = document.querySelector('.play');
    let backward = document.querySelector('.backward');
    let forward = document.querySelector('.forward');

    let songName = document.querySelector('#song-name');

    let shuffle =document.querySelector('.shuffle')
    let repeat =document.querySelector('.repeat')

    let playListBtn =document.querySelector('#play-list')
    console.log(playListBtn)

    // progress
    let progress = document.querySelector('.progress')
    let duration_label = document.querySelector('.duration')
    let currentTime_label = document.querySelector('.currentTime')
    console.log(progress);
    // 
    let firstPage = document.querySelector('.inner-container:nth-child(2)');
    let songListPage = document.querySelector('.song-list-page');
    let songList = document.querySelector('.songs-list');

    //  animation
    let roundCircle = document.querySelector('.round-circle');
   

    let audioFiles = [],
        currentSongNo = 0,
        totalSongs, songsName = [];

    files.oninput = function (event) {
        let files = event.target.files;
        totalSongs = files.length;
        console.log('files')
        console.log(files)
        console.log(event.target.files)

        for (i = 0; i < totalSongs; i++) {
            audioFiles[i] = URL.createObjectURL(files[i])
            songsName[i] = files[i].name;
        }

        addMusicSrc(0);

        // audio.src = audioFiles[0];
        // songName.textContent = songsName[0]


        // console.log(audioFiles)
        // console.log(songsName)
        // console.log("audio")
        // console.log(audio)
        // console.log(audio.duration)
    }

    /* audio.onplaying = function (event) {
        console.log('playing start')
        console.log('duration ', event)
        console.log('duration ', event.target.duration)
        console.log('currentTime ', event.target.currentTime)

        // audio.currentTime += 1;
        duration =  convertElapsedTime(event.target.duration);
        currentTime =  convertElapsedTime(event.target.currentTime);
        
        console.log("duration ", duration)
        console.log('currentTime ', currentTime)
    } */
 

    let isPlay = true;
    let method = '';
    play.onclick = function (event) {
        if (isPlay) {
            play.src = 'images/play.png'
            method = 'pause'
            play.style.backgroundColor =  'rgb(245, 200, 235)'
        } else {
            play.src = 'images/pause.png'
            play.style.backgroundColor =  '#fff'
            method = 'play'
        }
        isPlay = !isPlay;
        audio[method]() // standard 
    }

   

    previous.onclick = function (event) {
        if(isRepeat){
            repeat_fun();
        }else if(isShuffle){
            shuffle_fun();
        }else{
            if (currentSongNo == 0) {
                currentSongNo = totalSongs - 1;
            } else {
                currentSongNo--;
            }
            // console.log(currentSongNo);
            addMusicSrc(currentSongNo);
            // audio.src = audioFiles[currentSongNo];
            // songName.textContent = songsName[currentSongNo]
       }
    }

    function addMusicSrc(currentSongNo){
        audio.src = audioFiles[currentSongNo];
        songName.textContent = songsName[currentSongNo]
    }

    next.onclick = function (event) {
        if(isRepeat){
            repeat_fun();
        }else if(isShuffle){
            shuffle_fun();
        }else{
            if (currentSongNo == totalSongs - 1) {
                currentSongNo = 0;
            } else {
                currentSongNo++;
            }
            // console.log(currentSongNo);
            addMusicSrc(currentSongNo);
        }
    }

    audio.onpause = function(event){
        console.log('onpause event')
        if(isBackwardBtnPressed){
            event.target.currentTime -= 5;
            isBackwardBtnPressed = false;
            audio.play();          
        }
        if(isForwardBtnPressed){
            isForwardBtnPressed = false;
            event.target.currentTime += 5;

            audio.play();          
        }
    }

    let isBackwardBtnPressed = false;
    backward.addEventListener('click', (event)=>{
        isBackwardBtnPressed = true; //!isBackBtnPressed;
        audio.pause();
    })
    let isForwardBtnPressed = false;
    forward.addEventListener('click', (event)=>{
        isForwardBtnPressed = true;
        audio.pause();
        // isForwardBtnPressed = !isForwardBtnPressed;

    })
    let isShuffle = false;
    shuffle.addEventListener('click', (event) => {
        shuffle.style.backgroundColor = !isShuffle ? 'rgb(245, 200, 235)' : '#fff';
        isShuffle = !isShuffle;
        shuffle_fun();
        
    })

    function shuffle_fun(){
        rand = Math.round(Math.random() * (totalSongs - 1));
        console.log(rand);
        currentSongNo = rand;
        
        addMusicSrc(currentSongNo);
        // audio.src = audioFiles[currentSongNo];
        // songName.textContent = songsName[currentSongNo]
    }

    let isRepeat = false;
    repeat.addEventListener('click', (event) => {
// 'rgb(245, 200, 235)'  'rgb(1, 200, 235)'
        repeat.style.backgroundColor = !isRepeat ? 'rgb(245, 200, 235)' : '#fff';
        isRepeat = !isRepeat;
        repeat_fun();
    })

    function repeat_fun(){
        currentSongNo = currentSongNo;
        console.log(currentSongNo);
        // currentSongNo = currentSongNo;
       
        addMusicSrc(currentSongNo);
        // audio.src = audioFiles[currentSongNo];
        // songName.textContent = songsName[currentSongNo]
    }

    function songsList(){
        songList.innerHTML = '' // 
        songsName.forEach((songName, index) =>{
            song = document.createElement('div');
            song.className = 'song';
            song.id = index;
            song.innerHTML = `${index + 1}.   ${songName}`;
            
            song.addEventListener('click',(event) =>{
                console.log('song  clicked', event.target.id)
                currentSongNo = event.target.id;
                
                addMusicSrc(currentSongNo);
                // audio.src = audioFiles[currentSongNo];
                // songName.textContent = songsName[currentSongNo]
                event.stopPropagation();
            })
            songList.appendChild(song);
        })
    }
    // When double clicked on songListPage then show first page
    let count = 0;
    songListPage.addEventListener('click', (event)=>{
         count += 1;
         setTimeout(()=>{
            count = 0;
         }, 2000)
         if(count == 2){
             firstPage.style.display = 'flex'
             songListPage.style.display = 'none'
         }
        //  console.log('target', event.target)
        //  console.log('currentTarget', event.currentTarget)
    }, false)

    playListBtn.onclick = (event) => {
        songsList()
        firstPage.style.display = 'none'
        songListPage.style.display = 'flex'
    }


    //when music end then next music is auto play
    audio.addEventListener('ended', (event) => {
        console.log('Ended ', event.target)
        currentSongNo ++;
        if(currentSongNo === totalSongs){
            currentSongNo = 0;
        }
        
        addMusicSrc(currentSongNo);
        // audio.src = audioFiles[currentSongNo];
        // songName.textContent = songsName[currentSongNo]
        console.log('currentSongNo', currentSongNo)

    })

    let duration,
    currentTime ;
    audio.ontimeupdate = function (event) {
        // console.log('currentSongNo', currentSongNo, totalSongs)
        // console.log('duration ', event)
        // console.log('duration ', event.target.duration)
        // console.log('currentTime ', event.target.currentTime)
        duration =  convertElapsedTime(event.target.duration);
        currentTime =  convertElapsedTime(event.target.currentTime);
        
        duration_label.textContent = duration;
        currentTime_label.textContent = currentTime;

        // console.clear()
        // console.log("duration ", duration)
        // console.log('currentTime ', currentTime)

        // progress bar
        increment = 10/event.target.duration;
        percent = Math.min(increment * audio.currentTime * 10, 100);
        progress.style.width = percent+'%'

    }

    function convertElapsedTime(inputSeconds){
        let seconds = Math.floor(inputSeconds % 60);
        if(seconds < 10)
         seconds = '0' + seconds;

        let minutes = Math.floor(inputSeconds / 60)
        return  minutes + ":"+seconds;
    }


    // left menu
    leftMenuBtn = document.querySelector('.icon');
    leftPanel = document.querySelector('.left-panel');
    icon =leftMenuBtn.firstElementChild;
    console.log(icon)

    let isOpen = false;
    leftMenuBtn.addEventListener('click', (event)=>{
        isOpen = !isOpen;
        isOpen ? set_fun(80, 81, 'images/back.png') : set_fun(0, 0, 'images/open.png');

        /* if(isOpen){
            icon.src = 'images/back.png';
            leftPanel.style.width = '80%'
            leftMenuBtn.style.left = '80%'

        }else{
            icon.src = 'images/open.png';
            leftPanel.style.width = '0'
            leftMenuBtn.style.left = '0'
        } */

        function set_fun(width, left, src){
            leftPanel.style.width = width + '%'
            leftMenuBtn.style.left = left + '%'
            icon.src = src;
        }
    })

    //When left panel is open then we click on main page then left panel is closed
    firstPage.addEventListener('click', (event)=>{
        /* icon.src = 'images/open.png';
        leftPanel.style.width = '0'
        leftMenuBtn.style.left = '0' */
    })

}  // window.onload() method

/* 
   document.getElementById("progress");
  increment = 10/duration
  percent = Math.min(increment * element.currentTime * 10, 100);
  progress.style.width = percent+'%'

*/

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