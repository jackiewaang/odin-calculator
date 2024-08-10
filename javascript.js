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

let num1 = null;
let operator = null;
let num2 = null;

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
clear.addEventListener('click', function(){
    num1 = null;
    num2 = null;
    operator = null;
    activeOp = null;
    displayValue = 0;
    updateDisplay();
});

const equal = document.querySelector(".equal");
equal.addEventListener('click', function(){
    if(!(num1 == null || num2 == null || operator == null)){
        num1 = operate(operator, num1, num2);
        if(activeOp != null){
            activeOp.classList.remove("pressed");
            activeOp = null;
        }
        displayValue = num1;
        updateDisplay();
    }
})

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => number.addEventListener('click', function(){
    if(num1 == null){
        num1 = number.textContent;
        displayValue = num1;
    } else if(operator == null){
        num1 += number.textContent;
        displayValue = num1;
    } else if(num2 == null){
        num2 = number.textContent;
        displayValue = num2;
    } else if(num2 != null){
        num2 += number.textContent;
        displayValue = num2;
    }
    updateDisplay();
}))

let activeOp = null;
const operators = document.querySelectorAll(".operators");
operators.forEach((op) => op.addEventListener('click', function(){
    if(operator == null){
        operator = op.textContent;
        op.classList.add("pressed");
        activeOp = op;
    } else{
        activeOp.classList.remove("pressed");
        operator = op.textContent;
        op.classList.add("pressed");
        activeOp = op;
    }
    if(operator == '÷'){
        operator = '/';
    }
    if(operator == 'x'){
        operator = '*';
    }
}))