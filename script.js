const calculator = document.querySelector(".calculator");
const display = document.querySelector(".cals h2");
const smallDisplay = document.querySelector(".cals p");

let currentInput = "";
let previousInput = "";
let operator = null;

// Function to update display
function updateDisplay() {
    display.innerText = currentInput || "0";
    smallDisplay.innerText = previousInput + (operator || "");

}

// Function to clear all inputs
function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Function to handle operations
function handleOperation(op) {
    if (currentInput === "") return;
    if (previousInput) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay();
}

// Function to handle calculations
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    if (operator === "+") {
    result = prev + curr;
    } else if (operator === "-") {
    result = prev - curr;
    } else if (operator === "x") {
    result = prev * curr;
    } else if (operator === "÷") {
    result = prev / curr;
    } else if (operator === "%") {
    result = prev % curr;
    } else {
    return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
}



// Event listener for button clicks
calculator.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.classList.contains("num") && !target.classList.contains("op") && !target.classList.contains("clear") && !target.classList.contains("delete")) {
        return;
    }

    target.classList.add("pressed");

    setTimeout(() => {
        target.classList.remove("pressed");
    }, 100);

    if (target.classList.contains("num")) {
        if (target.innerText === "." && currentInput.includes(".")) return;
        currentInput += target.innerText;
    }

    // Operators
    if (target.classList.contains("op")) {
        if (target.innerText === "=") {
            calculate();
        } else {
            handleOperation(target.innerText);
        }
    }

    if (target.classList.contains("clear")) {
        clearAll();
    }

    if (target.classList.contains("delete")) {
        deleteLast();
    }

    updateDisplay();
});
