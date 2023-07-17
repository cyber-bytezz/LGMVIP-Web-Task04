 // Calculator JavaScript
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-keys button');

function appendToDisplay(value) {
  display.innerText += value;
}

function clearDisplay() {
  display.innerText = '';
}

function calculateResult() {
  let expression = display.innerText;
  expression = expression.replace('sqrt(', 'Math.sqrt(');
  expression = expression.replace('log(', 'Math.log10(');
  expression = expression.replace('^', '**');
  const result = eval(expression);
  display.innerText = result;
}

function handleKeyPress(event) {
  const key = event.key;
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  if (arrowKeys.includes(key)) {
    buttons.forEach(button => button.classList.remove('blink'));
    const activeButton = document.querySelector('.calculator-keys button.active');
    let index = Array.from(buttons).indexOf(activeButton);

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      index = (index - 1 + buttons.length) % buttons.length;
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      index = (index + 1) % buttons.length;
    }

    buttons[index].classList.add('blink');
    buttons[index].focus();
  }
}

buttons.forEach(button => {
  button.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      button.click();
    }
  });
  button.addEventListener('focus', () => {
    button.classList.add('active');
  });
  button.addEventListener('blur', () => {
    button.classList.remove('active');
  });
});

document.addEventListener('keydown', handleKeyPress);
