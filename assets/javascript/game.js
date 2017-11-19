window.onload = function () {

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var categories  // topics
var chosenCategory  // categories
var getHint // hints
var word    // word selected
var guess   // guess
var guesses = [ ]   // guesses
var lives   // lives
var counter // correct guesses
var space   // spaces in word '-'

// elements
var showLives = document.getElementById("mylives");
var showcategory = document.getElementById("scategory");
var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");



// create alphabet ul
var buttons = function () {
myButtons = document.getElementById('buttons');
letters = document.createElement('ul');

for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(list);
}
}


// pick category
var selectCat = function () {
if (chosenCategory === categories[0]) {
    categoryName.innerHTML = "The Chosen Category Is Actors Who Played James Bond";
} else if (chosenCategory === categories[1]) {
    categoryName.innerHTML = "The Chosen Category Is Bond Villains";
} else if (chosenCategory === categories[2]) {
    categoryName.innerHTML = "The Chosen Category Is Bond Love Interests";
}
}

// guesses ul
result = function () {
wordHolder = document.getElementById('hold');
correct = document.createElement('ul');

for (var i = 0; i < word.length; i++) {
    correct.setAttribute('id', 'my-word');
    guess = document.createElement('li');
    guess.setAttribute('class', 'guess');
    if (word[i] === "-") {
    guess.innerHTML = "-";
    space = 1;
    } else {
    guess.innerHTML = "_";
    }

    guesses.push(guess);
    wordHolder.appendChild(correct);
    correct.appendChild(guess);
}
}

// lives
comments = function () {
showLives.innerHTML = "You have " + lives + " lives";
if (lives < 1) {
    showLives.innerHTML = "Game Over";
}
for (var i = 0; i < guesses.length; i++) {
    if (counter + space === guesses.length) {
    showLives.innerHTML = "You Win!";
    }
}
}

    // animation - is draw the right function? seems weird
var animate = function () {
var drawMe = lives ;
drawArray[drawMe]();
}


// man
canvas =  function(){

myStickman = document.getElementById("stickman");
context = myStickman.getContext('2d');
context.beginPath();
context.strokeStyle = "#fff";
context.lineWidth = 2;
};

head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
}

// not working - what's missing?
// draw = function(pathFromx, pathFromy, pathTox, pathToy) {

// context.moveTo(pathFromx, pathFromy);
// context.lineTo(pathTox, pathToy);
// context.stroke(); 
// }

frame1 = function() {
    draw (0, 150, 150, 150);
};

frame2 = function() {
    draw (10, 0, 10, 600);
};

frame3 = function() {
    draw (0, 5, 70, 5);
};

frame4 = function() {
    draw (60, 5, 60, 15);
};

torso = function() {
    draw (60, 36, 60, 70);
};

rightArm = function() {
    draw (60, 46, 100, 50);
};

leftArm = function() {
    draw (60, 46, 20, 50);
};

rightLeg = function() {
    draw (60, 70, 100, 100);
};

leftLeg = function() {
    draw (60, 70, 20, 100);
};

drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


// OnClick Function
check = function () {
list.onclick = function () {
    var guess = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < word.length; i++) {
    if (word[i] === guess) {
        guesses[i].innerHTML = guess;
        counter += 1;
    } 
    }
    var j = (word.indexOf(guess));
    if (j === -1) {
    lives -= 1;
    comments();
    animate();
    } else {
    comments();
    }
}
}


play = function () {
categories = [
    ["barry nelson", "bob holness", "bob simmons", "sean connery", "roger moore", "timothy dalton", "pierce brosnan", "daniel craig"],
    ["ernst stavro blofeld", "goldfinger", "oddjob", "rosa klebb", "red Grant", "jaws"],
    ["honey ryder", "tatiana romanova", "jill masterson", "teresa di vicenzo", "vesper lynd"]
];

chosenCategory = categories[Math.floor(Math.random() * categories.length)];
word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
word = word.replace(/\s/g, "-"); //can this be right? got from stack overflow
console.log(word);
buttons();

guesses = [ ];
lives = 10;
counter = 0;
space = 0;
result();
comments();
selectCat();
canvas();
}

play();

// hints - why isn't this f***ing working?? need to QE

hint.onclick = function() {

    hints = [
    ["First Bond", "Second Bond", "Best Bond"], // Bond actors
    [], // Bond villains
    [] // Bond girls
];

var categoryIndex = categories.indexOf(chosenCategory);
var hintIndex = chosenCategory.indexOf(word);
showClue.innerHTML = "Clue: - " +  hints [categoryIndex][hintIndex];
};

// start over

document.getElementById('reset').onclick = function() {
correct.parentNode.removeChild(correct);
letters.parentNode.removeChild(letters);
showClue.innerHTML = "";
context.clearRect(0, 0, 400, 400);
play();
}
}