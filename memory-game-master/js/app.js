
//global variables

 const deck = document.querySelector('.deck');
 let matched = 0; //matched
 const totalPairs = 8;
 document.querySelector('.restart').addEventListener('click', resetGame);
 let moves = 0;
let clockOff= true;
let time = 0;
let clockId;


 function shuffleDeck(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards){
    deck.appendChild(card);
  }
 }
 shuffleDeck();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let taggledCards=[];

// setting up the event listenr for the deck

deck.addEventListener('click', event => {
      const clickTarget = event.target;
      if (isClickValid(clickTarget)){
        if (clockOff) {
          startClock();
          clockOff= false;
        }
         toggleCard(clickTarget);
         addToggledCard(clickTarget);

         //if two cards are clicked
         if(taggledCards.length === 2){
           checkForMatch();
           addMove();
           checkScore()
         }
        }
  });


  //chec if a card is clicked is not already clicked and has a class of card
    function isClickValid(clickTarget){
      return(
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match')&&
        taggledCards.length < 2&&
        !taggledCards.includes(clickTarget)
      );
    }


  function toggleCard (clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
  }


  function addToggledCard(clickTarget) {
    taggledCards.push(clickTarget);

  }

// chekc if the cards are matched

  function checkForMatch() {
    if (
      taggledCards[0].firstElementChild.className===
      taggledCards[1].firstElementChild.className)
      {
        taggledCards[0].classList.toggle('match');
        taggledCards[1].classList.toggle('match');
        taggledCards=[];
        matched++;


    }else {
      setTimeout(() => {
      toggleCard(taggledCards[0]);
      toggleCard(taggledCards[1]);
      taggledCards=[];
    },1000);
    }

    if (matched === totalPairs) {
          gameOver();
    }
  }

function addMove() {
  moves++; //increase the number of moves after each valied click
  const movesnum = document.querySelector('.moves');
  movesnum.innerHTML = moves;
}


function checkScore() {
  //hide one star if the player reaches 16 moves and two when he reaches 24

  if (moves === 16 || moves === 24){
    hideStar();
  }
}


function hideStar(){
  const starList = document.querySelectorAll('.stars li');
  for (star of starList){
    if (star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}



function startClock() {
     clockId = setInterval(() => {
     time ++;
     displayTime();
 }, 1000);

}


function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
     clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
     clock.innerHTML = `${minutes}:${seconds}`;
  }
}


//stops the time when the game is over
function stopClock() {
  clearInterval(clockId);
}



function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}


//write the time moves and starts in the Modal
function writeModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML =`Moves = ${moves+1} `;
  starsStat.innerHTML =`Stars = ${stars}`;
  document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
  });

  document.querySelector('.modal_replay').addEventListener('click', () => {
    toggleModal();
    resetGame();
  });
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none'){
      starCount++;
    }
  }
  return starCount;
}


//restart the game if the player presses the restart of replay buttons

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
  resetCards();

}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}


function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}


 function resetStars() {
   stars = 0;
   const starList = document.querySelectorAll('.stars li');
   for (star of starList) {
     star.style.display = 'inline';
   }
}
function resetCards() {
  const newCards = document.querySelectorAll('.deck li');
  for (let card of newCards) {
    card.className = 'card';
  }
}


function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}
