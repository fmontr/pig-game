/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- ALSO if the player rolls 6's on a sequence (gets one 6 and then another one on the next roll) BOTH SCORES are LOST and it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, lastNumber, winningScore;
var diceDOM = document.querySelector('.dice');
var diceDOM2 = document.querySelector('.dice2');
var panel0 = document.querySelector('.player-0-panel');
var panel1 = document.querySelector('.player-1-panel');
var setScoreField = document.querySelector('#setScoreField');

roundScore = [0, 0];
scores = [0, 0];
activePlayer = 0;
lastNumbers = [0, 0];
winningScore = 100;

//roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
	if(scores[0] < winningScore && scores[1] < winningScore) {
		//roll dices
		var dices = rollDices();
		//display dice number
		diceDOM.setAttribute('src', `dice-${dices[0]}.png`);
		diceDOM.style.display = 'block';
		diceDOM2.setAttribute('src', `dice-${dices[1]}.png`);
		diceDOM2.style.display = 'block';
		//six twice loses all points (both scores)
		if(dices.includes(6) && lastNumbers.includes(6)){
			scores[activePlayer] = 0;
			roundScore[activePlayer] = 0;	
			document.querySelector('#score-' + activePlayer).textContent = 0;
			document.querySelector('#current-' + activePlayer).textContent = 0;
			return nextPlayer();
		}
		//display result on score
		if(!dices.includes(1)){
			roundScore[activePlayer] += dices[0];
			roundScore[activePlayer] += dices[1];
			document.querySelector('#current-' + activePlayer).textContent = roundScore[activePlayer];
			lastNumbers = dices;
		} else {
			nextPlayer();
		}
	}
});
//hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(scores[0] < winningScore && scores[1] < winningScore) {
		scores[activePlayer] += roundScore[activePlayer];
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//check if there's a winner
		if(scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'winner!!!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		} else {
			nextPlayer();
		}
	}
});
//new game button
document.querySelector('.btn-new').addEventListener('click', function(){
	newGame();
	setScoreField.value = "";
});

//set score input
setScoreField.addEventListener('input', function() {
	newGame();
	setScoreField.value ? winningScore = setScoreField.value : winningScore = 100;
});


function nextPlayer() {
	roundScore[activePlayer] = 0;
	document.querySelector('#current-' + activePlayer).textContent = 0;
	activePlayer ? activePlayer = 0 : activePlayer = 1;
	panel0.classList.toggle('active');
	panel1.classList.toggle('active');
	lastNumbers = [0, 0];
}

function newGame() {
	scores = [0, 0];
	roundScore = [0, 0];
	document.querySelector('#score-0').textContent = 0;
	document.querySelector('#score-1').textContent = 0;
	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('#name-' + activePlayer).textContent = `player ${activePlayer ? 2 : 1 }`;
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
	diceDOM.style.display = 'none';
	diceDOM2.style.display = 'none';
	activePlayer = 0;
}

function rollDices() {
	var dices = [0, 0];
	while(dices[0] === dices[1]) {
		dices[0] = Math.floor(Math.random() * 6 + 1);
		dices[1] = Math.floor(Math.random() * 6 + 1);
	}
	return dices;
}




