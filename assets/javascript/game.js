
//VARIABLES
var words = ["sting", "shakira", "selenagomez", "avrillavigne","linkinpark","akon"]

//Variable for store value 
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;

// Game Start Function
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}

//variables for audio function
var sting = document.getElementById("sting");
var shakira = document.getElementById("shakira");
var selenagomez = document.getElementById("selenagomez");
var avrillavigne = document.getElementById("avrillavigne");
var linkinpark = document.getElementById("linkinpark");
var akon = document.getElementById("akon");



function aud() {
    //sting Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        akon.pause();
        linkinpark.pause();
        avrillavigne.pause();
        selenagomez.pause();
        shakira.pause();
        sting.play();
        document.getElementById("image").src = "./assets/images/sting.jpg";
    }
    //Shakira Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        akon.pause();
        linkinpark.pause();
        avrillavigne.pause();
        selenagomez.pause();
        sting.pause();
        shakira.play();
        document.getElementById("image").src = "./assets/images/shakira.jpg";
    }
    //Selena Gomez Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        akon.pause();
        linkinpark.pause();
        avrillavigne.pause();
        shakira.pause();
        sting.pause();
        selenagomez.play();
        document.getElementById("image").src = "./assets/images/selena.jpg";
    }
    //Avril Lavigne Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        akon.pause();
        linkinpark.pause();
        selenagomez.pause();
        shakira.pause();
        sting.pause();
        avrillavigne.play();
        document.getElementById("image").src = "./assets/images/avrillavigne.jpg";
    }
    //Linkin Park Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        akon.pause();
        selenagomez.pause();
        shakira.pause();
        sting.pause();
        avrillavigne.pause();
        linkinpark.play();
        document.getElementById("image").src = "./assets/images/linkinpark.jpg";
    }
      //Akon Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        linkinpark.pause();
        selenagomez.pause();
        shakira.pause();
        sting.pause();
        avrillavigne.pause();
        akon.play();
        document.getElementById("image").src = "./assets/images/akon.jpg";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 12;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}

