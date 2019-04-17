
var scores, roundScore, activePlayer, gamePlaying, lastDice, valueScore;
init();

document.querySelector('.btn-roll').addEventListener('click', function () { //anon function

    if (gamePlaying) {
        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. dysplay result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        //3. update the round score if rolled numbe was NOT 1
//        if(dice===6 && lastDice === 6){
//            //player looses scores
//            scores[activePlayer] = 0;
//            document.querySelector('#score-' + activePlayer).textContent = '0';
//            nextPlayer();
//            
//        }else 
        if (dice !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
        lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        valueScore = document.querySelector('.finalScore').value;
        //check if player won the game
        if (scores[activePlayer] >= valueScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    //next player
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    setTimeout(function () {
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
    }, 500);
}
//init game 
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




























