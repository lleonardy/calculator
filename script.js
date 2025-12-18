const previousDisplay = document.querySelector("#labelPrev");
const currentDisplay = document.querySelector("#labelCurrent");

const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperators = document.querySelectorAll("[data-operator]");
const btnEquals = document.querySelector("[data-action='equals']");
const btnDelete = document.querySelector("[data-action='delete']");
const btnClear = document.querySelector("[data-action='clear']");

let currentNumber = "";
let previousNumber = "";
let operator = null;
let isResultShown = false;
const MAX_DIGITS = 12;
let lastOperator = null;
let lastOperand = null;


btnNumbers.forEach(button => {
    button.addEventListener("click", () => {
        if (isResultShown) {
            previousDisplay.textContent = "";
            currentNumber = "";
            lastOperator = null;
            lastOperand = null;
            isResultShown = false;
        }

        if (button.dataset.number === "." && currentNumber.includes(".")) return;

        if (currentNumber.length >= MAX_DIGITS) return;

        currentNumber += button.dataset.number;
        currentDisplay.textContent = currentNumber;

    });
});

btnOperators.forEach(button => {
    button.addEventListener("click", () => {
        if (isResultShown) {
            previousNumber = currentNumber;
            currentNumber = "";
            isResultShown = false;
        }

        if (currentNumber === "" && previousNumber === "") {
            operator = button.dataset.operator;
            previousDisplay.textContent = operator;
            return;
        }

        if (previousNumber !== "" && currentNumber !== "" && operator) {
            const result = calculate();
            previousNumber = result.toString();
            currentNumber = "";
            currentDisplay.textContent = result;
        } else if (previousNumber === "") {
            previousNumber = currentNumber;
            currentNumber = "";
        }

        operator = button.dataset.operator;
        previousDisplay.textContent = `${previousNumber} ${operator}`;


    });
});

btnEquals.addEventListener("click", () => {
    if (isResultShown && lastOperator && lastOperand) {
        previousNumber = currentNumber;
        operator = lastOperator;
        currentNumber = lastOperand;

        const result = calculate();

        previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
        currentDisplay.textContent = result;

        currentNumber = result.toString();
        isResultShown = true;
        return;
    }

    if (!previousNumber || !currentNumber || !operator) return;

    const result = calculate();

    if (result === "Error") {
        currentDisplay.textContent = "Error";
        previousDisplay.textContent = "";
        currentNumber = "";
        operator = null;
        isResultShown = true;
        return;
    }

    previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
    currentDisplay.textContent = result;

    lastOperator = operator;
    lastOperand = currentNumber;

    currentNumber = result.toString();
    previousNumber = "";
    operator = null;
    isResultShown = true;
});

btnDelete.addEventListener("click", () => {
    if (isResultShown || currentNumber === "") return;

    currentNumber = currentNumber.slice(0, -1);
    currentDisplay.textContent = currentNumber || "0";
});


btnClear.addEventListener ("click", () => {
    currentNumber = "";
    previousNumber = "";
    operator = null;
    isResultShown = false;

    lastOperator = null;
    lastOperand = null;
    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
})

function calculate() {
    const prev = Number(previousNumber);
    const current = Number(currentNumber);
    let result ;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) return "Error";
            result = prev / current;
            break;
        case "%":
            result = prev * (current / 100);
            break;
        default:
            return;
    }
    return result;
}