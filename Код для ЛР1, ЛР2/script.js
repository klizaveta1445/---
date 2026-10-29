window.onload = function(){

let a = '' 
let b = '' 
let expressionResult = '' 
let selectedOperation = null 
const MAX_DIGITS = 10

function fmt(n) {
    let s = parseFloat(n.toPrecision(MAX_DIGITS)).toString();
    if (s.length > 13) s = n.toExponential(5).replace(/\.?0+e/, 'e');
    return s;
}

const outputElement = document.getElementById("result")

const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    const current = selectedOperation ? b : a;
    if (current.replace(/[-.]/g, '').length + digit.replace('.', '').length > MAX_DIGITS) return;
  if (!selectedOperation) {
    if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
      a += digit;
    }
    outputElement.innerHTML = a;
  }
  
  else {
    if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
      b += digit;
      outputElement.innerHTML = b;
    }
  }
}

digitButtons.forEach(button => {
  button.onclick = function() {
    const digitValue = button.innerHTML;
    onDigitButtonClicked(digitValue);
  }
});

function chainIfNeeded() {
  if (a !== '' && b !== '' && selectedOperation) {
    document.getElementById("btn_op_equal").onclick();
  }
}

document.getElementById("btn_op_mult").onclick = function() {
  if (a === '') return;
  chainIfNeeded();
  selectedOperation = 'x';
}
document.getElementById("btn_op_plus").onclick = function() {
  if (a === '') return;
  chainIfNeeded();
  selectedOperation = '+';
}
document.getElementById("btn_op_minus").onclick = function() {
  if (a === '') return;
  chainIfNeeded();
  selectedOperation = '-';
}
document.getElementById("btn_op_div").onclick = function() {
  if (a === '') return;
  chainIfNeeded();
  selectedOperation = '/';
}

document.getElementById("btn_op_clear").onclick = function() {
  a = ''
  b = ''
  selectedOperation = ''
  expressionResult = ''
  outputElement.innerHTML = 0
}

document.getElementById("btn_op_equal").onclick = function() {
  if (a === '' || b === '' || !selectedOperation)
    return
  switch(selectedOperation) {
    case 'x':
      expressionResult = (+a) * (+b)
      break;
    case '+':
      expressionResult = (+a) + (+b)
      break;
    case '-':
      expressionResult = (+a) - (+b)
      break;
    case '/':
      expressionResult = (+a) / (+b)
      break;
    default:
      break;
  }

  if (!isFinite(expressionResult)) {showError(); return}
  a = fmt(expressionResult)
  b = ''
  selectedOperation = null
  outputElement.innerHTML = a
}

function getCurrent() { return selectedOperation ? b : a }
function setCurrent(value) {
  if (selectedOperation) b = value; else a = value;
  outputElement.innerHTML = value === '' ? 0 : value;
}
function showError() {
  a = ''; b = ''; selectedOperation = null;
  outputElement.innerHTML = 'Ошибка';
}

function applyUnary(fn) {
  const cur = getCurrent();
  if (cur === '') return;
  const r = fn(+cur);
  if (!isFinite(r)) { showError(); return; }
  setCurrent(fmt(r));
}

document.getElementById("btn_op_sign").onclick = function() {
  const cur = getCurrent();
  if (cur === '') return;
  setCurrent(cur.startsWith('-') ? cur.slice(1) : '-' + cur);
}

document.getElementById("btn_op_percent").onclick = function() {
  if (selectedOperation && b !== '' && (selectedOperation === '+' || selectedOperation === '-')) {
    setCurrent(fmt((+a) * (+b) / 100));
  } else {
    applyUnary(x => x / 100);
  }
}

document.getElementById("btn_op_back").onclick = function() {
  let cur = getCurrent();
  if (cur === '') return;
  cur = cur.slice(0, -1);
  if (cur === '-') cur = '';
  setCurrent(cur);
}

document.getElementById("btn_op_sqrt").onclick = function() { applyUnary(Math.sqrt) }

document.getElementById("btn_op_square").onclick = function() { applyUnary(x => x * x) }

document.getElementById("btn_op_cube").onclick = function() { applyUnary(x => x * x * x) }

document.getElementById("btn_op_fact").onclick = function() {
  applyUnary(function(x) {
    if (!Number.isInteger(x) || x < 0 || x > 170) return NaN;
    let r = 1;
    for (let i = 2; i <= x; i++) r *= i;
    return r;
  });
}

const calc = document.getElementById("calc");

document.getElementById("btn_theme").onclick = function() { calc.classList.toggle("light") }

const outColors = ['#f5ee3a', '#ff7ab8', '#7cfc8a', '#ffffff', '#4fc3f7'];
let colorIndex = 0;
document.getElementById("btn_out_color").onclick = function() {
  colorIndex = (colorIndex + 1) % outColors.length;
  outputElement.style.color = outColors[colorIndex];
}


document.getElementById("palette_select").onchange = function() {
 calc.setAttribute("data-palette", this.value);
}
};