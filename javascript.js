// main operators
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return Math.round(a * b * 10000) / 10000;
}

function divide(a,b){
    if(b == 0){
        return "Error";
    }
    return Math.round(a / b * 10000) / 10000;
}

// main variables
let num1 = null;
let operator = null;
let num2 = null;

// perform equal operation
function operate(op, num1, num2){
    if(op == '+'){
        return add(+num1,+num2);
    } else if(op == '-'){
        return subtract(+num1,+num2);
    } else if(op == '*'){
        return multiply(+num1,+num2);
    } else if(op == '/'){
        return divide(+num1,+num2);
    }
}

// updates value of display
const display = document.querySelector(".display");
let displayValue = Number(display.textContent);

function updateDisplay(){
    display.textContent = displayValue;
}

// hover effect on buttons
const buttons = document.querySelectorAll(".click");
buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.classList.add('active');
    })
    button.addEventListener('mouseup', () => {
        button.classList.remove('active');
    })
    button.addEventListener('mouseleave', () => {
        button.classList.remove('active');
    })
})

// clear function
const clear = document.querySelector(".clear");
clear.addEventListener('click', clearAll);

function clearAll(){
    num1 = null;
    num2 = null;
    operator = null;
    if(activeOp != null){
        activeOp.classList.remove('pressed');
    }
    activeOp = null;
    displayValue = 0;
    updateDisplay();
}

// evaluates the result and prints on display 
const equal = document.querySelector(".equal");
equal.addEventListener('click', getResult);

function getResult(){
    if(!(num1 == null || num2 == null || operator == null)){
        num1 = operate(operator, num1, num2);
        if(activeOp != null){
            activeOp.classList.remove("pressed");
            activeOp = null;
        }
        displayValue = num1;
        updateDisplay();
    }
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => number.addEventListener('click', (event) => handleNumbers(number.textContent)));
document.addEventListener('keydown',handleEvent);

function handleEvent(event){
    const digits = ['0','1','2','3','4','5','6','7','8','9','.'];
    const ops = ['+','-','*','/'];
    if(digits.includes(event.key)){
        handleNumbers(event.key);
    }
    if(event.key == 'Backspace'){
        clearAll();
    }
    console.log(event.key);
    console.log(typeof event.key);
}

function handleNumbers(number){
    if(num1 == null){
        num1 = number;
        if(num1 == '.'){
            num1 = '0.';
        }
        displayValue = num1;
    } else if(operator == null){
        if(num1.includes('.') && number == '.'){
            return null;
        }
        num1 += number;
        displayValue = num1;
    } else if(num2 == null){
        num2 = number;
        if(num2 == '.'){
            num2 = '0.';
        }
        displayValue = num2;
    } else if(num2 != null){
        if(num2.includes('.') && number == '.'){
            return null;
        }
        num2 += number;
        displayValue = num2;
    }
    updateDisplay();
}

let activeOp = null;
const operators = document.querySelectorAll(".operators");
operators.forEach((op) => op.addEventListener('click', (event) => getOperator(op)))

function getOperator(op){
    if(operator == null){
        operator = op.textContent;
        op.classList.add("pressed");
        activeOp = op;
    } else{
        if(num2 == null){
            activeOp.classList.remove("pressed");
            operator = op.textContent;
            op.classList.add("pressed");
            activeOp = op;
        } else{
            getResult();
            num2 = null;
            operator = op.textContent;
            op.classList.add("pressed");
            activeOp = op;
        }
    }
    if(operator == '÷'){
        operator = '/';
    }
    if(operator == 'x'){
        operator = '*';
    }
}

const plusmin = document.querySelector(".plusmin");
plusmin.addEventListener('click', function(){
    if(num2 == null){
        num1 *= -1;
        displayValue = num1;
        updateDisplay();
    } else{
        num2 *= -1;
        displayValue = num2;
        updateDisplay();
    }
})

const percentage = document.querySelector(".percentage");
percentage.addEventListener('click', function(){
    if(operator == null){
        num1 /= 100;
        displayValue = num1;
        updateDisplay();
    } else{
        if(operator == '+' || operator == '-'){
            num2 = num2 / 100 * num1;
        } else{
            num2 = num2 / 100;
        }
        displayValue = num2;
        updateDisplay();
    }
})