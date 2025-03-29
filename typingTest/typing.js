const para = document.querySelector('#para');
const displayTime = document.querySelector('#timer');
const resultPara = document.querySelector('#footerPara');
const restartBtn = document.querySelector('#restartBtn');

const typingTestParagraphs = [
    "The sun shines brightly in the clear blue sky. Birds chirp happily as they fly from tree to tree. A gentle breeze moves the leaves, making a soft rustling sound. Children play in the park, laughing and running around. A small dog chases a butterfly, wagging its tail with excitement. The scent of fresh flowers fills the air, making the morning feel refreshing. Nearby, a man reads a book on a bench, enjoying the peaceful moment. The world feels calm and full of joy as nature comes to life under the warm sunlight."
];

let testOver = false;
let time = 0;
let typingStarted = false;
let index = 0;
let timer;
let correctChars = 0;
let totalTyped = 0;
let wpm = 0;
let accuracy = 100;

para.innerHTML = typingTestParagraphs[0].split('').map(char => `<span class="text-white">${char}</span>`).join('');
const spans = para.querySelectorAll('span');
let letterWidth = 12;

function shiftText(index) {
    para.style.transform = `translateX(-${index * letterWidth}px)`;
}

function typingHandler(e) {
    if (testOver) return;

    if (!typingStarted && e.key === typingTestParagraphs[0][index]) {
        typingStarted = true;
        startTimer();
    }

    if (e.key.length === 1) {
        totalTyped++;

        if (e.key === typingTestParagraphs[0][index]) {
            spans[index].classList.remove("text-white", "text-red-400");
            spans[index].classList.add("text-green-400");
            correctChars++;
        } else {
            spans[index].classList.remove("text-white");
            spans[index].classList.add("text-red-400");
        }

        index++;

        if (index >= typingTestParagraphs[0].length) {
            endTest();
        }
        shiftText(index);
    }
    else if (e.key === "Backspace" && index > 0) {
        index--;
        spans[index].classList.remove("text-green-400", "text-red-400");
        spans[index].classList.add("text-white");
        totalTyped--;

        if (spans[index].classList.contains("text-green-400")) {
            correctChars--;
        }
        shiftText(index);
    }

    updateStats();
}

function updateStats() {
    if (time > 0) {
        wpm = Math.round((correctChars / 5) / (time / 60));
        accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
    }
}

function endTest() {
    clearInterval(timer);
    testOver = true;
    updateStats();
    displayResult(`Typing speed: ${wpm} WPM | Accuracy: ${accuracy}%`);
}

function displayResult(msg = "Time's up!") {
    resultPara.textContent = msg;
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        displayTime.textContent = `00:${time < 10 ? '0' + time : time}`;
        if (time === 60) {
            endTest();
        }
    }, 1000);
}

document.body.addEventListener('keydown', typingHandler);

function restartTest() {
    clearInterval(timer);
    testOver = false;
    time = 0;
    typingStarted = false;
    index = 0;
    timer;
    correctChars = 0;
    totalTyped = 0;
    wpm = 0;
    accuracy = 100;
    displayTime.textContent = "00:00";
    resultPara.textContent = "";
    shiftText(0);
    spans.forEach(span => {
        span.classList.remove("text-green-400", "text-red-400");
        span.classList.add("text-white");
    });
    document.body.removeEventListener('keydown', typingHandler);
    document.body.addEventListener('keydown', typingHandler);

    console.log("Test restarted: Ready for new typing test.");
    restartBtn.blur();

}
restartTest();

restartBtn.addEventListener('click', restartTest);

