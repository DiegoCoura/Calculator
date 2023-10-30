const operatorsButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const clearButton = document.querySelector("[data-clear]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");

let currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
let previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

let currentOperator = "";
let currentOperand = "";
let previousOperand = "";

let num1 = 0;
let num2 = 0;

operatorsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperator === "") {
      currentOperator = button.innerText;
      if (!previousOperand) {
        previousOperand = currentOperand;
      }
      previousOperandTextElement.innerText = `${previousOperand} ${currentOperator}`;
      currentOperandTextElement.innerText = "";
      currentOperand = "";
    }
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + button.innerText;
    currentOperandTextElement.innerText = currentOperand;
  });
});

clearButton.addEventListener("click", () => {
  currentOperand = currentOperand.toString().slice(0, -1);
  currentOperandTextElement.innerText = currentOperand;
});

equalsButton.addEventListener("click", () => {
  let num1 = parseFloat(previousOperand);
  let num2 = parseFloat(currentOperand);
  previousOperand = calculate(num1, num2, currentOperator);
  previousOperandTextElement.innerText = previousOperand;
  currentOperandTextElement.innerText = "";
  currentOperand = "";
  currentOperator = "";
});

allClearButton.addEventListener("click", () => {
  currentOperator = "";
  currentOperand = "";
  previousOperand = "";
  currentOperandTextElement.innerText = "";
  previousOperandTextElement.innerText = "";
});

const calculate = (num1, num2, operator) => {
  let result = 0;
  if (isNaN(num1) || isNaN(num2)) return;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;

    case "-":
      result = num1 - num2;
      break;

    case "÷":
      result = num1 / num2;
      break;

    case "x":
      result = num1 * num2;
      break;

    case "%":
      result = (num1 / 100) * num2;
      break;

    default:
      return;
  }
  return result;
};