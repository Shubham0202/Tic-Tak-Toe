const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const matchResult = document.querySelector('.match-result');
const playBoxes = document.querySelectorAll('.play-box');
const playerName = document.querySelectorAll('.player-nm');
const startMatch = document.querySelector('.start-match');

const startBtn = document.querySelector('.start-btn');


//
function display_Start_Tie_Retry_Msg(){
    const Intreval = setTimeout(() => {
        startMatch.classList.remove('disp-none');
    }, 500);
}

startBtn.addEventListener('click', () => {
    startGame();
    choosePlayer();
    startMatch.classList.add('disp-none');
});
//main logic and functions of the game
//function for which player is turn to play 
function choosePlayer() {
    if (player1.classList.contains('active-player'))
        matchResult.innerHTML = playerName[0].innerHTML + ' Turn';
    else
        matchResult.innerHTML = playerName[1].innerHTML + ' Turn';
}

//function for adding sign O/X in play box
function addSign(index) {
    if (player1.classList.contains('active-player')) {
        //check playbox empty or not
        playBoxes[index].innerHTML = '<span class="span-x">X</span>';
        player1.classList.remove('active-player');
    }
    else {
        playBoxes[index].innerHTML = '<span class="span-o">O</span>';
        player2.classList.remove('active-player');
    }
}
//even or odd logic 
//function for assign the player turn
let flag = 0;
function startGame() {
    if (flag % 2 == 0) {
        player1.classList.add('active-player');
    }
    else {
        player2.classList.add('active-player');
    }
    flag++;
}

function restartGame() {
    const retry = document.querySelector('.refresh');
    retry.addEventListener('click', () => {
        playBoxes.forEach(e => {
            e.innerHTML = "";
        });
        flag=0;
        player1.classList.add('active-player');
        player2.classList.remove('active-player');
        startMatch.classList.add('disp-none');
        startGame();
        choosePlayer();
    });
}

//who win the match function
//possible outcomes to win
// [0,1,2];
// [3,4,5];
// [6,7,8];
// [0,3,6];
// [1,4,7];
// [2,5,8];
// [0,4,8];
// [2,4,6];
function whoWinMatch() {
    if (
        (playBoxes[0].innerHTML.match('X') && playBoxes[1].innerHTML.match('X') && playBoxes[2].innerHTML.match('X')) ||
        (playBoxes[3].innerHTML.match('X') && playBoxes[4].innerHTML.match('X') && playBoxes[5].innerHTML.match('X')) ||
        (playBoxes[6].innerHTML.match('X') && playBoxes[7].innerHTML.match('X') && playBoxes[8].innerHTML.match('X')) ||
        (playBoxes[0].innerHTML.match('X') && playBoxes[3].innerHTML.match('X') && playBoxes[6].innerHTML.match('X')) ||
        (playBoxes[1].innerHTML.match('X') && playBoxes[4].innerHTML.match('X') && playBoxes[7].innerHTML.match('X')) ||
        (playBoxes[2].innerHTML.match('X') && playBoxes[5].innerHTML.match('X') && playBoxes[8].innerHTML.match('X')) ||
        (playBoxes[0].innerHTML.match('X') && playBoxes[4].innerHTML.match('X') && playBoxes[8].innerHTML.match('X')) ||
        (playBoxes[2].innerHTML.match('X') && playBoxes[4].innerHTML.match('X') && playBoxes[6].innerHTML.match('X'))
    ) {
        matchResult.innerHTML = "Player 1 Win";
        //update start-match content to refresh
        startMatch.innerHTML = `  <div class="win-msg">
        congratulations `+ playerName[0].innerHTML + ` you win this match
        <span class="material-symbols-rounded star">star</span>
        <div class="refresh">
            <span class="material-symbols-rounded ref-icon">refresh</span>
        </div>
    </div> `;

        //show start match div 
        // playBoxes.forEach(e=>{e.removeEventListener('click',playBoxFunction)});
       display_Start_Tie_Retry_Msg();
        restartGame();
    }
    else if (
        (playBoxes[0].innerHTML.match('O') && playBoxes[1].innerHTML.match('O') && playBoxes[2].innerHTML.match('O')) ||
        (playBoxes[3].innerHTML.match('O') && playBoxes[4].innerHTML.match('O') && playBoxes[5].innerHTML.match('O')) ||
        (playBoxes[6].innerHTML.match('O') && playBoxes[7].innerHTML.match('O') && playBoxes[8].innerHTML.match('O')) ||
        (playBoxes[0].innerHTML.match('O') && playBoxes[3].innerHTML.match('O') && playBoxes[6].innerHTML.match('O')) ||
        (playBoxes[1].innerHTML.match('O') && playBoxes[4].innerHTML.match('O') && playBoxes[7].innerHTML.match('O')) ||
        (playBoxes[2].innerHTML.match('O') && playBoxes[5].innerHTML.match('O') && playBoxes[8].innerHTML.match('O')) ||
        (playBoxes[0].innerHTML.match('O') && playBoxes[4].innerHTML.match('O') && playBoxes[8].innerHTML.match('O')) ||
        (playBoxes[2].innerHTML.match('O') && playBoxes[4].innerHTML.match('O') && playBoxes[6].innerHTML.match('O'))
    ) {
        matchResult.innerHTML = "Player 2 Win";
        //update start-match content to refresh
        startMatch.innerHTML = `  <div class="win-msg">
        congratulations `+ playerName[1].innerHTML + ` you win this match
        <span class="material-symbols-rounded star">star</span>
        <div class="refresh">
            <span class="material-symbols-rounded ref-icon">refresh</span>
        </div>
    </div> `;
    //thow error because it is not global function
    // playBoxes.forEach(e=>{e.removeEventListener('click',playBoxFunction)});
        
    //show start match div 
        display_Start_Tie_Retry_Msg();
        restartGame();
    }
}

playBoxes.forEach((playBox, index) => {
    playBox.addEventListener('click', function playBoxFunction()
    {
        if (playBoxes[index].childElementCount == 0) //this if is avoiding for double clicking on same box
        {
            addSign(index); //adding sign and removing active-player class
            startGame(); // adding active-player class
            choosePlayer();//display msg to player turn
            whoWinMatch();
            console.log(flag)
            if (flag == 10) {
                matchResult.innerHTML = "Tie Match";
                startMatch.innerHTML = `  <div class="win-msg">
                    Tie Match
                <span class="material-symbols-rounded star">star</span>
                <div class="refresh">
                    <span class="material-symbols-rounded ref-icon">refresh</span>
                </div>
            </div> `;
                display_Start_Tie_Retry_Msg();
                restartGame();
            }
        }
        // window.globalFunction = playBoxFunction;
    });
});

    //declaring palybox as global function