const btnTheme = document.getElementById("switchTheme");
let root = document.querySelector(":root");
const display = document.getElementById("display");
let operatorVerification = 0;
let verificationPoint = 0;
let equation = [];

function checkEquantion(value) {
  if (value === "+" || value === "-" || value === "*" || value === "/") {
    if (operatorVerification == 1) {
      display.innerText += value;
      operatorVerification = 0;
      verificationPoint = 0;
    }
  } else if (value === ".") {
    if (verificationPoint == 0) {
      display.innerText += value;
      verificationPoint = 1;
    }
  } else {
    display.innerText += value;
    operatorVerification = 1;
  }
}

document.querySelectorAll(".buttonCalc").forEach((btn) => {
  btn.addEventListener("click", function () {
    checkEquantion(btn.dataset.value);
  });
});

function calculate() {
  try {
    const result = eval(display.innerText);
    if (result) display.innerText = result.toFixed(2);
    if (display.innerText.includes(".")) {
      verificationPoint = 1;
      display.classList.add("success");
    }
  } catch (error) {
    display.innerText = "ERROR";
    display.classList.add("error");
  }
}

document.getElementById("equal").addEventListener("click", calculate);

document.getElementById("delete").addEventListener("click", function () {
  display.innerText = display.innerText.slice(0, -1);
  operatorVerification = operatorVerification === 0 ? 1 : 0;
});

document.getElementById("clear").addEventListener("click", function () {
  display.innerText = "";
  operatorVerification = 0;
  verificationPoint = 0;
  display.classList.add("success");
});

btnTheme.addEventListener("click", function (el) {
  let btnTheme = el.currentTarget;
  if (btnTheme.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--border-color", "#929191");
    btnTheme.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#666");
    btnTheme.dataset.theme = "dark";
  }
});
