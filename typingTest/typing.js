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
let wpm = 0;
para.innerHTML = typingTestParagraphs[0].split('').map(char => `<span>${char}</span>`).join('');
const spans = para.querySelectorAll('span');

function typingHandler(e) {
    if (testOver) return;

    if (e.key.length === 1) {
        if (e.key === typingTestParagraphs[0][index]) {
            spans[index].classList.remove("text-white");
            spans[index].classList.add("text-green-400");
        } else {
            spans[index].classList.remove("text-white");
            spans[index].classList.add("text-red-400");
        }
        index++;

        if (index >= typingTestParagraphs[0].length) {
            clearInterval(timer);
            testOver = true;
            wpm = Math.round((index / 5) / (time / 60));
            displayResult(`Typing speed: ${wpm} WPM`);
        }
    } else if (e.key === "Backspace" && index > 0) {
        index--;
        spans[index].classList.remove("text-green-400", "text-red-400");
        spans[index].classList.add("text-white");
    }
    wpm = Math.round((index / 5) / (time / 60));

    if (time > 0) {
        wpm = Math.round((index / 5) / (time / 60));
    }
}

function displayResult(msg = "Time's up!") {
    resultPara.textContent = msg;
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        displayTime.textContent = `00:${time < 10 ? '0' + time : time}`;
        if (time === 10) {
            clearInterval(timer);
            testOver = true;
            document.body.removeEventListener('keydown', typingHandler);
            displayResult(`Time's up! Test over.\n WPM: ${wpm}`);
        }
    }, 1000);
}

function initialKeyHandler(e) {
    if (!typingStarted && e.key.length === 1) {
        typingStarted = true;
        startTimer();
        document.body.addEventListener('keydown', typingHandler);
        document.body.removeEventListener('keydown', initialKeyHandler);
    }
}


function restartTest() {
    clearInterval(timer);
    testOver = false;
    typingStarted = false;
    time = 0;
    index = 0;
    wpm = 0;
    displayTime.textContent = "00:00";
    resultPara.textContent = "";
    spans.forEach(span => {
        span.classList.remove("text-green-400", "text-red-400");
        span.classList.add("text-white");
    });
    document.body.removeEventListener('keydown', typingHandler);
    document.body.removeEventListener('keydown', initialKeyHandler);

    document.body.addEventListener('keydown', initialKeyHandler);

    console.log("Test restarted: Ready for new typing test.");
    restartBtn.blur();

}
restartTest();

restartBtn.addEventListener('click', restartTest);

