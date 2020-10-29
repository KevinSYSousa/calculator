class Calculator {
  constructor(previousButtonTextElement, currentButtonTextElement) {
    this.previousButtonTextElement = previousButtonTextElement;
    this.currentButtonTextElement = currentButtonTextElement;
    this.clear();
  }

  clear() {
    this.currentButton = "";
    this.previousButton = "";
    this.operation = undefined;
  }

  delete() {
    this.currentButton = this.currentButton.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentButton.includes(".")) return;
    this.currentButton = this.currentButton.toString() + number.toString();
  }

  chooseOperator(operation) {
    if (this.currentButton === "") return;
    if (this.previousButton !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousButton = this.currentButton;
    this.currentButton = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousButton);
    const current = parseFloat(this.currentButton);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentButton = computation;
    this.operation = undefined;
    this.previousButton = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentButtonTextElement.innerText = this.getDisplayNumber(
      this.currentButton
    );
    if (this.operation != null) {
      this.previousButtonTextElement.innerText = `${this.getDisplayNumber(
        this.previousButton
      )} ${this.operation}`;
    } else {
      this.previousButtonTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousButtonTextElement = document.querySelector("[data-previous]");
const currentButtonTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(
  previousButtonTextElement,
  currentButtonTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
