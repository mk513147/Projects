// let time = document.getElementById('time')

// //For Analog clock
// setInterval(function () {
//     let date = new Date();
//     time.innerText = date.toLocaleTimeString()
// }, 1000)

const container = document.getElementById("clock-container");
const centerVW = 20;
const radiusVW = 18.5;

for (let i = 0; i < 60; i++) {
    const angle = ((i * 6) - 90) * (Math.PI / 180); // -90° to place 00 at top
    const x = centerVW + radiusVW * Math.cos(angle);
    const y = centerVW + radiusVW * Math.sin(angle);

    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number");
    numberDiv.style.left = `${x}vw`;
    numberDiv.style.top = `${y}vw`;
    numberDiv.innerText = i.toString().padStart(2, '0');

    container.appendChild(numberDiv);
}

const innerContainer = document.getElementById("inner-container");
const innerCenterVW = 17.5;
const innerRadiusVW = 16;

for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const a = innerCenterVW + innerRadiusVW * Math.cos(angle);
    const b = innerCenterVW + innerRadiusVW * Math.sin(angle);

    const innernumberDiv = document.createElement("div");
    innernumberDiv.classList.add("number");
    innernumberDiv.style.left = `${a}vw`;
    innernumberDiv.style.top = `${b}vw`;
    innernumberDiv.innerText = i;

    innerContainer.appendChild(innernumberDiv);
}
