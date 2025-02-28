const colorPicker = document.getElementById("colorPicker");
const colorPickerBtn = document.getElementById("colorPickerButton");
const colorBox = document.querySelectorAll(".colorBox");
const msgBox = document.querySelector("#messageContainer");
const copyModeRadios = document.querySelectorAll(".radioBtn");
let selectedCopyMode = "hex"; 

// ----------------Functions
function coloShades(color) {
    let shades = [];
    for (let i = 0; i < 10; i++) {
        let percent = (i - 5) * 15; 
        shades.push(shadeColor(color, percent));
    }
    return shades;
}

function shadeColor(color, percent) {
    let num = parseInt(color.slice(1), 16),
        r = (num >> 16) + percent,
        g = ((num >> 8) & 0x00FF) + percent,
        b = (num & 0x0000FF) + percent;

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
    let rgbValues = rgb.match(/\d+/g); 
    let r = parseInt(rgbValues[0]).toString(16).padStart(2, '0');
    let g = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
    let b = parseInt(rgbValues[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase(); 
}

function rgbToHsl(rgb) {
    let rgbValues = rgb.match(/\d+/g).map(Number); 
    let r = rgbValues[0] / 255, g = rgbValues[1] / 255, b = rgbValues[2] / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; 
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h = Math.round(h * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function displayMessage(msg, success = true) {
    msgBox.innerHTML = success ? `&#9989; ${msg}` : `&#10060; ${msg}`;
    setTimeout(() => {
        msgBox.innerHTML = "";
    }, 2500);
}

//-----------------Event Listeners
// Color Picker Button Click
colorPickerBtn.addEventListener("click", () => {
    colorPicker.click();
});

// Change Shades When New Color Picked
colorPicker.addEventListener("input", function () {
    let shades = coloShades(colorPicker.value);
    colorBox.forEach((item, index) => {
        item.style.backgroundColor = shades[index % shades.length];
    });
});

// Detect Selected Copy Mode 
copyModeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        selectedCopyMode = e.target.value;
    });
});

// Copy Color on Click Based on Selected Mode
colorBox.forEach((item) => {
    item.addEventListener("click", (e) => {
        const bgColor = window.getComputedStyle(e.target).backgroundColor;
        let colorToCopy;

        if (selectedCopyMode === "hex") {
            colorToCopy = rgbToHex(bgColor);
        } else if (selectedCopyMode === "hsl") {
            colorToCopy = rgbToHsl(bgColor);
        } else {
            colorToCopy = bgColor; 
        }

        navigator.clipboard.writeText(colorToCopy)
            .then(() => displayMessage(`${colorToCopy} Color copied successfully!`))
            .catch(err => displayMessage(`Error copying color! ${err}`, false));
    });
});
