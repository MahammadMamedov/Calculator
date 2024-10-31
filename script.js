// Set button labels
document.getElementById('clear-btn').textContent = 'C';
document.getElementById('divide-btn').textContent = '/';
document.getElementById('percent-btn').textContent = '%';
document.getElementById('multiply-btn').textContent = 'x';

document.getElementById('seven-btn').textContent = '7';
document.getElementById('eight-btn').textContent = '8';
document.getElementById('nine-btn').textContent = '9';
document.getElementById('subtract-btn').textContent = '-';

document.getElementById('four-btn').textContent = '4';
document.getElementById('five-btn').textContent = '5';
document.getElementById('six-btn').textContent = '6';
document.getElementById('add-btn').textContent = '+';

document.getElementById('one-btn').textContent = '1';
document.getElementById('two-btn').textContent = '2';
document.getElementById('three-btn').textContent = '3';
document.getElementById('plus-minus-btn').textContent = '±';

document.getElementById('zero-btn').textContent = '0';
document.getElementById('decimal-btn').textContent = '.';
document.getElementById('backspace-btn').textContent = '←';
document.getElementById('equals-btn').textContent = '=';

// Select display elements
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Function to update the display, including operation symbol
function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = operation 
    ? `${previousOperand} ${operation}` 
    : previousOperand;
}

// Clear the display
function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
}

// Delete the last digit
function deleteDigit() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

// Append a number to the current operand
function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

// Choose an operation
function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
}

// Calculate the result
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}

// Invert the current operand's sign
function invertSign() {
  if (currentOperand === "") return;
  currentOperand = currentOperand * -1;
  updateDisplay();
}

// Add event listeners to buttons
document.getElementById('clear-btn').addEventListener('click', clear);
document.getElementById('backspace-btn').addEventListener('click', deleteDigit);
document.getElementById('equals-btn').addEventListener('click', calculate);
document.getElementById('plus-minus-btn').addEventListener('click', invertSign);

// Operation buttons
document.getElementById('add-btn').addEventListener('click', () => chooseOperation('+'));
document.getElementById('subtract-btn').addEventListener('click', () => chooseOperation('-'));
document.getElementById('multiply-btn').addEventListener('click', () => chooseOperation('*'));
document.getElementById('divide-btn').addEventListener('click', () => chooseOperation('/'));

// Number and decimal buttons
document.getElementById('zero-btn').addEventListener('click', () => appendNumber(0));
document.getElementById('one-btn').addEventListener('click', () => appendNumber(1));
document.getElementById('two-btn').addEventListener('click', () => appendNumber(2));
document.getElementById('three-btn').addEventListener('click', () => appendNumber(3));
document.getElementById('four-btn').addEventListener('click', () => appendNumber(4));
document.getElementById('five-btn').addEventListener('click', () => appendNumber(5));
document.getElementById('six-btn').addEventListener('click', () => appendNumber(6));
document.getElementById('seven-btn').addEventListener('click', () => appendNumber(7));
document.getElementById('eight-btn').addEventListener('click', () => appendNumber(8));
document.getElementById('nine-btn').addEventListener('click', () => appendNumber(9));
document.getElementById('decimal-btn').addEventListener('click', () => appendNumber('.'));

// Percent button
document.getElementById('percent-btn').addEventListener('click', () => {
  if (currentOperand === "") return;
  currentOperand = parseFloat(currentOperand) / 100;
  updateDisplay();
});
