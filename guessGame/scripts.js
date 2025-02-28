let userInput = document.getElementById("userInput")
let button = document.getElementById("button")
let resultsPara = document.getElementById("results")
let guesses = document.getElementById("guesses")
let chance = document.getElementById("chances")
let comment = document.getElementById("comment")
let heading = document.getElementById("heading")
const toggleSwitch = document.getElementById('toggleSwitch');
let para = document.querySelectorAll(".resultPara");

const indianSlangs = [
    "Arre yaar", 
    "Bsdk", 
    "Jugaad", 
    "Chillauta", // Relax
    "Kaandu", // A big mess or problem
    "Fattu", // Coward
    "Lukkhha", // Jobless or useless person
    "Bheja fry", // Someone irritating or brain-frying
    "Chindi", // Cheap or miserly person
    "Bokamanus", // Nonsense
    "Ghanteshwar", // Sarcastic "yeah, right!"
    "Pakkau", // Definitely
    "Jhandu", // Cool down
    "Tashani", // Style or attitude
    "Raapchik", // Stylish or attractive
    "Hawa tight", // Shocked or scared
    "Fuddu", // Foolish or dumb
    "Pataka", // Attractive person
    "Senti ho gaya", // Became emotional
    "Daru peene chalein?", // Let’s go for a drink?
    "Lodu", // Idiot (playful)
    "Chomu", // Dumb person
    "Chapri", // Wannabe gangster or show-off
    "Kadak", // Awesome or great
    "Scene tight", // Situation is critical
    "Hathoda", // Someone annoying
    "Vella", // Someone who has nothing to do
    "Tapori", // Street-smart, thug-like person
    "Patli gali se nikal", // Escape quietly
    "Jhand ho gaya", // Got messed up
    "Jhol hai", // Something fishy
    "Mast", // Great or awesome
    "Bhasad", // Chaos
    "Tota", // Attractive girl
    "Bhai ki izzat", // Respect for a friend (jokingly)
    "Chal na", // Let’s go
    "Tere baap ka road hai?", // Sarcastic: "Is this your dad’s road?"
    "Chhamiya", // Overly dressed girl
    "Bhaag BC", // Run, bro!
    "Aukat me reh", // Stay in your limits
    "Bindaas", // Carefree or bold
    "Fookat ka gyaan", // Free, unnecessary advice
    "Full tight", // Completely drunk
    "Dhasu", // Impressive or cool
    "Saanp soongh gaya?", // Why so silent?
    "Panja maarna", // High-five
    "Dilli ka launda", // Delhi boy, often used for stylish guys
    "Teri toh watt lag gayi", // You're in deep trouble
    "Chappal maarunga", // I’ll slap you (playfully)
    "Tandoori murgi", // A term for someone who parties a lot
    "Fattu banda", // Scared person
    "Item", // Attractive girl
    "Tere ko kya?", // What’s it to you?
    "Dheela banda", // Lazy or weak person
    "Babu moshai", // Used jokingly for Bengalis
    "Jalwa hai tera", // You’re impressive
    "Dhokla", // Gujarati reference, often used for teasing
    "Bhai ki shaadi hai", // Used when there's an unnecessary celebration
    "Chindi chhora", // Cheapskate
    "Baap baap hota hai", // A comeback to show authority
    "Aalsi aadmi", // Lazy person
    "Mawaal", // Rowdy person
    "Yeh kya chutyapa hai?", // What nonsense is this?
    "Bade log", // Used sarcastically for rich people
    "Thakela", // Useless or boring
    "Gheun tak", // Marathi slang for “Let’s go for it”
    "Pintya", // Common nickname for mischievous boys
    "Ek number", // Top-notch or awesome
    "Do kaudi ka aadmi", // Worthless person
    "Khichdi pak rahi hai", // Something’s brewing (usually a scheme)
    "Baap re baap", // Expressing shock
    "Chor hai tu", // You’re a thief (playfully)
    "Fenk mat", // Don’t exaggerate
    "Meter down", // Someone getting angry
    "Garam ho gaya", // Lost temper
    "Ullu banaya", // Fooled someone
    "Bhookha nanga", // Someone desperate or poor
    "Dhandha kar", // Get to work
    "Ek tapli milegi", // You’ll get a smack
    "Bheedu", // Friend (Tapori slang)
    "Shaana mat ban", // Don’t act too smart
    "Maibaap", // Used to mock someone who acts superior
    "Bhai ka gyaan", // Useless advice from a self-proclaimed expert
    "Bohot hard", // Too good or impressive
    "Halkat", // Shameless
    "Sasta nasha", // Cheap intoxication (used sarcastically)
    "Ghochu", // Idiot
    "Yeda ban ke peda mat khana", // Don’t act innocent
    "Pakka Dilliwala", // Hardcore Delhi person
    "Bambaiya style", // Mumbai-style behavior
    "Shana kutta", // Over-smart person
    "Toofan mail", // Someone who never stops talking
    "Bohot zyada ho raha hai", // It's getting too much
    "Khopdi tod dunga", // I’ll break your head (jokingly)
    "Panga mat le", // Don’t mess with me
    "Maal hai boss", // That’s premium stuff (sometimes used for attractive people)
    "Takkar ka hai", // It’s a fair competition
    "Bhai ne bola toh ho gaya", // If bro said it, consider it done
    "Aag laga di", // Set the scene on fire (did something amazing)
    "Lafda mat kar", // Don’t create trouble
    "Mast scene", // Great situation
    "Oye hero", // Used sarcastically for someone acting too cool
    "Jhaatu", // Useless or irritating person
    "Jaldi bol, varna cancel", // Speak fast or forget it
    "Bawaal hai", // Too good or chaotic
    "Kuch bhi", // Used when someone says nonsense
    "Locha ho gaya", // Something went wrong
];



let compGuess = parseInt(Math.random() * 100 + 1)
let guessArray = [];
let guessNum = 1;

let play = true;
let insult = false;

toggleSwitch.addEventListener('change', () => {
    insult = toggleSwitch.checked;
    para.forEach((p) => {
        p.style.display = insult ? "none" : "block";
    })
    displayComment("")
    if (insult) {
        heading.textContent="GASS GAME"
    } else {
        heading.textContent = "GUESS GAME"
    }
});

if (play) {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const guessUser = parseInt(userInput.value);
        validate(guessUser);
    })
}

function validate(guessedNum) {
    if (guessedNum <= 0 || isNaN(guessedNum) || guessedNum >= 100) {
        comment.style.color = "red";
        comment.textContent = "Please enter a valid number between 1-100"
        setTimeout(() => {
            comment.style.color = "";
            comment.textContent = "";
        }, 2000);
    } else {
        if (insult) {
            displayComment(indianSlangs[guessedNum+1])
            userInput.value = "";
        }
        else {
            guessArray.push(guessedNum);
            if (guessNum > 10) {
                displayResult(guessedNum)
                displayComment(`You Lose!!, The number was ${guessedNum}`)
                setTimeout(() => {
                    endGame();
                }, 3000);
            }
            else {
                displayResult(guessedNum);
                checkGuess(guessedNum);
            }
        }

    }
}

function checkGuess(guess) {
    if (guess == compGuess) {
        displayComment(`Congrats!! You win 🙌🎉`);
        setTimeout(() => {
            endGame();
        }, 3000);
    } else if (guess > compGuess) {
        displayComment(`Try Smaller Number.`);
    }
    else {
        displayComment(`Try Larger Number`);
    }

}

function displayResult(guess) {

    userInput.value = "";
    guesses.innerHTML += `${guess} `;
    guessNum++;
    chance.innerHTML = `${11 - guessNum}`

}

function displayComment(message) {
    comment.innerHTML = message;
}

let p = document.createElement('p');

function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    displayComment("");
    p.id = "gameButton"
    p.classList.add("text-xl", "text-center", "p-3", "h-14", "border", "border-white", "b-1", "cursor-pointer");//does not works if there is space in any of the classnames
    p.innerHTML = `Start new Game`;
    resultsPara.appendChild(p);
    play = false;
    p.addEventListener("click", startNewGame, { once: true });
}

function startNewGame() {
    compGuess = Math.floor(Math.random() * 100) + 1;
    guessArray = [];
    guessNum = 1;
    guesses.innerHTML = "";
    chance.innerHTML = `${11 - guessNum}`;
    userInput.removeAttribute("disabled");
    resultsPara.removeChild(p);
    play = true;
}

