"use strict";
function start() {
    randomCard();
    countUpTimer()
}

window.onload = start;

const deck = document.querySelectorAll('.cards');

let hasFliped = false;
let cantFlip = false;
let firstCard;
let secondCard;

let moves = 0;
let stepCounter = document.querySelector('.moves');

let pair = 0;
let winscreen = document.querySelector("#winscreen");

let correctSound = document.querySelector("#correct");
let wrongSound = document.querySelector("#wrong");
let cheeringSound = document.querySelector("#cheering");

function preload(){
    correctSound = new Sound("sound/wrong.mp3");
}

function fliptheCard() {
    // in case last set of card haven't finish compare
    if (cantFlip) return;

    // in case user double click the card
    if (this == firstCard) return;

    this.classList.add('fliped');

    if (!hasFliped) {
        //first card user pick
        hasFliped = true;
        firstCard = this;

        return;
    }

    //second card user pick
    hasFliped = false;
    secondCard = this;

    checkTheCard();
}

function checkTheCard() {
    // see if the card match
    if (firstCard.dataset.image == secondCard.dataset.image) {
        // card match
        // cant flip them anymore
        firstCard.removeEventListener('click', fliptheCard);
        secondCard.removeEventListener('click', fliptheCard);

        // add one step
        moves++;
        stepCounter.innerHTML = moves;

        // after a successful match, reset the card choice.
        resetCard()
        pair++;
        setTimeout(() => {correctSound.play();}, 800);
    }
    else {
        cantFlip = true;
        setTimeout(() => {
            firstCard.classList.remove('fliped');
            secondCard.classList.remove('fliped');

            moves++;
            stepCounter.innerHTML = moves;
            //finshed compare, able to choose next set
            cantFlip = false;
            wrongSound.volume = 0.3;
            wrongSound.play();
        }, 1000);
    }
}

// reset everything and ready for next pick
function resetCard() {
    hasFliped = false;
    cantFlip = false;
    firstCard = null;
    secondCard = null;
}

// give a random num to each card and make them in order
function randomCard() {
    deck.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    });
}

let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let interval;

// a timer
function countUpTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000);
}

// after user win the game
// show a result
function endGame(){
    if(pair == 6){
        clearInterval(interval);
        let finaltime = timer.innerHTML;

        winscreen.classList.add("show");

        document.querySelector("#moves").innerHTML = moves;
        document.querySelector("#time").innerHTML = finaltime;

        cheeringSound.play();
    }

}

// reload the gamepage
function playagain(){
    winscreen.classList.remove("show");
    window.location.reload();
}


deck.forEach(card => card.addEventListener('click', fliptheCard));
deck.forEach(card => card.addEventListener('click', endGame));