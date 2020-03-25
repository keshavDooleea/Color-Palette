const palette = document.querySelectorAll(".color"); // 4 color divs
const button = document.querySelector("button");
const hex = document.querySelectorAll(".hex"); // input hex component
const img = document.querySelectorAll("#lock-img"); // lock and unlock images
const header = document.querySelector("h1"); // color palette header
const lines = document.querySelectorAll("#button_container div"); // two lines surrounding button
const copied = document.querySelector("#button_container h3"); // message shown
const back = document.querySelector("#back"); // back arrow to return to projects
let islocked = Array(false, false, false, false); // for images

// purple, blue, green, pink
let bkgColor = Array("#7c677f", "#08627f", "#2a694d", "#b86b77", "#855D64");
let elementColor = Array("#a795a8", "#afbeb9", "#7ca786", "#c9afc5", "#FFE5C5");
let iterator = 1; // to iterate both arrays

// generates random 2 bytes number from 0-255
function findColor() {
  return Math.floor(Math.random() * 256);
}

// conversion of rgba to hex (2 bytes)
function findHex(value) {
  let i = 0; // table of 16
  let first = -1; // MSB
  let second = 0; // LSB

  // find max value of 16
  while (i < value) {
    i = i + 16;
    first++;
  }

  // second byte
  second = value - first * 16;

  // 1 multiplication in excess
  if (first > 15 || first < 0) {
    first = 0;
  }
  if (second > 15) {
    second = 0;
  }

  // convert to hexa decimal
  first = verifyDigit(first);
  second = verifyDigit(second);

  return first + "" + second;
}

// verify value range from 0 - 15
function verifyDigit(value) {
  if (value < 10) {
    return value;
  } else if (value == 10) {
    return "A";
  } else if (value == 11) {
    return "B";
  } else if (value == 12) {
    return "C";
  } else if (value == 13) {
    return "D";
  } else if (value == 14) {
    return "E";
  } else if (value == 15) {
    return "F";
  }
}

function assignColor(palette, hex) {
  let firstPair = findColor();
  let secPair = findColor();
  let thirdPair = findColor();

  palette.style.backgroundColor = `rgb(${firstPair}, ${secPair}, ${thirdPair})`;

  // adds 6 numbers together to form hex code
  let hexCode;
  hexCode = "#";
  hexCode += findHex(firstPair);
  hexCode += findHex(secPair);
  hexCode += findHex(thirdPair);
  hex.value = hexCode;
}

// set initial background color to palettes
for (let i = 0; i < palette.length; i++) {
  assignColor(palette[i], hex[i]);
}

// // copy to clipboard
for (let i = 0; i < hex.length; i++) {
  hex[i].addEventListener("click", () => {
    // copy the hex value to clipboard
    hex[i].select();
    hex[i].setSelectionRange(0, 99999);
    document.execCommand("copy");

    // show a message for two sec
    copied.style.opacity = "1";
    copied.style.transition = "1s";

    // remove message after two sec
    setTimeout(() => {
      copied.style.opacity = "0";
      copied.style.transition = "1s";
    }, 2000);
  });
}

// change lock images
function changeImage(obj, position) {
  obj.classList.toggle("lock");
  if (islocked[position]) {
    islocked[position] = false;
  } else {
    islocked[position] = true;
  }
}

button.onclick = () => {
  // reset background color to palettes
  for (let i = 0; i < palette.length; i++) {
    if (!islocked[i]) {
      assignColor(palette[i], hex[i]);
    }
  }
};

// executes each 5 seconds
setInterval(function() {
  // background color
  document.body.style.backgroundColor = bkgColor[iterator];
  button.style.color = bkgColor[iterator];

  // text color
  button.style.backgroundColor = elementColor[iterator];
  header.style.color = elementColor[iterator];
  copied.style.color = elementColor[iterator];
  back.style.color = elementColor[iterator];

  // transitions
  document.body.style.transition = "3s";
  header.style.transition = "3s";
  copied.style.transition = "3s";
  button.style.transition = "3s";
  back.style.transition = "3s";

  // for 4 divs
  for (let i = 0; i < palette.length; i++) {
    // colors
    hex[i].style.backgroundColor = bkgColor[iterator];
    hex[i].style.color = elementColor[iterator];

    // border
    palette[i].style.border = `1px solid ${elementColor[iterator]}`;
    hex[i].style.border = `1px solid ${elementColor[iterator]}`;
    hex[i].style.borderTop = "none";

    // transitions
    hex[i].style.transition = "0.9s";
    palette[i].style.transition = "0.5s";
  }

  // button horizontal lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.color = elementColor[iterator];
    lines[i].style.transition = "0.5s";
  }

  // go to next position in array
  iterator++;

  // restart at position 0 of array
  if (iterator >= bkgColor.length) {
    iterator = 0;
  }
}, 5000);
